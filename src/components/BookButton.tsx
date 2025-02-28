"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import BookFormDialog from "./BookFormDialog";

export default function BookButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className="bg-black text-white hover:bg-gray-800"
        onClick={() => setOpen(true)}
      >
        Book Private Session
      </Button>
      <BookFormDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
