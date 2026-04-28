"use client";
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/services/auth/auth.api";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerUser, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
    if (state && state.success) {
      toast.success("Registration successful! Please login.");
    }
  }, [state]);

  return (
    <form action={formAction}>
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4">
          {/* Name */}
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Karim Ahmed"
            />
            <InputFieldError field="name" state={state} />
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="karim@example.com"
            />
            <InputFieldError field="email" state={state} />
          </Field>

          {/* Phone */}
          <Field>
            <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="01XXXXXXXXX"
            />
            <InputFieldError field="phone" state={state} />
          </Field>

          {/* password */}
          <Field>
            <FieldLabel htmlFor="pin">PIN</FieldLabel>
            <Input
              id="pin"
              name="password"
              type="password"
              placeholder="5-digit PIN"
              maxLength={5}
            />
            <FieldDescription className="text-xs text-muted-foreground">
              This PIN will be used for login and every transaction.
            </FieldDescription>
            <InputFieldError field="pin" state={state} />
          </Field>
        </div>

        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Creating account..." : "Create Account"}
            </Button>

            <FieldDescription className="text-center mt-2">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
