"use client";

import { useState } from "react";
import { Control, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, XCircle, Sparkles, Mail, Send } from "lucide-react";

import ContactInfo from "./common/ContactInfo";
import LoadingOverlay from "./common/LoadingOverlay";
import { submitWithRetry } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

// Schema and types
const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name should be at least 2 characters"),
  lastName: z.string().min(2, "Last name should be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  mobile: z
    .string()
    .regex(/^\+?[0-9]{10,14}$/, "Please enter a valid mobile number"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface SubjectOption {
  value: string;
  label: string;
}

interface FormFieldProps {
  name: keyof ContactFormValues;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  control: Control<ContactFormValues>;
}

// Reusable components
const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
  <FormLabel className="text-grey-35 flex items-center gap-1">
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
  <div className="inline-flex items-center gap-2 bg-white text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-6">
    <Icon size={16} className="text-primary-75" />
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

export default function ContactUsSection() {
  const [showDialog, setShowDialog] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const subjects: SubjectOption[] = [
    { value: "devops", label: "DevOps & Cloud Computing" },
    { value: "aiml", label: "Artificial Intelligence & Machine Learning" },
    {
      value: "ds",
      label: "Data Science",
    },
    { value: "cybersec", label: "Cyber Security" },
    {
      value: "professional_certification",
      label: "Professional Certification",
    },
    { value: "fulstack", label: "Full Stack Web Development" },
    { value: "other", label: "Other" },
  ];

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
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-primary-99 to-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-95 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-97 rounded-full opacity-20 blur-3xl" />
        </div>

        <div className="container mx-auto relative">
          <div className="max-w-4xl mx-auto text-center">
            <SectionBadge icon={Sparkles} text="Get in Touch with Us" />

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-vietnam font-bold text-grey-15 mb-6">
              Contact Us
            </h1>

            <p className="text-grey-35 text-lg md:text-xl leading-relaxed">
              We&apos;re here to help and answer any questions you might have.
              Feel free to reach out to us using the form below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-light-90">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-full bg-primary-99 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary-75" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-vietnam font-bold text-grey-15">
                      Send us a Message
                    </h2>
                    <p className="text-grey-35">Fill in the form below</p>
                  </div>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInputField
                        control={form.control}
                        name="firstName"
                        label="First Name"
                        placeholder="Enter First Name"
                      />

                      <FormInputField
                        control={form.control}
                        name="lastName"
                        label="Last Name"
                        placeholder="Enter Last Name"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInputField
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="Enter your Email"
                        type="email"
                      />

                      <FormInputField
                        control={form.control}
                        name="mobile"
                        label="Mobile Number"
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
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 bg-light-97 border-light-90">
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {subjects.map((subject) => (
                                <SelectItem
                                  key={subject.value}
                                  value={subject.label}
                                  className="text-grey-35"
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
                            <span className="ml-2 text-sm text-primary-75 font-medium">
                              (Optional)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Enter your Message here..."
                              className="min-h-[150px] bg-light-97 border-light-90 focus:border-primary-75 focus:ring-primary-75"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full md:w-auto bg-primary-75 hover:bg-primary-70 text-white h-12 px-8 flex items-center gap-2 text-base"
                      disabled={isSubmitting}
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
                ? "Thank you for reaching out! We'll get back to you soon."
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
    </main>
  );
}
