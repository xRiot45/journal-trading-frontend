import { useQueryClient } from "@tanstack/react-query"

export default function useInvalidatePairs(key: string) {
    const queryClient = useQueryClient()
    return () => queryClient.invalidateQueries({ queryKey: [key] })
}
