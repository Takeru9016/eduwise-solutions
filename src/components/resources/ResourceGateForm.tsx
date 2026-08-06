"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  DownloadCloud,
  Loader2,
  Mail,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";

const gateSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  name: z.string().min(2, "Enter at least 2 characters"),
});

type GateFormValues = z.infer<typeof gateSchema>;

interface ResourceGateFormProps {
  resourceSlug: string;
  resourceTitle: string;
}

export default function ResourceGateForm({
  resourceSlug,
  resourceTitle,
}: ResourceGateFormProps) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GateFormValues>({
    defaultValues: { email: "", name: "" },
    resolver: zodResolver(gateSchema),
  });

  const onSubmit = async (data: GateFormValues) => {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/lead-magnet", {
        body: JSON.stringify({
          email: data.email,
          name: data.name,
          slug: resourceSlug,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Submission failed");
      }

      setDownloadUrl(json.downloadUrl);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-grey-90/30 bg-white p-8 text-center shadow-2xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 className="h-9 w-9 text-green-500" />
        </div>
        <h3 className="font-bold font-vietnam text-2xl text-grey-15">
          You're all set! 🎉
        </h3>
        <p className="max-w-xs text-grey-40 leading-relaxed">
          We've emailed your guide to you. You can also download it directly
          below.
        </p>
        <Button asChild size="lg">
          <a
            download
            href={downloadUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <DownloadCloud className="mr-2 h-4 w-4" />
            Download Now
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-grey-90/30 bg-white shadow-2xl">
      <div className="bg-linear-to-r from-primary-75 to-primary-90 px-6 py-4">
        <p className="mb-0.5 font-semibold text-white/80 text-xs uppercase tracking-widest">
          Free Download
        </p>
        <h3 className="font-bold font-vietnam text-white text-xl leading-snug">
          Get "{resourceTitle}"
        </h3>
      </div>

      <form
        className="space-y-4 px-6 py-5"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="relative">
            <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-grey-50" />
            <input
              {...register("name")}
              className={`h-12 w-full rounded-xl border bg-light-97 pr-4 pl-10 text-grey-15 text-sm transition-all placeholder:text-grey-50 focus:outline-hidden focus:ring-2 ${
                errors.name
                  ? "border-red-400 focus:ring-red-200"
                  : "border-grey-80 focus:border-primary-75 focus:ring-primary-90/30"
              }`}
              placeholder="Enter your full name"
              type="text"
            />
          </div>
          {errors.name && (
            <p className="mt-1 flex items-center gap-1 text-red-500 text-xs">
              <XCircle className="h-3 w-3" />
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <div className="relative">
            <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-grey-50" />
            <input
              {...register("email")}
              className={`h-12 w-full rounded-xl border bg-light-97 pr-4 pl-10 text-grey-15 text-sm transition-all placeholder:text-grey-50 focus:outline-hidden focus:ring-2 ${
                errors.email
                  ? "border-red-400 focus:ring-red-200"
                  : "border-grey-80 focus:border-primary-75 focus:ring-primary-90/30"
              }`}
              placeholder="Enter your email"
              type="email"
            />
          </div>
          {errors.email && (
            <p className="mt-1 flex items-center gap-1 text-red-500 text-xs">
              <XCircle className="h-3 w-3" />
              {errors.email.message}
            </p>
          )}
        </div>

        {status === "error" && (
          <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-600 text-sm">
            <XCircle className="h-4 w-4 shrink-0" />
            {errorMsg}
          </div>
        )}

        <Button
          className="w-full"
          disabled={status === "loading"}
          size="lg"
          type="submit"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <DownloadCloud className="mr-2 h-4 w-4" />
              Send Me the Guide
            </>
          )}
        </Button>

        <p className="text-center text-[10px] text-grey-50">
          🔒 Your information is 100% secure and will never be shared.
        </p>
      </form>
    </div>
  );
}
