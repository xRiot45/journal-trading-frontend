import z from "zod"
import { StrategiesRequest } from "../types/strategies.types"

export const strategySchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
}) satisfies z.ZodType<StrategiesRequest>

export type StrategyFormValues = z.infer<typeof strategySchema>
