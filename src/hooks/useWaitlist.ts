// Manages waitlist form state and submission logic.

import { useState } from "react";
import { joinWaitlist } from "../services/waitlistService";

export function useWaitlist() {
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function submit() {
    setSubmitting(true);
    setErrorMessage(null);

    const ok = await joinWaitlist({
      email,
      business_type: businessType || undefined,
      business_name: businessName || undefined
    });

    setSubmitting(false);

    if (!ok) {
      setErrorMessage("Something went wrong. Please try again.");
      return;
    }

    setSuccess(true);
  }

  return {
    email,
    setEmail,
    businessType,
    setBusinessType,
    businessName,
    setBusinessName,
    submitting,
    success,
    errorMessage,
    submit
  };
}