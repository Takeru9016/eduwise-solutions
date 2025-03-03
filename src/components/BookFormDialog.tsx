"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon, Clock, Check } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  countryCode: z.string().default("+91"),
  course: z.string().min(1, "Please select a course"),
  sessionDate: z.date({
    required_error: "Please select a date",
  }),
  sessionTime: z.string().min(1, "Please select a time"),
  message: z.string().optional(),
  whatsappUpdates: z.boolean().default(false),
  termsAccepted: z.boolean().default(false),
});

// Define types based on the schema
type FormValues = z.infer<typeof formSchema>;

// Define props for the component
interface BookFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const subjects = [
  { value: "mba", label: "Master in Business Administration (MBA)" },
  {
    value: "msc_in_ds",
    label: "MSc in Artificial Intelligence and Data Science",
  },
  { value: "msc_in_cc", label: "MSc in Cloud Computing" },
  { value: "professional_certification", label: "Professional Certification" },
  { value: "certification_programme", label: "Certification Programme" },
  { value: "other", label: "Other" },
];

// Generate time slots from 9 AM to 5 PM with 30-minute intervals
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    const hourFormatted =
      hour < 12 ? `${hour} AM` : hour === 12 ? `${hour} PM` : `${hour - 12} PM`;
    slots.push({ value: `${hour}:00`, label: `${hourFormatted}` });
    if (hour < 17) {
      slots.push({
        value: `${hour}:30`,
        label: `${hour < 12 ? hour : hour === 12 ? hour : hour - 12}:30 ${
          hour < 12 ? "AM" : "PM"
        }`,
      });
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

export default function BookFormDialog({
  open,
  onOpenChange,
}: BookFormDialogProps) {
  const [phoneValue, setPhoneValue] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      countryCode: "+91",
      course: "",
      message: "",
      whatsappUpdates: false,
      termsAccepted: false,
    },
  });

  // Set initial date to tomorrow to avoid validation issues
  useEffect(() => {
    // Set initial date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    form.setValue("sessionDate", tomorrow);
  }, [form]);

  async function onSubmit(values: FormValues) {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          // Ensure date is properly serialized
          sessionDate: values.sessionDate.toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      // Revamped toast notification - success
      toast.success("Session booked successfully!", {
        description: "Check your email for confirmation details.",
        duration: 5000,
        className: "bg-white border border-gray-100 shadow-lg rounded-lg",
        descriptionClassName: "text-gray-600 text-sm",
        position: "bottom-right",
        icon: <Check className="h-5 w-5 text-green-500" />,
      });

      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Booking error:", error);

      // Revamped toast notification - error
      toast.error("Booking failed", {
        description:
          error instanceof Error
            ? error.message
            : "There was a problem booking your session. Please try again.",
        duration: 5000,
        className: "bg-white border border-gray-100 shadow-lg rounded-lg",
        descriptionClassName: "text-gray-600 text-sm",
        position: "bottom-right",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] w-full p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Book a Private Counselling Session
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600">
            Whether to upskill or for any other query, please drop us a line and
            we&apos;ll be happy to get back to you.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      Full Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="email" className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      Phone Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <ReactPhoneInput
                        country={"in"}
                        value={phoneValue}
                        onChange={(phone, data) => {
                          setPhoneValue(phone);

                          // Type guard to check if data has dialCode property
                          if (data && "dialCode" in data) {
                            const countryCode = `+${data.dialCode}`;
                            const phoneWithoutCode = phone.replace(
                              countryCode,
                              ""
                            );

                            // Update form values
                            form.setValue("countryCode", countryCode);
                            form.setValue("phoneNumber", phoneWithoutCode);
                            field.onChange(phoneWithoutCode);
                          } else {
                            // Fallback if data doesn't have dialCode
                            form.setValue("countryCode", "+91"); // Default to India
                            field.onChange(phone);
                          }
                        }}
                        inputClass="!w-full !h-12 !rounded-md !pl-[60px]"
                        containerClass="!w-full"
                        buttonClass="!h-12 !rounded-l-md"
                        dropdownClass="!max-h-[200px] !overflow-y-auto"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      Course <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        className="max-w-[400px] w-fit"
                        align="start"
                        alignOffset={0}
                        sideOffset={8}
                        avoidCollisions={true}
                      >
                        {subjects.map((subject) => (
                          <SelectItem
                            key={subject.value}
                            value={subject.label}
                            className="text-grey-35"
                          >
                            <span className="truncate block">
                              {subject.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="sessionDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-base">
                      Date <span className="text-red-500">*</span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full h-12 pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "EEEE, MMMM d, yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            if (date) field.onChange(date);
                          }}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                          className="rounded-md border"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sessionTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      Time <span className="text-red-500">*</span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full h-12 pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              <span>
                                {
                                  timeSlots.find(
                                    (slot) => slot.value === field.value
                                  )?.label
                                }
                              </span>
                            ) : (
                              <span>Select a time</span>
                            )}
                            <Clock className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[220px] p-0" align="start">
                        <div className="max-h-[300px] overflow-y-auto p-2">
                          <div className="grid grid-cols-1 gap-1">
                            {timeSlots.map((slot) => (
                              <Button
                                key={slot.value}
                                variant="ghost"
                                className={cn(
                                  "justify-start font-normal",
                                  field.value === slot.value &&
                                    "bg-primary-100 text-primary-600 font-medium"
                                )}
                                onClick={() => {
                                  field.onChange(slot.value);
                                  document
                                    .querySelector(
                                      '[data-state="open"][role="dialog"]'
                                    )
                                    ?.dispatchEvent(
                                      new KeyboardEvent("keydown", {
                                        key: "Escape",
                                      })
                                    );
                                }}
                              >
                                {slot.label}
                                {field.value === slot.value && (
                                  <Check className="ml-auto h-4 w-4" />
                                )}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Optional message"
                      className="min-h-[120px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="whatsappUpdates"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        I want to receive updates on WhatsApp also.
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        required
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        I agree to{" "}
                        <Link
                          href="/terms"
                          className="text-primary-70 hover:underline"
                          target="_blank"
                        >
                          Terms and Conditions
                        </Link>{" "}
                        applied by Eduwise Solutions.
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary-75 text-white hover:bg-gray-800"
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
