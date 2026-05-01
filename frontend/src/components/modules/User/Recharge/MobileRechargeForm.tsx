"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Phone, BanknoteIcon, Smartphone } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import InputFieldError from "@/components/shared/InputFieldError";

import { cn } from "@/lib/utils";

// ─── Operator config ──────────────────────────────────────────
const OPERATORS = [
  { id: "grameenphone", label: "Grameenphone", short: "GP", color: "bg-blue-500", prefixes: ["017", "013"] },
  { id: "robi", label: "Robi", short: "RB", color: "bg-red-500", prefixes: ["018"] },
  { id: "banglalink", label: "Banglalink", short: "BL", color: "bg-orange-500", prefixes: ["019", "014"] },
  { id: "teletalk", label: "Teletalk", short: "TT", color: "bg-green-600", prefixes: ["015"] },
  { id: "airtel", label: "Airtel", short: "AT", color: "bg-rose-500", prefixes: ["016"] },
];

// ─── Quick amount presets ─────────────────────────────────────
const QUICK_AMOUNTS = [20, 50, 100, 200];

// ─── Recharge type ────────────────────────────────────────────
const RECHARGE_TYPES = [
  { id: "prepaid", label: "Prepaid" },
  { id: "postpaid", label: "Postpaid" },
];

const MobileRechargeForm = () => {
  const [state, formAction, isPending] = useActionState(()=>{}, null);
  const [selectedOperator, setSelectedOperator] = useState("");
  const [rechargeType, setRechargeType] = useState("prepaid");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");

  // Auto-detect operator from phone prefix
  useEffect(() => {
    if (phone.length >= 3) {
      const prefix = phone.slice(0, 3);
      const matched = OPERATORS.find((op) => op.prefixes.includes(prefix));
      if (matched) setSelectedOperator(matched.id);
    }
  }, [phone]);

  useEffect(() => {
    if (!state) return;
    if (!state.success && state.message) toast.error(state.message);
    if (state.success) toast.success(state.message ?? "Recharge successful!");
  }, [state]);

  return (
    <form action={formAction}>
      {/* hidden fields */}
      <input type="hidden" name="operator" value={selectedOperator} />
      <input type="hidden" name="rechargeType" value={rechargeType} />

      <FieldGroup>
        <div className="space-y-5">

          {/* Recharge type toggle */}
          <div className="flex rounded-xl border overflow-hidden">
            {RECHARGE_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setRechargeType(type.id)}
                className={cn(
                  "flex-1 py-2 text-sm font-medium transition-all",
                  rechargeType === type.id
                    ? "bg-emerald-600 text-white"
                    : "bg-card text-muted-foreground hover:bg-muted"
                )}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Operator selector */}
          <Field>
            <FieldLabel>Select Operator</FieldLabel>
            <div className="grid grid-cols-5 gap-2">
              {OPERATORS.map((op) => (
                <button
                  key={op.id}
                  type="button"
                  onClick={() => setSelectedOperator(op.id)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-xl border p-2.5 transition-all",
                    selectedOperator === op.id
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 ring-1 ring-emerald-500"
                      : "border-border hover:bg-muted"
                  )}
                >
                  <span className={cn("h-8 w-8 rounded-lg flex items-center justify-center text-white text-xs font-bold", op.color)}>
                    {op.short}
                  </span>
                  <span className="text-[10px] font-medium text-center leading-tight text-foreground truncate w-full text-center">
                    {op.label}
                  </span>
                </button>
              ))}
            </div>
            <InputFieldError field="operator" state={state} />
          </Field>

          {/* Phone number */}
          <Field>
            <FieldLabel htmlFor="phone">Mobile Number</FieldLabel>
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <InputFieldError field="phone" state={state} />
          </Field>

          {/* Quick amount presets */}
          <Field>
            <FieldLabel htmlFor="amount">Amount (৳)</FieldLabel>
            <div className="flex gap-2 mb-2 flex-wrap">
              {QUICK_AMOUNTS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(String(preset))}
                  className={cn(
                    "rounded-lg border px-3 py-1 text-sm font-medium transition-all",
                    amount === String(preset)
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400"
                      : "border-border hover:bg-muted text-muted-foreground"
                  )}
                >
                  ৳{preset}
                </button>
              ))}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                <BanknoteIcon className="h-4 w-4" />
              </span>
              <Input
                id="amount"
                name="amount"
                type="number"
                placeholder="Or enter custom amount"
                className="pl-10"
                min={10}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <InputFieldError field="amount" state={state} />
          </Field>

          {/* Summary card */}
          {selectedOperator && phone.length === 11 && parseFloat(amount) > 0 && (
            <Card className="bg-muted/40 border-dashed">
              <CardContent className="p-4 text-sm space-y-1.5">
                <div className="flex justify-between text-muted-foreground">
                  <span>Operator</span>
                  <span className="font-medium text-foreground capitalize">{selectedOperator}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Number</span>
                  <span className="font-medium text-foreground tabular-nums">{phone}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Type</span>
                  <span className="font-medium text-foreground capitalize">{rechargeType}</span>
                </div>
                <div className="flex justify-between font-semibold text-foreground pt-1 border-t">
                  <span>Recharge Amount</span>
                  <span className="text-emerald-600 dark:text-emerald-400 tabular-nums">৳ {parseFloat(amount).toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={isPending || !selectedOperator || !amount || !phone}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-11 rounded-xl gap-2 cursor-pointer"
          >
            <Smartphone className="h-4 w-4" />
            {isPending ? "Processing..." : "Recharge Now"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default MobileRechargeForm;