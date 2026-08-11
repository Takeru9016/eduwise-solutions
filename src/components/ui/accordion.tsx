"use client";

import { ChevronDown } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import type * as React from "react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & {
  ref?: React.Ref<React.ElementRef<typeof AccordionPrimitive.Item>>;
}) => (
  <AccordionPrimitive.Item
    className={cn("border-b", className)}
    ref={ref}
    {...props}
  />
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = ({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
  ref?: React.Ref<React.ElementRef<typeof AccordionPrimitive.Trigger>>;
}) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = ({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & {
  ref?: React.Ref<React.ElementRef<typeof AccordionPrimitive.Content>>;
}) => (
  <AccordionPrimitive.Content
    className="grid text-sm transition-[grid-template-rows] duration-200 ease-out data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr]"
    ref={ref}
    {...props}
  >
    <div className={cn("min-h-0 overflow-hidden pt-0 pb-4", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
);

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
