"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send, X, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { submitWithRetry } from "@/utils/api";

// Form validation schema
const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  mobile: z
    .string()
    .regex(/^\+?[0-9]{10,14}$/, "Please enter a valid mobile number"),
  name: z.string().min(2, "Name should be at least 2 characters"),
});

type FormValues = z.infer<typeof formSchema>;

// Constants
const INITIAL_POPUP_DELAY = 10_000; // 10 seconds
const RECURRING_POPUP_DELAY = 60_000; // 1 minute
const SUCCESS_MESSAGE_DURATION = 2000; // 2 seconds

// Extend Window to include LinkedIn Insight lintrk function
declare global {
  interface Window {
    lintrk?: (action: string, params: { conversion_id: number }) => void;
  }
}

export default function PopupForm() {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);

  // Form initialization
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      mobile: "",
      name: "",
    },
    resolver: zodResolver(formSchema),
  });

  // Show popup after initial delay
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), INITIAL_POPUP_DELAY);
    return () => clearTimeout(timer);
  }, []);

  // Set up recurring popup if user hasn't submitted the form
  useEffect(() => {
    if (!hasInteracted || isSuccess) {
      return;
    }

    const timer = setTimeout(() => setIsOpen(true), RECURRING_POPUP_DELAY);
    return () => clearTimeout(timer);
  }, [hasInteracted, isSuccess]);

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const response = await submitWithRetry({
        email: data.email,
        firstName: data.name,
        lastName: "",
        message: "",
        mobile: data.mobile,
        subject: "Popup Form Submission",
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

      // Fire LinkedIn conversion event
      window.lintrk?.("track", { conversion_id: 26_490_052 });

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

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md animate-fadeIn rounded-xl bg-white shadow-lg">
        <CloseButton onClick={handleClose} />
        <div className="p-6">
          <FormHeader />
          {isSuccess ? (
            <SuccessMessage />
          ) : (
            <FormContent
              errorMessage={errorMessage}
              form={form}
              isSubmitting={isSubmitting}
              onSubmit={onSubmit}
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
    aria-label="Close popup"
    className="absolute top-4 right-4 text-grey-35 transition-colors hover:text-grey-15"
    onClick={onClick}
  >
    <X className="h-6 w-6" />
  </button>
);

const FormHeader = () => (
  <>
    <h2 className="mb-2 font-bold font-vietnam text-2xl text-grey-15">
      Stay Connected!
    </h2>
    <p className="mb-6 text-grey-35">
      Join our community to receive updates and special offers.
    </p>
  </>
);

const SuccessMessage = () => (
  <div className="flex flex-col items-center justify-center py-6">
    <CheckCircle2 className="mb-4 h-12 w-12 text-green-500" />
    <p className="text-center font-medium text-grey-15">
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
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="flex items-center gap-1 text-grey-35">
              Name
              <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                className="h-12 border-light-90 bg-light-97 focus:border-primary-75 focus:ring-primary-75"
                placeholder="Enter your name"
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
            <FormLabel className="flex items-center gap-1 text-grey-35">
              Email
              <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                className="h-12 border-light-90 bg-light-97 focus:border-primary-75 focus:ring-primary-75"
                placeholder="Enter your email"
                type="email"
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
            <FormLabel className="flex items-center gap-1 text-grey-35">
              Mobile Number
              <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                className="h-12 border-light-90 bg-light-97 focus:border-primary-75 focus:ring-primary-75"
                placeholder="Enter your phone number"
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
  <div className="flex items-center gap-2 text-red-500 text-sm">
    <XCircle className="h-4 w-4" />
    {message}
  </div>
);

const SubmitButton = ({ isSubmitting }: { isSubmitting: boolean }) => (
  <Button
    className="flex h-12 w-full items-center justify-center gap-2 bg-primary-75 text-white hover:bg-primary-70"
    disabled={isSubmitting}
    type="submit"
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
