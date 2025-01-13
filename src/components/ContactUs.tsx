"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, XCircle } from "lucide-react";

import SocialProfile from "./SocialProfile";
import ContactInfo from "./ContactInfo";
import LoadingOverlay from "./LoadingOverlay";
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

const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name should be at least 2 characters"),
  lastName: z.string().min(2, "Last name should be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  mobile: z
    .string()
    .regex(/^\+?[0-9]{10,14}$/, "Please enter a valid mobile number"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().optional(), // Made message field optional
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const subjects = [
  { value: "mba", label: "Master in Business Admistration (MBA)" },
  {
    value: "msc_in_ds",
    label: "MSc in Artifical Intelligence and Data Science",
  },
  { value: "msc_in_cc", label: "MSc in Cloud Computing" },
  { value: "professional_certification", label: "Professional Certification" },
  { value: "certification_programme", label: "Certification Programme" },
  { value: "other", label: "Other" },
];

// New Required Label Component
const RequiredLabel: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <FormLabel className="text-grey-35 flex items-center gap-1">
    {children}
    <span className="text-red-500">*</span>
  </FormLabel>
);

export default function ContactUs() {
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

      {/* Header Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6">
              Contact Us
            </h1>
            <p className="text-grey-35 text-base md:text-lg">
              <b className="text-primary-70 font-bold text-xl">
                Welcome to Eduwise Solutions Contact page.{" "}
              </b>
              <br />
              We&apos;re here to help and answer any questions you might have.
              Feel free to reach out to us using the form below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="pb-12 md:pb-16 lg:pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-light-97 p-6 md:p-8 rounded-lg">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <RequiredLabel>First Name</RequiredLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter First Name"
                                className="bg-white border-light-90"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <RequiredLabel>Last Name</RequiredLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter Last Name"
                                className="bg-white border-light-90"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <RequiredLabel>Email</RequiredLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="Enter your Email"
                                className="bg-white border-light-90"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                          <FormItem>
                            <RequiredLabel>Mobile Number</RequiredLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter Phone Number"
                                className="bg-white border-light-90"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <RequiredLabel>Subject</RequiredLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-white border-light-90">
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {subjects.map((subject) => (
                                <SelectItem
                                  key={subject.value}
                                  value={subject.value}
                                  className="text-grey-35"
                                >
                                  {subject.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-grey-35">
                            Message
                            <span className="text-primary-50 uppercase">
                              {" "}
                              (Optional)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Enter your Message here..."
                              className="bg-white border-light-90 min-h-[150px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full md:w-auto bg-primary-75 hover:bg-primary-70 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Your Message"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <ContactInfo />
              <SocialProfile />
            </div>
          </div>
        </div>
      </section>

      {/* Success/Error Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {isSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Success!
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-500" />
                  Error
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {isSuccess
                ? "Your message has been sent successfully. We'll get back to you soon!"
                : errorMessage ||
                  "There was an error sending your message. Please try again."}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Button
              className="w-full bg-primary-75 hover:bg-primary-70 text-white"
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
