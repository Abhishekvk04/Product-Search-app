// components/ui/tooltip.js
import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

const Tooltip = ({ children, content, ...props }) => (
  <TooltipPrimitive.Provider>
    <TooltipPrimitive.Root {...props}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content
        className="bg-gray-800 text-white px-2 py-1 rounded text-sm"
        sideOffset={5}
      >
        {content}
        <TooltipPrimitive.Arrow className="fill-gray-800" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  </TooltipPrimitive.Provider>
)

export { Tooltip }