"use client"

import { type UseFormReturn } from "react-hook-form"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { type SessionFormValues } from "../schemas/session.schema"
import { Textarea } from "@/components/ui/textarea"

interface SessionFormFieldsProps {
    form: UseFormReturn<SessionFormValues>
}

export function SessionFormFields({ form }: SessionFormFieldsProps) {
    return (
        <>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input
                                className="rounded-md py-5"
                                placeholder="Enter pair name"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <FormControl>
                            <Input
                                type="time"
                                className="rounded-md py-5"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>End Time</FormLabel>
                        <FormControl>
                            <Input
                                type="time"
                                className="rounded-md py-5"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea
                                className="h-20 rounded-md"
                                placeholder="Enter session description"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}
