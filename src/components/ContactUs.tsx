"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail, MessageCircle, Send, XCircle } from "lucide-react";
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
            className="h-12 border-2 border-grey-15/20 bg-light-97 focus:border-primary-75"
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

      <section className="bg-light-97 py-16 sm:py-20 lg:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-bold text-grey-15 text-sm sm:mb-8">
              <MessageCircle className="h-4 w-4" />
              Get in Touch with Us
            </div>

            <h1 className="mb-4 font-black font-vietnam text-3xl text-grey-15 tracking-tight sm:mb-6 sm:text-4xl md:text-5xl">
              Contact Us
            </h1>

            <p className="mx-auto max-w-2xl px-2 text-grey-40 text-lg leading-relaxed">
              We&apos;re here to help and answer any questions you might have.
              Feel free to reach out to us using the form below.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
            <div className="rounded-3xl border-2 border-grey-15 bg-white p-6 shadow-[6px_6px_0_0_var(--color-grey-15)] sm:p-8">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-90">
                  <Mail className="h-6 w-6 text-grey-15" />
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
                            <SelectTrigger className="h-12 border-2 border-grey-15/20 bg-light-97">
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
                            className="min-h-[150px] border-2 border-grey-15/20 bg-light-97 focus:border-primary-75"
                            placeholder="Enter your Message here..."
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <Button
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-grey-15 bg-primary-75 px-8 font-bold text-grey-15 hover:bg-primary-90 md:w-auto"
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

            <div className="lg:sticky lg:top-24 lg:self-start">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

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
              className="h-12 w-full rounded-full border-2 border-grey-15 bg-primary-75 text-grey-15 hover:bg-primary-90"
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
