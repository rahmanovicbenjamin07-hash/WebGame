import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function LabelBig({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "text-[16px] weight-[500]! leading-none text-dark lg:leading-[150%] font-poppins",
        className
      )}
      {...props}
    />
  )
}

export { LabelBig }
