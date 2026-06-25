"use client";

import { useState } from "react";
import { Control, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, XCircle, Send } from "lucide-react";

import { submitWithRetry } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name should be at least 2 characters"),
  lastName: z.string().min(2, "Last name should be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  mobile: z
    .string()
    .regex(/^\+?[0-9]{10,14}$/, "Please enter a valid mobile number"),
  subject: z.string().min(1, "Please select a certification"),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface FormFieldProps {
  name: keyof ContactFormValues;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  control: Control<ContactFormValues>;
}

const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
  <FormLabel className="text-grey-35 flex items-center gap-1">
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
            <span className="ml-2 text-sm text-primary-75 font-medium">
              (Optional)
            </span>
          </FormLabel>
        )}
        <FormControl>
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            className="h-12 bg-light-97 border-light-90 focus:border-primary-75 focus:ring-primary-75"
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
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      subject: "",
      message: "",
    },
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
        "/api/aws-enquiry",
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
          : "Failed to submit form - please try again",
      );
      setShowDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-light-90 sticky top-24 w-full max-w-[400px] mx-auto">
      <h3 className="text-xl font-vietnam font-bold text-grey-15 mb-6 text-center">
        Enquire Now
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormInputField
            control={form.control}
            name="firstName"
            label="First Name"
            placeholder="Full Name"
          />

          <FormInputField
            control={form.control}
            name="lastName"
            label="Last Name"
            placeholder="Last Name"
          />

          <FormInputField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Email ID"
            type="email"
          />

          <FormInputField
            control={form.control}
            name="mobile"
            label="Mobile Number"
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
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 bg-light-97 border-light-90">
                      <SelectValue placeholder="Select a certification" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {AWS_CERTIFICATIONS.map((cert) => (
                      <SelectItem
                        key={cert}
                        value={cert}
                        className="text-grey-35"
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
            type="submit"
            className="w-full bg-primary-75 hover:bg-primary-70 text-white h-12 flex items-center justify-center gap-2 text-base"
            disabled={isSubmitting}
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
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              {isSuccess ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  Message Sent Successfully!
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-red-500" />
                  Error Sending Message
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-grey-35 mt-2">
              {isSuccess
                ? "Thank you for reaching out! We'll get back to you soon regarding AWS certifications."
                : errorMessage ||
                  "There was an error sending your message. Please try again."}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6">
            <Button
              className="w-full bg-primary-75 hover:bg-primary-70 text-white h-12"
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
