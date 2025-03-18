"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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

// Schema for the popup form
const popupFormSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  mobile: z
    .string()
    .regex(/^\+?[0-9]{10,14}$/, "Please enter a valid mobile number"),
});

type PopupFormValues = z.infer<typeof popupFormSchema>;

export default function PopupForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);

  // Form setup
  const form = useForm<PopupFormValues>({
    resolver: zodResolver(popupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
    },
  });

  // Show popup after initial delay
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setIsOpen(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(initialTimer);
  }, []);

  // Set up recurring popup if user hasn't submitted the form
  useEffect(() => {
    // Only set up recurring popup if user has interacted but not submitted
    if (hasInteracted && !isSuccess) {
      const recurringTimer = setTimeout(() => {
        setIsOpen(true);
      }, 60000); // Reappear after 1 minute (adjust as needed)

      return () => clearTimeout(recurringTimer);
    }
  }, [hasInteracted, isSuccess]);

  // Handle form submission
  const onSubmit = async (data: PopupFormValues) => {
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

      // Close popup after successful submission after 2 seconds
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    } catch (error) {
      console.error("Form submission error:", error);
      setIsSuccess(false);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to submit form - please try again"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle closing the popup
  const handleClose = () => {
    setIsOpen(false);
    setHasInteracted(true);

    // Store in localStorage to remember across page refreshes (optional)
    localStorage.setItem("popupInteracted", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full relative animate-fadeIn">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-grey-35 hover:text-grey-15 transition-colors"
          aria-label="Close popup"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-vietnam font-bold text-grey-15 mb-2">
            Stay Connected!
          </h2>
          <p className="text-grey-35 mb-6">
            Join our community to receive updates and special offers.
          </p>

          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-6">
              <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
              <p className="text-center text-grey-15 font-medium">
                Thank you for subscribing! We'll be in touch soon.
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Form fields remain the same */}
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

                {errorMessage && (
                  <div className="text-red-500 flex items-center gap-2 text-sm">
                    <XCircle className="w-4 h-4" />
                    {errorMessage}
                  </div>
                )}

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
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}
