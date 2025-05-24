"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar, CheckCircle2, XCircle, Sparkles, Users, Clock, CalendarDays } from "lucide-react";
import { format } from "date-fns";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { motion } from "framer-motion";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters"),
  dob: z.date({
    required_error: "Date of birth is required",
  }),
  email: z.string().email("Please enter a valid email"),
  mobile: z.string().min(10, "Please enter a valid mobile number"),
  countryCode: z.string().default("+91"),
  isGraduate: z.string().min(1, "Please select an option"),
  graduationYear: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

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
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      countryCode: "+91",
      isGraduate: "",
      graduationYear: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const response = await fetch("/api/contact-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: data.name,
          lastName: "",
          email: data.email,
          mobile: data.mobile,
          subject: "Webinar Registration",
          message: `DOB: ${format(data.dob, "yyyy-MM-dd")}, Is Graduate: ${
            data.isGraduate
          }, Graduation Year: ${data.graduationYear || "N/A"}`,
        }),
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-gradient-to-r from-primary-95 via-primary-97 to-primary-95 rounded-2xl p-8 md:p-12 shadow-xl"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-24 -right-24 w-96 h-96 bg-primary-75 rounded-full opacity-10"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-75 rounded-full opacity-10"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-4"
              >
                <Sparkles size={16} />
                Free Career Guidance Webinar
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-grey-15 mb-4 leading-tight"
              >
                Discover Your Perfect Career Path
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-grey-35 text-lg mb-6"
              >
                Join our expert-led session to explore career opportunities and get personalized guidance
              </motion.p>

              {/* Webinar Timing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mb-6"
              >
                <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl border border-primary-75/20">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-primary-75" />
                    <span className="text-grey-15 font-medium">{webinarTiming.day}</span>
                  </div>
                  <div className="w-px h-6 bg-primary-75/20" />
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary-75" />
                    <span className="text-grey-15 font-medium">{webinarTiming.time}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4 justify-center md:justify-start"
              >
                {webinarFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full"
                  >
                    <feature.icon className="w-4 h-4 text-primary-75" />
                    <span className="text-grey-15 text-sm">{feature.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Button
                  onClick={() => setShowDialog(true)}
                  className="bg-primary-75 hover:bg-primary-80 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Register Now
                </Button>
              </motion.div>

              <motion.div
                animate={{
                  opacity: [1, 0.5, 1],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex items-center gap-2"
              >
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <p className="text-sm font-bold text-red-500">
                  Limited seats available
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Registration Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Webinar Registration</DialogTitle>
            <DialogDescription>
              Fill in your details to register for the webinar. Our expert will
              get back to you with the meeting link.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
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
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
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
                        type="email"
                        placeholder="Enter your email"
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
                        country={"in"}
                        value={phoneValue}
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
                        inputClass="!w-full !h-10 !rounded-md !pl-[60px] focus:!ring-2 focus:!ring-primary-100"
                        containerClass="!w-full"
                        buttonClass="!h-10 !rounded-l-md"
                        dropdownClass="!max-h-[200px] !overflow-y-auto"
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
                      onValueChange={field.onChange}
                      defaultValue={field.value}
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
                          type="number"
                          placeholder="Enter your graduation year"
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
                type="submit"
                className="w-full bg-primary-75 hover:bg-primary-80"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Register"}
              </Button>
            </form>
          </Form>

          {isSuccess && (
            <div className="flex items-center gap-2 text-green-500 mt-4">
              <CheckCircle2 className="h-4 w-4" />
              <span>Registration successful! We'll contact you soon.</span>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
} 