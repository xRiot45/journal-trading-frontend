import { Control } from "react-hook-form"

export interface Pair {
    id: string
    name: string
    description?: string
}

export interface PairSelectProps {
    control: Control
    name: string
    label?: string
    placeholder?: string
    disabled?: boolean
}
