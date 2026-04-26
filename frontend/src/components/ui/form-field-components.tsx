import React from "react";
import { cn } from "@/lib/utils";
 
// FieldSet
interface FieldSetProps {
  children: React.ReactNode;
  className?: string;
}
 
export const FieldSet = ({ children, className }: FieldSetProps) => (
  <fieldset className={cn("flex flex-col gap-6", className)}>
    {children}
  </fieldset>
);
 
// FieldLegend
interface FieldLegendProps {
  children: React.ReactNode;
  className?: string;
}
 
export const FieldLegend = ({ children, className }: FieldLegendProps) => (
  <legend className={cn("text-lg font-semibold text-dark", className)}>
    {children}
  </legend>
);
 
// FieldGroup
interface FieldGroupProps {
  children: React.ReactNode;
  className?: string;
}
 
export const FieldGroup = ({ children, className }: FieldGroupProps) => (
  <div className={cn("flex flex-col gap-4", className)}>
    {children}
  </div>
);
 
// Field
interface FieldProps {
  children: React.ReactNode;
  orientation?: "vertical" | "horizontal";
  className?: string;
}
 
export const Field = ({ children, orientation = "vertical", className }: FieldProps) => (
  <div
    className={cn(
      "flex gap-2",
      orientation === "vertical" ? "flex-col" : "flex-row items-center",
      className
    )}
  >
    {children}
  </div>
);
 
// FieldLabel
interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  className?: string;
}
 
export const FieldLabel = ({ children, className, ...props }: FieldLabelProps) => (
  <label className={cn("text-sm font-medium text-dark", className)} {...props}>
    {children}
  </label>
);
 
// FieldDescription
interface FieldDescriptionProps {
  children: React.ReactNode;
  className?: string;
}
 
export const FieldDescription = ({ children, className }: FieldDescriptionProps) => (
  <p className={cn("text-sm text-muted-foreground", className)}>
    {children}
  </p>
);
 
// FieldError
interface FieldErrorProps {
  errors?: unknown[];
  children?: React.ReactNode;
  className?: string;
}
 
export const FieldError = ({ errors, children, className }: FieldErrorProps) => {
  const message = children ?? (Array.isArray(errors) && errors.length > 0
    ? (typeof errors[0] === "string" ? errors[0] : (errors[0] as any)?.message)
    : null);

  if (!message) return null;

  return (
    <p className={cn("text-sm text-destructive", className)}>
      {message}
    </p>
  );
};