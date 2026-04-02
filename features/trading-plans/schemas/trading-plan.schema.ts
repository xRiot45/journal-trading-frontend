import z from "zod"

const baseSchema = z.object({
    title: z.string().min(1, "Title is required"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
    description: z.string().min(1, "Description is required"),
    pairId: z.string().min(1, "Trading pair is required"),
})

const thumbnailSchema = z
    .instanceof(File, { message: "Thumbnail is required" })
    .refine((file) => file.size > 0, "File is empty")
    .refine((file) => file.size <= 2 * 1024 * 1024, "Max file size is 2MB")
    .refine(
        (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
        "Only JPG, PNG, WEBP allowed"
    )

// Create: thumbnail wajib
export const createTradingPlanSchema = baseSchema.extend({
    thumbnail: thumbnailSchema,
})

// Edit: thumbnail opsional
export const editTradingPlanSchema = baseSchema.extend({
    thumbnail: thumbnailSchema.nullable().optional(),
    pairId: z.string().optional(),
})

export type CreateTradingPlanFormValues = z.infer<
    typeof createTradingPlanSchema
>
export type EditTradingPlanFormValues = z.infer<typeof editTradingPlanSchema>

export type TradingPlanFormValues =
    | CreateTradingPlanFormValues
    | EditTradingPlanFormValues
