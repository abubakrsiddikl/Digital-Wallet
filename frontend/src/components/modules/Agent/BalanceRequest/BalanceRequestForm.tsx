"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  BanknoteIcon, FileText, Info, BadgeDollarSign,
} from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import InputFieldError from "@/components/shared/InputFieldError";

import { cn } from "@/lib/utils";
import { requestBalance } from "@/services/agentApplication/agentApplication.api";

const QUICK_AMOUNTS = [1000, 5000, 10000, 25000, 50000];

const BalanceRequestForm = () => {
  const [state, formAction, isPending] = useActionState(requestBalance, null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const numericAmount = parseFloat(amount) || 0;

  useEffect(() => {
    if (!state) return;
    if (!state.success && state.message) toast.error(state.message);
    if (state.success) {
      toast.success("Balance request submitted! Admin will review shortly.");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAmount("");
      setNote("");
    }
  }, [state]);

  return (
    <form action={formAction}>
      <FieldGroup>
        <div className="space-y-4">

          {/* Info */}
          <div className="flex items-start gap-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 px-4 py-3">
            <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
              Submit your balance request. Admin will physically collect cash from you and then
              credit your wallet. Minimum request is ৳100.
            </p>
          </div>

          {/* Quick amounts */}
          <Field>
            <FieldLabel>Request Amount (৳)</FieldLabel>
            <div className="flex gap-2 flex-wrap mb-2">
              {QUICK_AMOUNTS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(String(preset))}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-sm font-medium transition-all",
                    amount === String(preset)
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400"
                      : "border-border hover:bg-muted text-muted-foreground"
                  )}
                >
                  ৳{preset.toLocaleString()}
                </button>
              ))}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                <BanknoteIcon className="h-4 w-4" />
              </span>
              <Input
                name="amount"
                type="number"
                placeholder="Or enter custom amount"
                className="pl-10"
                min={100}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <InputFieldError field="amount" state={state} />
          </Field>

          {/* Note */}
          <Field>
            <FieldLabel htmlFor="note">Note (optional)</FieldLabel>
            <div className="relative">
              <span className="absolute left-3 top-3 text-muted-foreground pointer-events-none">
                <FileText className="h-4 w-4" />
              </span>
              <textarea
                id="note"
                name="note"
                rows={3}
                placeholder="Add a note for the admin..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-lg border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
              />
            </div>
            <InputFieldError field="note" state={state} />
          </Field>

          {/* Summary */}
          {numericAmount >= 100 && (
            <Card className="bg-muted/40 border-dashed">
              <CardContent className="p-4 text-sm">
                <div className="flex justify-between font-semibold">
                  <span>Requesting</span>
                  <span className="text-blue-600 dark:text-blue-400 tabular-nums">
                    ৳ {numericAmount.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">
                  Admin approval required. Pay cash to admin in person first.
                </p>
              </CardContent>
            </Card>
          )}

          <Button
            type="submit"
            disabled={isPending || numericAmount < 100}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 rounded-xl gap-2 cursor-pointer"
          >
            <BadgeDollarSign className="h-4 w-4" />
            {isPending ? "Submitting..." : "Submit Request"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default BalanceRequestForm;