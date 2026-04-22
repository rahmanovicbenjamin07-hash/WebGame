import type { StandardSchemaV1Issue } from '@tanstack/react-form'

interface FieldErrorProps {
  errors: Array<StandardSchemaV1Issue | string | undefined>
}

export function FieldError({ errors }: FieldErrorProps) {
  if (!errors[0]) return null

  const message = typeof errors[0] === 'string' 
    ? errors[0] 
    : errors[0].message

  return <p className="text-red-500 text-[11px]">{message}</p>
}