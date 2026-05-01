"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Phone, BanknoteIcon, Lock, Eye, EyeOff, ArrowUpFromLine, ShieldCheck } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import InputFieldError from "@/components/shared/InputFieldError";


const calcCommission = (amount: number) => {
  if (!amount || amount <= 0) return 0;
  return Math.ceil(amount * 0.0185); // 1.85% commission
};

const AgentCashOutForm = () => {
  const [state, formAction, isPending] = useActionState(()=>{}, null);
  const [showPin, setShowPin] = useState(false);
  const [amount, setAmount] = useState("");

  const numericAmount = parseFloat(amount) || 0;
  const commission = calcCommission(numericAmount);
  const userDeducted = numericAmount + commission;

  useEffect(() => {
    if (!state) return;
    if (!state.success && state.message) toast.error(state.message);
    if (state.success) toast.success(state.message ?? "Cash Out successful!");
  }, [state]);

  return (
    <form action={formAction}>
      <FieldGroup>
        <div className="space-y-4">

          <div className="flex items-start gap-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 px-4 py-3">
            <ShieldCheck className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
            <p className="text-xs text-orange-700 dark:text-orange-300 leading-relaxed">
              User pays you the cash. Their wallet will be debited including the fee. You receive the base amount.
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
                  <span>Cash Out Amount</span>
                  <span className="tabular-nums">৳ {numericAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Fee (1.85%)</span>
                  <span className="tabular-nums text-orange-500">৳ {commission.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>User deducted</span>
                  <span className="text-red-500 tabular-nums">৳ {userDeducted.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>You receive (cash)</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium tabular-nums">৳ {numericAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Your commission</span>
                  <span className="text-purple-600 dark:text-purple-400 font-medium tabular-nums">+৳ {commission.toLocaleString()}</span>
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

          <Button type="submit" disabled={isPending || numericAmount <= 0} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold h-11 rounded-xl gap-2 cursor-pointer">
            <ArrowUpFromLine className="h-4 w-4" />
            {isPending ? "Processing..." : "Confirm Cash Out"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default AgentCashOutForm;