// "use client";

// import { useActionState, useEffect } from "react";
// import { toast } from "sonner";
// import { Settings, BanknoteIcon, Globe } from "lucide-react";
// import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import InputFieldError from "@/components/shared/InputFieldError";

// interface SystemSettings {
//   minSendAmount: number;
//   maxSendAmount: number;
//   minCashOutAmount: number;
//   maxCashOutAmount: number;
//   minCashInAmount: number;
//   maxCashInAmount: number;
//   appName: string;
//   supportEmail: string;
// }

// interface AdminSettingsContentProps {
//   settings?: SystemSettings;
// }

// const AdminSettingsContent = ({ settings }: AdminSettingsContentProps) => {
//   const [state, formAction, isPending] = useActionState(() => {}, null);

//   useEffect(() => {
//     if (!state) return;
//     if (state.success) toast.success(state.message ?? "Settings saved!");
//     else if (state.message) toast.error(state.message);
//   }, [state]);

//   return (
//     <div className="max-w-2xl mx-auto md:mx-0">
//       <form action={formAction}>
//         <FieldGroup>
//           <div className="space-y-4">
//             {/* App info */}
//             <Card>
//               <CardHeader className="pb-3">
//                 <div className="flex items-center gap-2">
//                   <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
//                     <Globe className="h-4 w-4 text-slate-600 dark:text-slate-400" />
//                   </div>
//                   <CardTitle className="text-sm font-semibold">
//                     App Information
//                   </CardTitle>
//                 </div>
//               </CardHeader>
//               <CardContent className="pt-0 grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <Field>
//                   <FieldLabel htmlFor="appName">App Name</FieldLabel>
//                   <Input
//                     id="appName"
//                     name="appName"
//                     placeholder="Takaa"
//                     defaultValue={settings?.appName ?? ""}
//                   />
//                   <InputFieldError field="appName" state={state} />
//                 </Field>
//                 <Field>
//                   <FieldLabel htmlFor="supportEmail">Support Email</FieldLabel>
//                   <Input
//                     id="supportEmail"
//                     name="supportEmail"
//                     type="email"
//                     placeholder="support@example.com"
//                     defaultValue={settings?.supportEmail ?? ""}
//                   />
//                   <InputFieldError field="supportEmail" state={state} />
//                 </Field>
//               </CardContent>
//             </Card>

//             {/* Transaction limits */}
//             {[
//               {
//                 label: "Send Money Limits",
//                 minKey: "minSendAmount",
//                 maxKey: "maxSendAmount",
//                 color: "text-red-500",
//                 bg: "bg-red-50 dark:bg-red-950/30",
//               },
//               {
//                 label: "Cash Out Limits",
//                 minKey: "minCashOutAmount",
//                 maxKey: "maxCashOutAmount",
//                 color: "text-orange-500",
//                 bg: "bg-orange-50 dark:bg-orange-950/30",
//               },
//               {
//                 label: "Cash In Limits",
//                 minKey: "minCashInAmount",
//                 maxKey: "maxCashInAmount",
//                 color: "text-emerald-600 dark:text-emerald-400",
//                 bg: "bg-emerald-50 dark:bg-emerald-950/30",
//               },
//             ].map((group) => (
//               <Card key={group.label}>
//                 <CardHeader className="pb-3">
//                   <div className="flex items-center gap-2">
//                     <div
//                       className={`h-8 w-8 rounded-lg flex items-center justify-center ${group.bg}`}
//                     >
//                       <BanknoteIcon className={`h-4 w-4 ${group.color}`} />
//                     </div>
//                     <CardTitle className="text-sm font-semibold">
//                       {group.label}
//                     </CardTitle>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pt-0 grid grid-cols-2 gap-3">
//                   <Field>
//                     <FieldLabel htmlFor={group.minKey}>
//                       Min Amount (৳)
//                     </FieldLabel>
//                     <Input
//                       id={group.minKey}
//                       name={group.minKey}
//                       type="number"
//                       min={0}
//                       placeholder="0"
//                       defaultValue={
//                         settings?.[group.minKey as keyof SystemSettings] ?? ""
//                       }
//                     />
//                     <InputFieldError field={group.minKey} state={state} />
//                   </Field>
//                   <Field>
//                     <FieldLabel htmlFor={group.maxKey}>
//                       Max Amount (৳)
//                     </FieldLabel>
//                     <Input
//                       id={group.maxKey}
//                       name={group.maxKey}
//                       type="number"
//                       min={0}
//                       placeholder="0"
//                       defaultValue={
//                         settings?.[group.maxKey as keyof SystemSettings] ?? ""
//                       }
//                     />
//                     <InputFieldError field={group.maxKey} state={state} />
//                   </Field>
//                 </CardContent>
//               </Card>
//             ))}

//             <Button
//               type="submit"
//               disabled={isPending}
//               className="w-full bg-slate-800 hover:bg-slate-900 dark:bg-slate-200 dark:hover:bg-white dark:text-slate-900 text-white font-semibold h-11 rounded-xl gap-2 cursor-pointer"
//             >
//               <Settings className="h-4 w-4" />
//               {isPending ? "Saving..." : "Save Settings"}
//             </Button>
//           </div>
//         </FieldGroup>
//       </form>
//     </div>
//   );
// };

// export default AdminSettingsContent;
