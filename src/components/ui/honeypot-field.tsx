import { useId } from "react";
import { HONEYPOT_FIELD_NAME } from "@/lib/security/honeypot";

/**
 * Reusable honeypot input. Positioned off-screen (not display:none, which
 * some bots detect and skip) and excluded from tab order / screen readers
 * so it never affects a legitimate user's experience.
 */
export function HoneypotField() {
  const id = useId();

  return (
    <div
      aria-hidden="true"
      className="absolute top-[-9999px] left-[-9999px] h-0 w-0 overflow-hidden"
    >
      <label htmlFor={id}>Company website</label>
      <input
        autoComplete="off"
        id={id}
        name={HONEYPOT_FIELD_NAME}
        tabIndex={-1}
        type="text"
      />
    </div>
  );
}
