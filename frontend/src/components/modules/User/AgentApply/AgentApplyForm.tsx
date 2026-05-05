"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import {
  CreditCard, Building2, MapPin, FileText,
  UserCheck, Info,
} from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import InputFieldError from "@/components/shared/InputFieldError";
import { applyAsAgent } from "@/services/agentApplication/agentApplication.api";


const AgentApplyForm = () => {
  const [state, formAction, isPending] = useActionState(applyAsAgent, null);

  useEffect(() => {
    if (!state) return;
    if (!state.success && state.message) toast.error(state.message);
    if (state.success) toast.success("Application submitted! Admin will review shortly.");
  }, [state]);

  // Already submitted successfully
  if (state?.success) {
    return (
      <Card className="border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30">
        <CardContent className="p-6 text-center space-y-3">
          <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mx-auto">
            <UserCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            Application Submitted!
          </p>
          <p className="text-xs text-emerald-600 dark:text-emerald-500">
            Your application is under review. You will be notified once approved.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <form action={formAction}>
      <FieldGroup>
        <div className="space-y-4">

          {/* Info banner */}
          <div className="flex items-start gap-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 px-4 py-3">
            <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
              Fill in your details accurately. Admin will verify your information before approval. 
              Once approved, your account will be upgraded to Agent.
            </p>
          </div>

          {/* NID */}
          <Field>
            <FieldLabel htmlFor="nidNumber">
              NID Number <span className="text-red-500">*</span>
            </FieldLabel>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                <CreditCard className="h-4 w-4" />
              </span>
              <Input
                id="nidNumber"
                name="nidNumber"
                type="text"
                placeholder="Your 10-17 digit NID"
                className="pl-10"
                maxLength={17}
              />
            </div>
            <InputFieldError field="nidNumber" state={state} />
          </Field>

          {/* Business name */}
          <Field>
            <FieldLabel htmlFor="businessName">Business Name (optional)</FieldLabel>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                <Building2 className="h-4 w-4" />
              </span>
              <Input
                id="businessName"
                name="businessName"
                type="text"
                placeholder="Your shop or business name"
                className="pl-10"
              />
            </div>
            <InputFieldError field="businessName" state={state} />
          </Field>

          {/* Address */}
          <Field>
            <FieldLabel htmlFor="address">Business Address (optional)</FieldLabel>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                <MapPin className="h-4 w-4" />
              </span>
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="Full address of your business"
                className="pl-10"
              />
            </div>
            <InputFieldError field="address" state={state} />
          </Field>

          {/* Note */}
          <Field>
            <FieldLabel htmlFor="note">Additional Note (optional)</FieldLabel>
            <div className="relative">
              <span className="absolute left-3 top-3 text-muted-foreground pointer-events-none">
                <FileText className="h-4 w-4" />
              </span>
              <textarea
                id="note"
                name="note"
                rows={3}
                placeholder="Any additional information for admin..."
                className="w-full pl-10 pr-3 py-2 rounded-lg border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
              />
            </div>
            <InputFieldError field="note" state={state} />
          </Field>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-11 rounded-xl gap-2 cursor-pointer"
          >
            <UserCheck className="h-4 w-4" />
            {isPending ? "Submitting..." : "Submit Application"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default AgentApplyForm;
