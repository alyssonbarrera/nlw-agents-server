import { and, eq, sql } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'
import { generateAnswer, generateEmbeddings } from '../../services/gemini.ts'

const SIMILARITY_THRESHOLD = 0.7

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/questions',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
        body: z.object({
          question: z.string().min(1),
        }),
      },
    },
    async (request, reply) => {
      const { question } = request.body
      const { roomId } = request.params

      const embeddings = await generateEmbeddings(question)

      const embeddingsAsString = `[${embeddings.join(',')}]`

      const chunks = await db
        .select({
          id: schema.audioChunks.id,
          roomId: schema.audioChunks.roomId,
          createdAt: schema.audioChunks.createdAt,
          embeddings: schema.audioChunks.embeddings,
          transcription: schema.audioChunks.transcription,
          similarity: sql<number>`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector)`,
        })
        .from(schema.audioChunks)
        .where(
          and(
            eq(schema.audioChunks.roomId, roomId),
            sql`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector) > ${SIMILARITY_THRESHOLD}`
          )
        )
        .orderBy(
          sql`${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector`
        )
        .limit(5)

      let answer: string | null = null

      if (chunks.length > 0) {
        const transcriptions = chunks.map((chunk) => chunk.transcription)

        answer = await generateAnswer(question, transcriptions)
      }

      const [result] = await db
        .insert(schema.questions)
        .values({
          roomId,
          answer,
          question,
        })
        .returning()

      if (!result) {
        throw new Error('Failed to create new question.')
      }

      return reply.status(201).send({
        question: result,
      })
    }
  )
}
