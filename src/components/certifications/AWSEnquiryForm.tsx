"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send, XCircle } from "lucide-react";
import { useState } from "react";
import { type Control, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitWithRetry } from "@/utils/api";

const contactFormSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  firstName: z.string().min(2, "First name should be at least 2 characters"),
  lastName: z.string().min(2, "Last name should be at least 2 characters"),
  message: z.string().optional(),
  mobile: z
    .string()
    .regex(/^\+?[0-9]{10,14}$/, "Please enter a valid mobile number"),
  subject: z.string().min(1, "Please select a certification"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface FormFieldProps {
  control: Control<ContactFormValues>;
  label: string;
  name: keyof ContactFormValues;
  placeholder: string;
  required?: boolean;
  type?: string;
}

const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
  <FormLabel className="flex items-center gap-1 text-grey-35">
    {children}
    <span className="text-red-500">*</span>
  </FormLabel>
);

const FormInputField = ({
  name,
  label,
  placeholder,
  type = "text",
  required = true,
  control,
}: FormFieldProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="space-y-2">
        {required ? (
          <RequiredLabel>{label}</RequiredLabel>
        ) : (
          <FormLabel className="text-grey-35">
            {label}
            <span className="ml-2 font-medium text-primary-75 text-sm">
              (Optional)
            </span>
          </FormLabel>
        )}
        <FormControl>
          <Input
            {...field}
            className="h-12 border-light-90 bg-light-97 focus:border-primary-75 focus:ring-primary-75"
            placeholder={placeholder}
            type={type}
          />
        </FormControl>
        <FormMessage className="text-red-500" />
      </FormItem>
    )}
  />
);

const AWS_CERTIFICATIONS = [
  "AWS Certified Cloud Practitioner",
  "AWS Certified AI Practitioner",
  "AWS Certified Solutions Architect – Associate",
  "AWS Certified Developer – Associate",
  "AWS Certified SysOps Administrator – Associate",
  "AWS Certified Data Engineer – Associate",
  "AWS Certified Machine Learning Engineer – Associate",
  "Other",
];

export default function AWSEnquiryForm() {
  const [showDialog, setShowDialog] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<ContactFormValues>({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      message: "",
      mobile: "",
      subject: "",
    },
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setIsSubmitting(true);
      setErrorMessage("");
      setShowDialog(false);

      const response = await submitWithRetry(
        {
          ...data,
          message: data.message || "",
        },
        3,
        "/api/aws-enquiry"
      );

      if (!response) {
        throw new Error("Network error - please try again");
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Submission failed");
      }

      setIsSuccess(true);
      form.reset();
      setShowDialog(true);
    } catch (error) {
      console.error("Form submission error:", error);
      setIsSuccess(false);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to submit form - please try again"
      );
      setShowDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sticky top-24 mx-auto w-full max-w-[400px] rounded-xl border border-light-90 bg-white p-6 shadow-lg">
      <h3 className="mb-6 text-center font-bold font-vietnam text-grey-15 text-xl">
        Enquire Now
      </h3>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInputField
            control={form.control}
            label="First Name"
            name="firstName"
            placeholder="Full Name"
          />

          <FormInputField
            control={form.control}
            label="Last Name"
            name="lastName"
            placeholder="Last Name"
          />

          <FormInputField
            control={form.control}
            label="Email"
            name="email"
            placeholder="Email ID"
            type="email"
          />

          <FormInputField
            control={form.control}
            label="Mobile Number"
            name="mobile"
            placeholder="Phone Number"
          />

          {/* Subject Field */}
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <RequiredLabel>Certification of Interest</RequiredLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 border-light-90 bg-light-97">
                      <SelectValue placeholder="Select a certification" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {AWS_CERTIFICATIONS.map((cert) => (
                      <SelectItem
                        className="text-grey-35"
                        key={cert}
                        value={cert}
                      >
                        {cert}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <Button
            className="flex h-12 w-full items-center justify-center gap-2 bg-primary-75 text-base text-white hover:bg-primary-70"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                Submit Enquiry
                <Send size={18} />
              </>
            )}
          </Button>
        </form>
      </Form>

      {/* Success/Error Dialog */}
      <Dialog onOpenChange={setShowDialog} open={showDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              {isSuccess ? (
                <>
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                  Message Sent Successfully!
                </>
              ) : (
                <>
                  <XCircle className="h-6 w-6 text-red-500" />
                  Error Sending Message
                </>
              )}
            </DialogTitle>
            <DialogDescription className="mt-2 text-grey-35">
              {isSuccess
                ? "Thank you for reaching out! We'll get back to you soon regarding AWS certifications."
                : errorMessage ||
                  "There was an error sending your message. Please try again."}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6">
            <Button
              className="h-12 w-full bg-primary-75 text-white hover:bg-primary-70"
              onClick={() => setShowDialog(false)}
            >
              {isSuccess ? "Close" : "Try Again"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
