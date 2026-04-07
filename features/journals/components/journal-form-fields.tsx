import { UseFormReturn } from "react-hook-form"
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { JournalFormValues } from "../schemas/journal.schema"
import { TradeDirectionEnum, TradeStatusEnum } from "../types/journal.type"
import { PairSelect } from "@/features/pairs/components/PairSelect"
import { StrategySelect } from "@/features/strategies/components/StrategySelect"

interface JournalFormFieldsProps {
    form: UseFormReturn<JournalFormValues>
}

export function JournalFormFields({ form }: JournalFormFieldsProps) {
    return (
        <div className="grid grid-cols-1 gap-4 space-y-4 md:grid-cols-5">
            {/* Date */}
            <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                            <Input type="date" {...field} className="py-6" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Direction */}
            <FormField
                control={form.control}
                name="direction"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Direction</FormLabel>
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                        >
                            <FormControl>
                                <SelectTrigger className="w-full py-6">
                                    <SelectValue
                                        placeholder="--- Select direction ---"
                                        className="w-full"
                                    />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {Object.values(TradeDirectionEnum).map(
                                    (val) => (
                                        <SelectItem
                                            key={val}
                                            value={val}
                                            className="py-4"
                                        >
                                            {val}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Status */}
            <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                        >
                            <FormControl>
                                <SelectTrigger className="w-full py-6">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {Object.values(TradeStatusEnum).map((val) => (
                                    <SelectItem key={val} value={val}>
                                        {val}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Pair Select */}
            <FormField
                control={form.control}
                name="pairId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Pair</FormLabel>
                        <FormControl>
                            <PairSelect
                                value={field.value}
                                onChange={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Strategy Select */}
            <FormField
                control={form.control}
                name="strategyId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Strategy</FormLabel>
                        <FormControl>
                            <StrategySelect
                                value={field.value}
                                onChange={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Lot Size */}
            <FormField
                control={form.control}
                name="lotSize"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Lot Size</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                step="any"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) => {
                                    const val = e.target.value
                                    field.onChange(
                                        val === "" ? undefined : Number(val)
                                    )
                                }}
                                className="w-full py-6"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Entry Price */}
            <FormField
                control={form.control}
                name="entryPrice"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Entry Price</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                step="any"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) => {
                                    const val = e.target.value
                                    field.onChange(
                                        val === "" ? undefined : Number(val)
                                    )
                                }}
                                className="w-full py-6"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Entry Time */}
            <FormField
                control={form.control}
                name="entryTime"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Entry Time</FormLabel>
                        <FormControl>
                            <Input
                                type="time"
                                {...field}
                                className="w-full py-6"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Closing Price */}
            <FormField
                control={form.control}
                name="closingPrice"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Closing Price</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                step="any"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) => {
                                    const val = e.target.value
                                    field.onChange(
                                        val === "" ? undefined : Number(val)
                                    )
                                }}
                                className="w-full py-6"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Closing Time */}
            <FormField
                control={form.control}
                name="closingTime"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Closing Time</FormLabel>
                        <FormControl>
                            <Input
                                type="time"
                                {...field}
                                className="w-full py-6"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Take Profit */}
            <FormField
                control={form.control}
                name="takeProfit"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Take Profit</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                step="any"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) => {
                                    const val = e.target.value
                                    field.onChange(
                                        val === "" ? undefined : Number(val)
                                    )
                                }}
                                className="w-full py-6"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Stop Loss */}
            <FormField
                control={form.control}
                name="stopLoss"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Stop Loss</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                step="any"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) => {
                                    const val = e.target.value
                                    field.onChange(
                                        val === "" ? undefined : Number(val)
                                    )
                                }}
                                className="w-full py-6"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Profit & Loss */}
            <FormField
                control={form.control}
                name="profitAndLoss"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Profit & Loss</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                step="any"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) => {
                                    const val = e.target.value
                                    field.onChange(
                                        val === "" ? undefined : Number(val)
                                    )
                                }}
                                className="w-full py-6"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Risk Ratio */}
            <FormField
                control={form.control}
                name="riskRatio"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Risk Ratio</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                step="any"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) => {
                                    const val = e.target.value
                                    field.onChange(
                                        val === "" ? undefined : Number(val)
                                    )
                                }}
                                className="w-full py-6"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Reward Ratio */}
            <FormField
                control={form.control}
                name="rewardRatio"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Reward Ratio</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                step="any"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) => {
                                    const val = e.target.value
                                    field.onChange(
                                        val === "" ? undefined : Number(val)
                                    )
                                }}
                                className="w-full py-6"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Based On Plan */}
            <FormField
                control={form.control}
                name="basedOnPlan"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Based On Plan</FormLabel>
                        <Select
                            onValueChange={(val) => field.onChange(Number(val))}
                            value={
                                field.value !== undefined
                                    ? String(field.value)
                                    : undefined
                            }
                        >
                            <FormControl>
                                <SelectTrigger className="w-full py-6">
                                    <SelectValue placeholder="Select option" />
                                </SelectTrigger>
                            </FormControl>

                            <SelectContent>
                                <SelectItem value="1">Yes</SelectItem>
                                <SelectItem value="0">No</SelectItem>
                            </SelectContent>
                        </Select>

                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Note */}
            <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                    <FormItem className="md:col-span-2">
                        <FormLabel>Note</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Write your note..."
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}
