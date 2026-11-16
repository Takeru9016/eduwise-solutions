"use client";

import { useEffect } from "react";
import { captureUtmFromLocation } from "@/lib/utm";

/**
 * Remembers utm_source / utm_medium / utm_campaign from the landing URL so
 * lead forms submitted later (on any page, within 30 days) can report which
 * ad or campaign the lead came from. Renders nothing.
 */
export default function UtmCapture() {
  useEffect(() => {
    captureUtmFromLocation();
  }, []);

  return null;
}
