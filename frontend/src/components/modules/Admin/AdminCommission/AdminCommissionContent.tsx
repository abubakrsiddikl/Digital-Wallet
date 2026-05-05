// "use client";

// import { useActionState, useEffect } from "react";
// import { toast } from "sonner";
// import { Percent, Send, ArrowUpFromLine, ArrowDownToLine, Smartphone, PlusCircle } from "lucide-react";
// import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import InputFieldError from "@/components/shared/InputFieldError";


// interface CommissionSettings {
//   sendMoneyAgentCommission: number;
//   sendMoneySystemCommission: number;
//   cashOutAgentCommission: number;
//   cashOutSystemCommission: number;
//   cashInAgentCommission: number;
//   cashInSystemCommission: number;
// }

// interface AdminCommissionContentProps {
//   settings?: CommissionSettings;
// }

// const TX_GROUPS = [
//   {
//     key: "sendMoney",
//     label: "Send Money",
//     icon: Send,
//     color: "text-red-500",
//     bg: "bg-red-50 dark:bg-red-950/30",
//     agentField: "sendMoneyAgentCommission",
//     systemField: "sendMoneySystemCommission",
//   },
//   {
//     key: "cashOut",
//     label: "Cash Out",
//     icon: ArrowUpFromLine,
//     color: "text-orange-500",
//     bg: "bg-orange-50 dark:bg-orange-950/30",
//     agentField: "cashOutAgentCommission",
//     systemField: "cashOutSystemCommission",
//   },
//   {
//     key: "cashIn",
//     label: "Cash In",
//     icon: ArrowDownToLine,
//     color: "text-emerald-600 dark:text-emerald-400",
//     bg: "bg-emerald-50 dark:bg-emerald-950/30",
//     agentField: "cashInAgentCommission",
//     systemField: "cashInSystemCommission",
//   },
// ];

// const AdminCommissionContent = ({ settings }: AdminCommissionContentProps) => {
//   const [state, formAction, isPending] = useActionState(()=>{}, null);

//   useEffect(() => {
//     if (!state) return;
//     if (state.success) toast.success(state.message ?? "Commission rates updated!");
//     else if (state.message) toast.error(state.message);
//   }, [state]);

//   return (
//     <div className="max-w-2xl mx-auto md:mx-0">
//       <form action={formAction}>
//         <FieldGroup>
//           <div className="space-y-4">
//             {TX_GROUPS.map((group) => {
//               const Icon = group.icon;
//               return (
//                 <Card key={group.key}>
//                   <CardHeader className="pb-3">
//                     <div className="flex items-center gap-2">
//                       <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${group.bg}`}>
//                         <Icon className={`h-4 w-4 ${group.color}`} />
//                       </div>
//                       <CardTitle className="text-sm font-semibold">{group.label}</CardTitle>
//                     </div>
//                   </CardHeader>
//                   <CardContent className="pt-0">
//                     <div className="grid grid-cols-2 gap-3">
//                       <Field>
//                         <FieldLabel htmlFor={group.agentField}>
//                           Agent Commission (%)
//                         </FieldLabel>
//                         <div className="relative">
//                           <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
//                             <Percent className="h-3.5 w-3.5" />
//                           </span>
//                           <Input
//                             id={group.agentField}
//                             name={group.agentField}
//                             type="number"
//                             step="0.01"
//                             min="0"
//                             max="100"
//                             placeholder="0.00"
//                             className="pl-9"
//                             defaultValue={settings?.[group.agentField as keyof CommissionSettings] ?? ""}
//                           />
//                         </div>
//                         <InputFieldError field={group.agentField} state={state} />
//                       </Field>
//                       <Field>
//                         <FieldLabel htmlFor={group.systemField}>
//                           System Commission (%)
//                         </FieldLabel>
//                         <div className="relative">
//                           <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
//                             <Percent className="h-3.5 w-3.5" />
//                           </span>
//                           <Input
//                             id={group.systemField}
//                             name={group.systemField}
//                             type="number"
//                             step="0.01"
//                             min="0"
//                             max="100"
//                             placeholder="0.00"
//                             className="pl-9"
//                             defaultValue={settings?.[group.systemField as keyof CommissionSettings] ?? ""}
//                           />
//                         </div>
//                         <InputFieldError field={group.systemField} state={state} />
//                       </Field>
//                     </div>
//                   </CardContent>
//                 </Card>
//               );
//             })}

//             <Button type="submit" disabled={isPending} className="w-full bg-slate-800 hover:bg-slate-900 dark:bg-slate-200 dark:hover:bg-white dark:text-slate-900 text-white font-semibold h-11 rounded-xl gap-2 cursor-pointer">
//               <Percent className="h-4 w-4" />
//               {isPending ? "Saving..." : "Save Commission Rates"}
//             </Button>
//           </div>
//         </FieldGroup>
//       </form>
//     </div>
//   );
// };

// export default AdminCommissionContent;