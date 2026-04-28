"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import InputFieldError from "@/components/shared/InputFieldError";
import { verifyOtp } from "@/services/auth/auth.api";

const OtpVerifyForm = ({ email }: { email: string }) => {
  const [state, formAction, isPending] = useActionState(verifyOtp, null);
  // 4 টা আলাদা input — UX ভালো হয়
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // শুধু digit নেব
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // একটাই digit
    setOtp(newOtp);

    // পরের box এ auto focus
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Backspace দিলে আগের box এ যাবে
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 4).split("");
    const newOtp = [...otp];
    pasted.forEach((char, i) => {
      if (/^\d$/.test(char)) newOtp[i] = char;
    });
    setOtp(newOtp);
    // শেষ filled box এ focus
    const lastFilled = newOtp.findLastIndex((v) => v !== "");
    inputRefs.current[Math.min(lastFilled + 1, 3)]?.focus();
  };

  return (
    <form action={formAction}>
      {/* email hidden field — backend এ দরকার হবে */}
      <input type="hidden" name="email" value={email} />
      {/* combined otp value */}
      <input type="hidden" name="otp" value={otp.join("")} />

      <FieldGroup>
        <Field>
          <FieldLabel>Enter OTP</FieldLabel>
          <FieldDescription className="text-sm text-muted-foreground mb-4">
            We sent a 4-digit code to{" "}
            <span className="font-medium text-foreground">{email}</span>
          </FieldDescription>

          {/* 4 digit OTP boxes */}
          <div className="flex gap-3 justify-center my-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-14 h-14 text-center text-2xl font-bold border-2 rounded-xl
                  border-border bg-background text-foreground
                  focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20
                  transition-all duration-150
                  dark:border-zinc-700 dark:focus:border-emerald-500"
              />
            ))}
          </div>

          <InputFieldError field="otp" state={state} />
        </Field>

        <Field>
          <Button
            type="submit"
            disabled={isPending || otp.join("").length < 4}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {isPending ? "Verifying..." : "Verify OTP"}
          </Button>

          <FieldDescription className="text-center mt-3 text-sm">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              className="text-emerald-600 hover:underline font-medium"
              onClick={() => toast.info("OTP resent!")}
            >
              Resend OTP
            </button>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default OtpVerifyForm;
