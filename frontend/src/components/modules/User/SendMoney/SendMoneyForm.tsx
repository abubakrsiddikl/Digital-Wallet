"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Phone, BanknoteIcon, Lock, Eye, EyeOff, Send } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import InputFieldError from "@/components/shared/InputFieldError";

// ─── Fee calculator (backend এ verify করবে) ──────────────────
const calcFee = (amount: number) => {
  if (!amount || amount <= 0) return 0;
  return Math.ceil(amount * 0.015); // 1.5% fee example
};

const SendMoneyForm = () => {
  const [state, formAction, isPending] = useActionState(() => {}, null);
  const [showPin, setShowPin] = useState(false);
  const [amount, setAmount] = useState("");

  const numericAmount = parseFloat(amount) || 0;
  const fee = calcFee(numericAmount);
  const total = numericAmount + fee;

  useEffect(() => {
    if (!state) return;
    if (!state.success && state.message) {
      toast.error(state.message);
    }
    if (state.success) {
      toast.success(state.message ?? "Money sent successfully!");
    }
  }, [state]);

  return (
    <form action={formAction}>
      <FieldGroup>
        <div className="space-y-4">
          {/* Recipient Phone */}
          <Field>
            <FieldLabel htmlFor="phone">Recipient Phone Number</FieldLabel>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                <Phone className="h-4 w-4" />
              </span>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="01XXXXXXXXX"
                className="pl-10"
                maxLength={11}
              />
            </div>
            <InputFieldError field="phone" state={state} />
          </Field>

          {/* Amount */}
          <Field>
            <FieldLabel htmlFor="amount">Amount (৳)</FieldLabel>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                <BanknoteIcon className="h-4 w-4" />
              </span>
              <Input
                id="amount"
                name="amount"
                type="number"
                placeholder="0"
                className="pl-10"
                min={1}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <InputFieldError field="amount" state={state} />
          </Field>

          {/* Fee breakdown — show only when amount > 0 */}
          {numericAmount > 0 && (
            <Card className="bg-muted/40 border-dashed">
              <CardContent className="p-4 space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Amount</span>
                  <span className="tabular-nums">
                    ৳ {numericAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Fee (1.5%)</span>
                  <span className="tabular-nums">৳ {fee.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-foreground">
                  <span>Total Deduct</span>
                  <span className="tabular-nums text-emerald-600 dark:text-emerald-400">
                    ৳ {total.toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* PIN */}
          <Field>
            <FieldLabel htmlFor="pin">Your PIN</FieldLabel>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                <Lock className="h-4 w-4" />
              </span>
              <Input
                id="pin"
                name="pin"
                type={showPin ? "text" : "password"}
                placeholder="5-digit PIN"
                className="pl-10 pr-10"
                maxLength={5}
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPin ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <InputFieldError field="pin" state={state} />
          </Field>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isPending || numericAmount <= 0}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-11 rounded-xl gap-2 cursor-pointer"
          >
            <Send className="h-4 w-4" />
            {isPending ? "Sending..." : "Send Money"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default SendMoneyForm;
