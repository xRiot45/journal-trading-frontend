import z from "zod"
import { TradingPlanRequest } from "../types/trading-plan.types"

export const tradingPlanSchema = z.object({
    title: z.string().min(1, "Title is required"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
    description: z
        .string()
        .min(1, "Description is required")
        .max(255, "Description must be less than 255 characters"),
    pairId: z.string().min(1, "Trading pair is required"),
    thumbnail: z
        .instanceof(File, { message: "Thumbnail is required" })
        .refine((file) => file.size > 0, "File is empty")
        .refine((file) => file.size <= 2 * 1024 * 1024, "Max file size is 2MB")
        .refine(
            (file) =>
                ["image/jpeg", "image/png", "image/webp"].includes(file.type),
            "Only JPG, PNG, WEBP allowed"
        ),
}) satisfies z.ZodType<TradingPlanRequest>

export type TradingPlanFormValues = z.infer<typeof tradingPlanSchema>
