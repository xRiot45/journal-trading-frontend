"use client"

import { UseFormReturn } from "react-hook-form"
import { TradingPlanFormValues } from "../schemas/trading-plan.schema"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PairSelect } from "@/features/pairs/components/pair-select"
import { RichTextEditor } from "@/components/rich-text-editor"
import { FileUpload } from "@/components/file-upload"
import { useTradingPlanStore } from "../store/trading-plan.store"
import { useState } from "react"

interface TradingPlanFormFieldsProps {
    form: UseFormReturn<TradingPlanFormValues>
}

export function TradingPlanFormFields({ form }: TradingPlanFormFieldsProps) {
    const { tradingPlan } = useTradingPlanStore()
    const [thumbnailCleared, setThumbnailCleared] = useState(false)

    return (
        <>
            <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <FileUpload
                                label="Thumbnail"
                                description="Upload Thumbnail"
                                value={field.value}
                                onFilesChange={(files) => {
                                    if (files.length === 0) {
                                        setThumbnailCleared(true) // ✅ tandai sudah dihapus
                                    }
                                    field.onChange(files[0]?.file ?? null)
                                }}
                                existingPreviewUrl={
                                    !thumbnailCleared && // ✅ cek flag ini
                                    !(field.value instanceof File) &&
                                    tradingPlan?.thumbnailUrl
                                        ? `${process.env.NEXT_PUBLIC_API_URL}${tradingPlan.thumbnailUrl}`
                                        : undefined
                                }
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input
                                className="rounded-md py-5"
                                placeholder="Enter title for your trading plan"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                            <Input
                                type="date"
                                className="rounded-md py-5"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <PairSelect
                control={form.control}
                name="pairId"
                label="Pair"
                placeholder="Select pair"
            />

            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <RichTextEditor
                                value={field.value}
                                onChange={(value) =>
                                    form.setValue("description", value, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                    })
                                }
                                placeholder="Describe your trading plan..."
                                showCharCount
                                showWordCount
                                showHtmlToggle
                                minHeight="520px"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}
