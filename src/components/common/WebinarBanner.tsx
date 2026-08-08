"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  Calendar,
  CalendarDays,
  CheckCircle2,
  Clock,
  Sparkles,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactPhoneInput from "react-phone-input-2";
import * as z from "zod";
import "react-phone-input-2/lib/style.css";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Form validation schema
const formSchema = z.object({
  countryCode: z.string().default("+91"),
  dob: z.date({
    error: "Date of birth is required",
  }),
  email: z.string().email("Please enter a valid email"),
  graduationYear: z.string().optional(),
  isGraduate: z.string().min(1, "Please select an option"),
  mobile: z.string().min(10, "Please enter a valid mobile number"),
  name: z.string().min(2, "Name should be at least 2 characters"),
});

type FormValues = z.input<typeof formSchema>;

const webinarFeatures = [
  {
    icon: Users,
    text: "Expert-led Session",
  },
  {
    icon: Clock,
    text: "60 Minutes Duration",
  },
  {
    icon: Sparkles,
    text: "Free Career Guidance",
  },
];

const webinarTiming = {
  day: "Sunday",
  time: "7:30 PM - 8:30 PM",
};

export default function WebinarBanner() {
  const [showDialog, setShowDialog] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [phoneValue, setPhoneValue] = useState("");

  const form = useForm<FormValues>({
    defaultValues: {
      countryCode: "+91",
      email: "",
      graduationYear: "",
      isGraduate: "",
      mobile: "",
      name: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const response = await fetch("/api/contact-form", {
        body: JSON.stringify({
          email: data.email,
          firstName: data.name,
          lastName: "",
          message: `DOB: ${format(data.dob, "yyyy-MM-dd")}, Is Graduate: ${
            data.isGraduate
          }, Graduation Year: ${data.graduationYear || "N/A"}`,
          mobile: data.mobile,
          subject: "Webinar Registration",
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to submit registration");
      }

      setIsSuccess(true);
      form.reset();
      setPhoneValue("");

      // Close the dialog after 2 seconds
      setTimeout(() => {
        setShowDialog(false);
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setIsSuccess(false);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to submit registration - please try again"
      );
      setShowDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Webinar Banner */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-linear-to-r from-primary-95 via-primary-97 to-primary-95 p-8 shadow-xl md:p-12"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: [0, 90, 0],
              scale: [1, 1.2, 1],
            }}
            className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-75 opacity-10"
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
          <motion.div
            animate={{
              rotate: [90, 0, 90],
              scale: [1.2, 1, 1.2],
            }}
            className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary-75 opacity-10"
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="max-w-2xl text-center md:text-left">
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/50 px-4 py-2 font-medium text-primary-75 text-sm backdrop-blur-xs"
                initial={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles size={16} />
                Free Career Guidance Webinar
              </motion.div>

              <motion.h2
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 font-bold text-3xl text-grey-15 leading-tight md:text-4xl lg:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.3 }}
              >
                Discover Your Perfect Career Path
              </motion.h2>

              <motion.p
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 text-grey-35 text-lg"
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
              >
                Join our expert-led session to explore career opportunities and
                get personalized guidance
              </motion.p>

              {/* Webinar Timing */}
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.45 }}
              >
                <div className="inline-flex items-center gap-3 rounded-xl border border-primary-75/20 bg-white/90 px-6 py-3 backdrop-blur-xs">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5 text-primary-75" />
                    <span className="font-medium text-grey-15">
                      {webinarTiming.day}
                    </span>
                  </div>
                  <div className="h-6 w-px bg-primary-75/20" />
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary-75" />
                    <span className="font-medium text-grey-15">
                      {webinarTiming.time}
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap justify-center gap-4 md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.5 }}
              >
                {webinarFeatures.map((feature, index) => (
                  <div
                    className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 backdrop-blur-xs"
                    key={index}
                  >
                    <feature.icon className="h-4 w-4 text-primary-75" />
                    <span className="text-grey-15 text-sm">{feature.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                <Button
                  className="transform rounded-full bg-primary-75 px-8 py-6 text-lg text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-primary-80 hover:shadow-xl"
                  onClick={() => setShowDialog(true)}
                >
                  Register Now
                </Button>
              </motion.div>

              <motion.div
                animate={{
                  opacity: [1, 0.5, 1],
                  scale: [1, 1.05, 1],
                }}
                className="flex items-center gap-2"
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-red-500" />
                <p className="font-bold text-red-500 text-sm">
                  Limited seats available
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Registration Dialog */}
      <Dialog onOpenChange={setShowDialog} open={showDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Webinar Registration</DialogTitle>
            <DialogDescription>
              Fill in your details to register for the webinar. Our expert will
              get back to you with the meeting link.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            variant={"outline"}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-auto p-0">
                        <CalendarComponent
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          mode="single"
                          onSelect={field.onChange}
                          selected={field.value}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        {...field}
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
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <ReactPhoneInput
                        buttonClass="h-10! rounded-l-md!"
                        containerClass="w-full!"
                        country={"in"}
                        dropdownClass="max-h-[200px]! overflow-y-auto!"
                        inputClass="w-full! h-10! rounded-md! pl-[60px]! focus:ring-2! focus:!ring-primary-100"
                        onChange={(phone, data) => {
                          setPhoneValue(phone);
                          if (data && "dialCode" in data) {
                            const countryCode = `+${data.dialCode}`;
                            const phoneWithoutCode = phone.replace(
                              countryCode,
                              ""
                            );
                            form.setValue("countryCode", countryCode);
                            form.setValue("mobile", phoneWithoutCode);
                            field.onChange(phoneWithoutCode);
                          } else {
                            form.setValue("countryCode", "+91");
                            field.onChange(phone);
                          }
                        }}
                        value={phoneValue}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isGraduate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Are you a graduate?</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("isGraduate") === "Yes" && (
                <FormField
                  control={form.control}
                  name="graduationYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Graduation Year</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your graduation year"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {errorMessage && (
                <div className="flex items-center gap-2 text-red-500">
                  <XCircle className="h-4 w-4" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <Button
                className="w-full bg-primary-75 hover:bg-primary-80"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Submitting..." : "Register"}
              </Button>
            </form>
          </Form>

          {isSuccess && (
            <div className="mt-4 flex items-center gap-2 text-green-500">
              <CheckCircle2 className="h-4 w-4" />
              <span>
                Registration successful! We&lsquo;ll contact you soon.
              </span>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
