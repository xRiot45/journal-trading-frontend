import z from "zod"
import { ElementRequest, ElementType } from "../types/element.types"

export const elementSchema = z.object({
    strategyId: z.string().min(1, "Strategy ID wajib diisi"),
    type: z.nativeEnum(ElementType),
    identifier: z.string().min(1, "Identifier tidak boleh kosong"),
    x: z.number(),
    y: z.number(),
    width: z.number().positive(),
    height: z.number().positive(),
    zIndex: z.number().int(),
    parentElementId: z.string().nullable(),
    isLocked: z.boolean().optional(),
    isVisible: z.boolean().optional(),
}) satisfies z.ZodType<ElementRequest>

export const elementUpdateSchema = elementSchema
    .omit({
        strategyId: true,
        type: true,
    })
    .partial()

export const elementUpsertSchema = elementSchema
    .extend({
        id: z.string().uuid("ID harus format UUID").optional(),
    })
    .partial({
        type: true,
        identifier: true,
        x: true,
        y: true,
        width: true,
        height: true,
        zIndex: true,
        parentElementId: true,
    })

export type ElementFormValues = z.infer<typeof elementSchema>
export type ElementUpdateFormValues = z.infer<typeof elementUpdateSchema>
export type ElementUpsertValues = z.infer<typeof elementUpsertSchema>
