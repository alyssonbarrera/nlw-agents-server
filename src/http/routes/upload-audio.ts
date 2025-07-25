import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'
import { generateEmbeddings, transcribeAudio } from '../../services/gemini.ts'

export const uploadAudioRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/audio',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params
      const audio = await request.file()

      if (!audio) {
        return reply.status(400).send({ error: 'Audio is required.' })
      }

      const audioBuffer = await audio.toBuffer()
      const audioAsBase64 = audioBuffer.toString('base64')

      // 1. Transcrever o aúdio
      // 2. Gerar o vetor semântico / embeddings
      // 3. Armazenar os vetores no banco de dados

      const transcription = await transcribeAudio(audioAsBase64, audio.mimetype)
      const embeddings = await generateEmbeddings(transcription)

      const [result] = await db
        .insert(schema.audioChunks)
        .values({
          roomId,
          embeddings,
          transcription,
        })
        .returning()

      if (!result) {
        return reply.status(500).send({ error: 'Failed to save audio chunk.' })
      }

      return reply.status(201).send({ audioChunk: result })
    }
  )
}
