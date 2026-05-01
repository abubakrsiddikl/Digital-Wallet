"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Phone, BanknoteIcon, Lock, Eye, EyeOff, ArrowDownToLine, ShieldCheck } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import InputFieldError from "@/components/shared/InputFieldError";


const calcCommission = (amount: number) => {
  if (!amount || amount <= 0) return 0;
  return Math.floor(amount * 0.01); // 1% commission for cash in
};

const AgentCashInForm = () => {
  const [state, formAction, isPending] = useActionState(()=>{}, null);
  const [showPin, setShowPin] = useState(false);
  const [amount, setAmount] = useState("");

  const numericAmount = parseFloat(amount) || 0;
  const commission = calcCommission(numericAmount);

  useEffect(() => {
    if (!state) return;
    if (!state.success && state.message) toast.error(state.message);
    if (state.success) toast.success(state.message ?? "Cash In successful!");
  }, [state]);

  return (
    <form action={formAction}>
      <FieldGroup>
        <div className="space-y-4">

          {/* Info banner */}
          <div className="flex items-start gap-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 px-4 py-3">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
            <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
              Enter the user&apos;s phone number. You hand over the cash — their wallet balance will increase.
            </p>
          </div>

          {/* User Phone */}
          <Field>
            <FieldLabel htmlFor="userPhone">User Phone Number</FieldLabel>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                <Phone className="h-4 w-4" />
              </span>
              <Input id="userPhone" name="userPhone" type="tel" placeholder="User's 01XXXXXXXXX" className="pl-10" maxLength={11} />
            </div>
            <InputFieldError field="userPhone" state={state} />
          </Field>

          {/* Amount */}
          <Field>
            <FieldLabel htmlFor="amount">Amount (৳)</FieldLabel>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                <BanknoteIcon className="h-4 w-4" />
              </span>
              <Input id="amount" name="amount" type="number" placeholder="0" className="pl-10" min={1} value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <InputFieldError field="amount" state={state} />
          </Field>

          {/* Summary */}
          {numericAmount > 0 && (
            <Card className="bg-muted/40 border-dashed">
              <CardContent className="p-4 space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Cash In Amount</span>
                  <span className="tabular-nums">৳ {numericAmount.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-foreground">
                  <span>User receives</span>
                  <span className="text-emerald-600 dark:text-emerald-400 tabular-nums">৳ {numericAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Your commission</span>
                  <span className="text-purple-600 dark:text-purple-400 tabular-nums font-medium">+৳ {commission.toLocaleString()}</span>
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
              <Input id="pin" name="pin" type={showPin ? "text" : "password"} placeholder="5-digit PIN" className="pl-10 pr-10" maxLength={5} />
              <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <InputFieldError field="pin" state={state} />
          </Field>

          <Button type="submit" disabled={isPending || numericAmount <= 0} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-11 rounded-xl gap-2 cursor-pointer">
            <ArrowDownToLine className="h-4 w-4" />
            {isPending ? "Processing..." : "Confirm Cash In"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default AgentCashInForm;