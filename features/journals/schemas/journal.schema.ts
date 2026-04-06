import { z } from "zod"
import {
    BasedOnPlanEnum,
    JournalRequest,
    TradeDirectionEnum,
    TradeStatusEnum,
} from "../types/journal.type"

export const baseSchema = z.object({
    date: z.string().min(1, "Date is required"),
    direction: z.nativeEnum(TradeDirectionEnum),
    status: z.nativeEnum(TradeStatusEnum),
    lotSize: z.coerce
        .number({ message: "Lot size must be a number" })
        .refine((val) => !isNaN(val), { message: "Lot size is required" }),
    entryPrice: z.coerce
        .number({ message: "Entry price must be a number" })
        .refine((val) => !isNaN(val), { message: "Entry price is required" }),
    entryTime: z.string().min(1, "Entry time is required"),
    closingPrice: z.coerce
        .number({ message: "Closing price must be a number" })
        .refine((val) => !isNaN(val), { message: "Closing price is required" }),
    closingTime: z.string().min(1, "Closing time is required"),
    takeProfit: z.coerce
        .number({ message: "Take profit must be a number" })
        .refine((val) => !isNaN(val), { message: "Take profit is required" }),
    stopLoss: z.coerce
        .number({ message: "Stop loss must be a number" })
        .refine((val) => !isNaN(val), { message: "Stop loss is required" }),
    profitAndLoss: z.coerce
        .number({ message: "Profit & Loss must be a number" })
        .refine((val) => !isNaN(val), { message: "Profit & Loss is required" }),
    riskRatio: z.coerce
        .number({ message: "Risk ratio must be a number" })
        .refine((val) => !isNaN(val), { message: "Risk ratio is required" }),
    rewardRatio: z.coerce
        .number({ message: "Reward ratio must be a number" })
        .refine((val) => !isNaN(val), { message: "Reward ratio is required" }),
    basedOnPlan: z.nativeEnum(BasedOnPlanEnum),
    note: z.string().optional(),
    pairId: z.string().uuid("Invalid pair ID"),
    strategyId: z.string().uuid("Invalid strategy ID"),
}) satisfies z.ZodType<JournalRequest>

export const createJournalSchema = baseSchema

export const updateJournalSchema = baseSchema.partial()

export type CreateJournalFormValues = z.infer<typeof createJournalSchema>
export type UpdateJournalFormValues = z.infer<typeof updateJournalSchema>
export type JouralFormValues = CreateJournalFormValues | UpdateJournalFormValues
