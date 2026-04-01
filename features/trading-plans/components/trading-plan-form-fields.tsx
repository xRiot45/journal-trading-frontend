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
import { Pair } from "@/features/pairs/types/pair.types"

interface TradingPlanFormFieldsProps {
    form: UseFormReturn<TradingPlanFormValues>
    existingThumbnailUrl?: string
    existingPair?: Pair
}

export function TradingPlanFormFields({
    form,
    existingThumbnailUrl,
    existingPair,
}: TradingPlanFormFieldsProps) {
    console.log(existingPair)
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
                                onFilesChange={(files) =>
                                    field.onChange(files[0]?.file ?? null)
                                }
                                existingPreviewUrl={existingThumbnailUrl}
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
