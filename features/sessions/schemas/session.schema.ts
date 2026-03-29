import z from "zod"
import { SessionRequest } from "../types/session.types"

export const sessionSchema = z.object({
    name: z.string().min(1, "Name is required"),
    startTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
    endTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
}) satisfies z.ZodType<SessionRequest>

export type SessionFormValues = z.infer<typeof sessionSchema>
