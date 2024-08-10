import { z } from "zod"

export const JWTPayloadSchema = z.object({
    username: z.string(),
    id: z.string(),
    email: z.string(),
})

export type JWTPayloadType = z.infer<typeof JWTPayloadSchema>

