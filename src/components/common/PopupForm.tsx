"use client";

import { useState, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Send, CheckCircle2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { submitWithRetry } from "@/utils/api";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  mobile: z
    .string()
    .regex(/^\+?[0-9]{10,14}$/, "Please enter a valid mobile number"),
});

type FormValues = z.infer<typeof formSchema>;

// Constants
const INITIAL_POPUP_DELAY = 10000; // 10 seconds
const RECURRING_POPUP_DELAY = 60000; // 1 minute
const SUCCESS_MESSAGE_DURATION = 2000; // 2 seconds

export default function PopupForm() {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);

  // Form initialization
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
    },
  });

  // Show popup after initial delay
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), INITIAL_POPUP_DELAY);
    return () => clearTimeout(timer);
  }, []);

  // Set up recurring popup if user hasn't submitted the form
  useEffect(() => {
    if (!hasInteracted || isSuccess) return;

    const timer = setTimeout(() => setIsOpen(true), RECURRING_POPUP_DELAY);
    return () => clearTimeout(timer);
  }, [hasInteracted, isSuccess]);

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const response = await submitWithRetry({
        firstName: data.name,
        lastName: "",
        email: data.email,
        mobile: data.mobile,
        subject: "Popup Form Submission",
        message: "",
      });

      if (!response) {
        throw new Error("Network error - please try again");
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Submission failed");
      }

      setIsSuccess(true);
      form.reset();

      // Close popup after successful submission
      setTimeout(() => setIsOpen(false), SUCCESS_MESSAGE_DURATION);
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to submit form - please try again"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close popup handler
  const handleClose = () => {
    setIsOpen(false);
    setHasInteracted(true);
    localStorage.setItem("popupInteracted", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full relative animate-fadeIn">
        <CloseButton onClick={handleClose} />
        <div className="p-6">
          <FormHeader />
          {isSuccess ? (
            <SuccessMessage />
          ) : (
            <FormContent
              form={form}
              onSubmit={onSubmit}
              errorMessage={errorMessage}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Component extraction for better readability
const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="absolute top-4 right-4 text-grey-35 hover:text-grey-15 transition-colors"
    aria-label="Close popup"
  >
    <X className="w-6 h-6" />
  </button>
);

const FormHeader = () => (
  <>
    <h2 className="text-2xl font-vietnam font-bold text-grey-15 mb-2">
      Stay Connected!
    </h2>
    <p className="text-grey-35 mb-6">
      Join our community to receive updates and special offers.
    </p>
  </>
);

const SuccessMessage = () => (
  <div className="flex flex-col items-center justify-center py-6">
    <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
    <p className="text-center text-grey-15 font-medium">
      Thank you for subscribing! We&apos;ll be in touch soon.
    </p>
  </div>
);

const FormContent = ({
  form,
  onSubmit,
  errorMessage,
  isSubmitting,
}: {
  form: UseFormReturn<FormValues>;
  onSubmit: (data: FormValues) => Promise<void>;
  errorMessage: string;
  isSubmitting: boolean;
}) => (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-grey-35 flex items-center gap-1">
              Name
              <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Enter your name"
                className="h-12 bg-light-97 border-light-90 focus:border-primary-75 focus:ring-primary-75"
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-grey-35 flex items-center gap-1">
              Email
              <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                type="email"
                placeholder="Enter your email"
                className="h-12 bg-light-97 border-light-90 focus:border-primary-75 focus:ring-primary-75"
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="mobile"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-grey-35 flex items-center gap-1">
              Mobile Number
              <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Enter your phone number"
                className="h-12 bg-light-97 border-light-90 focus:border-primary-75 focus:ring-primary-75"
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      {errorMessage && <ErrorMessage message={errorMessage} />}

      <SubmitButton isSubmitting={isSubmitting} />
    </form>
  </Form>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="text-red-500 flex items-center gap-2 text-sm">
    <XCircle className="w-4 h-4" />
    {message}
  </div>
);

const SubmitButton = ({ isSubmitting }: { isSubmitting: boolean }) => (
  <Button
    type="submit"
    className="w-full bg-primary-75 hover:bg-primary-70 text-white h-12 flex items-center justify-center gap-2"
    disabled={isSubmitting}
  >
    {isSubmitting ? (
      "Submitting..."
    ) : (
      <>
        Submit
        <Send size={18} />
      </>
    )}
  </Button>
);
