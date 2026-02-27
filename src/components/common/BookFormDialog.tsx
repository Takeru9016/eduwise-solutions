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
import { useSanityCourses } from "@/hooks/useSanityCourses";

// Form schema with validation rules
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
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

// Types
type FormValues = z.infer<typeof formSchema>;

interface BookFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Time slot generator
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    const isPM = hour >= 12;
    const displayHour = hour > 12 ? hour - 12 : hour;
    const meridiem = isPM ? "PM" : "AM";

    slots.push({
      value: `${hour}:00`,
      label: `${displayHour}:00 ${meridiem}`,
    });

    if (hour < 17) {
      slots.push({
        value: `${hour}:30`,
        label: `${displayHour}:30 ${meridiem}`,
      });
    }
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();

export default function BookFormDialog({
  open,
  onOpenChange,
}: BookFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const { courses, isLoading: isLoadingCourses } = useSanityCourses();

  // Initialize form with react-hook-form
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

  // Set initial date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    form.setValue("sessionDate", tomorrow);
  }, [form]);

  // Form submission handler
  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          sessionDate: values.sessionDate.toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

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

      toast.error("Booking failed", {
        description:
          error instanceof Error ?
            error.message
          : "There was a problem booking your session. Please try again.",
        duration: 5000,
        className: "bg-white border border-gray-100 shadow-lg rounded-lg",
        descriptionClassName: "text-gray-600 text-sm",
        position: "bottom-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Helper to find time slot label
  const getTimeSlotLabel = (value: string) => {
    return TIME_SLOTS.find((slot) => slot.value === value)?.label || value;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] w-full p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Book a Private Counselling Session
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600 mt-2">
            Schedule a personalized consultation with our education experts to
            discuss your career goals.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-md font-medium text-gray-700">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Full Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-10 focus:ring-2 focus:ring-primary-100"
                          placeholder="Enter your full name"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Email <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="h-10 focus:ring-2 focus:ring-primary-100"
                          placeholder="your.email@example.com"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Phone Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <ReactPhoneInput
                        country={"in"}
                        value={phoneValue}
                        onChange={(phone, data) => {
                          setPhoneValue(phone);
                          if (data && "dialCode" in data) {
                            const countryCode = `+${data.dialCode}`;
                            const phoneWithoutCode = phone.replace(
                              countryCode,
                              "",
                            );
                            form.setValue("countryCode", countryCode);
                            form.setValue("phoneNumber", phoneWithoutCode);
                            field.onChange(phoneWithoutCode);
                          } else {
                            form.setValue("countryCode", "+91");
                            field.onChange(phone);
                          }
                        }}
                        inputClass="!w-full !h-10 !rounded-md !pl-[60px] focus:!ring-2 focus:!ring-primary-100"
                        containerClass="!w-full"
                        buttonClass="!h-10 !rounded-l-md"
                        dropdownClass="!max-h-[200px] !overflow-y-auto"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* Session Details Section */}
            <div className="space-y-4 pt-2">
              <h3 className="text-md font-medium text-gray-700">
                Session Details
              </h3>

              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Course of Interest <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-10">
                          <SelectValue
                            placeholder={
                              isLoadingCourses ? "Loading courses..." : (
                                "Select a course"
                              )
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        className="max-w-[400px] w-fit"
                        align="start"
                        sideOffset={8}
                      >
                        {courses.map((course) => (
                          <SelectItem
                            key={course.value}
                            value={course.label}
                            className="text-gray-700"
                          >
                            <span className="truncate block">
                              {course.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="sessionDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Preferred Date <span className="text-red-500">*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full h-10 pl-3 text-left font-normal border",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ?
                                format(field.value, "EEE, MMM d, yyyy")
                              : <span>Select a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => date && field.onChange(date)}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                            className="rounded-md border"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sessionTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Preferred Time <span className="text-red-500">*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full h-10 pl-3 text-left font-normal border",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ?
                                <span>{getTimeSlotLabel(field.value)}</span>
                              : <span>Select a time</span>}
                              <Clock className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[220px] p-0" align="start">
                          <div className="max-h-[300px] overflow-y-auto p-2">
                            <div className="grid grid-cols-1 gap-1">
                              {TIME_SLOTS.map((slot) => (
                                <Button
                                  key={slot.value}
                                  type="button"
                                  variant="ghost"
                                  className={cn(
                                    "justify-start font-normal",
                                    field.value === slot.value &&
                                      "bg-primary-100 text-primary-600 font-medium",
                                  )}
                                  onClick={() => {
                                    field.onChange(slot.value);
                                    document
                                      .querySelector(
                                        '[data-state="open"][role="dialog"]',
                                      )
                                      ?.dispatchEvent(
                                        new KeyboardEvent("keydown", {
                                          key: "Escape",
                                        }),
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
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Additional Information */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Additional Information
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Share any specific questions or topics you'd like to discuss"
                      className="min-h-[100px] focus:ring-2 focus:ring-primary-100"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Preferences and Terms */}
            <div className="space-y-3 pt-1">
              <FormField
                control={form.control}
                name="whatsappUpdates"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-0.5"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal text-gray-600">
                        I&apos;d like to receive updates via WhatsApp
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
                        className="mt-0.5"
                        required
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal text-gray-600">
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="text-primary-70 hover:underline font-medium"
                          target="_blank"
                        >
                          Terms and Conditions
                        </Link>{" "}
                        of Eduwise Solutions
                      </FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 bg-primary-75 text-white hover:bg-primary-80 transition-colors mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Book Counselling Session"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
