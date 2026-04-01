let counter = 0

/**
 * Generates a unique file ID without external dependencies.
 * Uses timestamp + counter + random suffix for uniqueness.
 */
export function generateId(): string {
  counter = (counter + 1) % 1_000_000
  return `fu_${Date.now()}_${counter}_${Math.random().toString(36).slice(2, 7)}`
}
