import z from "zod"
import { PairRequest } from "../types/pair.types"

export const pairSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
}) satisfies z.ZodType<PairRequest>

export type PairFormValues = z.infer<typeof pairSchema>
