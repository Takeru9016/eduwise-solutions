"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail, Send, Sparkles, XCircle } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { useSanityCourses } from "@/hooks/useSanityCourses";
import { submitWithRetry } from "@/utils/api";
import ContactInfo from "./common/ContactInfo";
import LoadingOverlay from "./common/LoadingOverlay";

// Schema and types
const contactFormSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  firstName: z.string().min(2, "First name should be at least 2 characters"),
  lastName: z.string().min(2, "Last name should be at least 2 characters"),
  message: z.string().optional(),
  mobile: z
    .string()
    .regex(/^\+?[0-9]{10,14}$/, "Please enter a valid mobile number"),
  subject: z.string().min(1, "Please select a subject"),
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

// Reusable components
const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
  <FormLabel className="flex items-center gap-1 text-grey-35">
    {children}
    <span className="text-red-500">*</span>
  </FormLabel>
);

const SectionBadge = ({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) => (
  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-medium text-primary-75 text-sm">
    <Icon className="text-primary-75" size={16} />
    {text}
  </div>
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

export default function ContactUsSection() {
  const [showDialog, setShowDialog] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { courses: subjects, isLoading: isLoadingSubjects } =
    useSanityCourses();

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

      const response = await submitWithRetry({
        ...data,
        message: data.message || "",
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
    <main className="min-h-screen bg-white">
      {isSubmitting && <LoadingOverlay />}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-primary-99 to-white py-20 md:py-28">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-primary-95 opacity-20 blur-3xl" />
          <div className="absolute right-20 bottom-20 h-96 w-96 rounded-full bg-primary-97 opacity-20 blur-3xl" />
        </div>

        <div className="container relative mx-auto">
          <div className="mx-auto max-w-4xl text-center">
            <SectionBadge icon={Sparkles} text="Get in Touch with Us" />

            <h1 className="mb-6 font-bold font-vietnam text-4xl text-grey-15 md:text-5xl lg:text-6xl">
              Contact Us
            </h1>

            <p className="text-grey-35 text-lg leading-relaxed md:text-xl">
              We&apos;re here to help and answer any questions you might have.
              Feel free to reach out to us using the form below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-light-90 bg-white p-8 shadow-lg">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-99">
                    <Mail className="h-6 w-6 text-primary-75" />
                  </div>
                  <div>
                    <h2 className="font-bold font-vietnam text-2xl text-grey-15">
                      Send us a Message
                    </h2>
                    <p className="text-grey-35">Fill in the form below</p>
                  </div>
                </div>

                <Form {...form}>
                  <form
                    className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <FormInputField
                        control={form.control}
                        label="First Name"
                        name="firstName"
                        placeholder="Enter First Name"
                      />

                      <FormInputField
                        control={form.control}
                        label="Last Name"
                        name="lastName"
                        placeholder="Enter Last Name"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <FormInputField
                        control={form.control}
                        label="Email"
                        name="email"
                        placeholder="Enter your Email"
                        type="email"
                      />

                      <FormInputField
                        control={form.control}
                        label="Mobile Number"
                        name="mobile"
                        placeholder="Enter Phone Number"
                      />
                    </div>

                    {/*Subject Field */}
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <RequiredLabel>Subject</RequiredLabel>
                          <Select
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 border-light-90 bg-light-97">
                                <SelectValue
                                  placeholder={
                                    isLoadingSubjects
                                      ? "Loading courses..."
                                      : "Select a subject"
                                  }
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {subjects.map((subject) => (
                                <SelectItem
                                  className="text-grey-35"
                                  key={subject.value}
                                  value={subject.label}
                                >
                                  {subject.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    {/* Message Field */}
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-grey-35">
                            Message
                            <span className="ml-2 font-medium text-primary-75 text-sm">
                              (Optional)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              className="min-h-[150px] border-light-90 bg-light-97 focus:border-primary-75 focus:ring-primary-75"
                              placeholder="Enter your Message here..."
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <Button
                      className="flex h-12 w-full items-center gap-2 bg-primary-75 px-8 text-base text-white hover:bg-primary-70 md:w-auto"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send size={18} />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

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
                ? "Thank you for reaching out! We'll get back to you soon."
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
    </main>
  );
}
