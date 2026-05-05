// "use client";

// import { useActionState, useEffect } from "react";
// import { toast } from "sonner";
// import { CheckCircle, XCircle, Clock, BadgeDollarSign, FileText } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { IUser } from "@/types/auth.type";

// import { cn } from "@/lib/utils";

// interface IBalanceRequest {
//   id: string;
//   agent: Partial<IUser>;
//   amount: number;
//   note?: string;
//   status: "PENDING" | "APPROVED" | "REJECTED";
//   createdAt: string;
// }

// interface AdminAgentRequestsContentProps {
//   requests: IBalanceRequest[];
// }

// const STATUS_CONFIG = {
//   PENDING:  { label: "Pending",  class: "bg-yellow-100 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-400" },
//   APPROVED: { label: "Approved", class: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400" },
//   REJECTED: { label: "Rejected", class: "bg-red-100 dark:bg-red-950/40 text-red-600" },
// };

// // ─── Action buttons ───────────────────────────────────────────
// const RequestActions = ({ request }: { request: IBalanceRequest }) => {
//   const [state, formAction, isPending] = useActionState(()=>{}, null);

//   useEffect(() => {
//     if (!state) return;
//     if (state.success) toast.success(state.message ?? "Done!");
//     else if (state.message) toast.error(state.message);
//   }, [state]);

//   if (request.status !== "PENDING") return null;

//   return (
//     <form action={formAction} className="flex gap-2 mt-2">
//       <input type="hidden" name="requestId" value={request.id} />
//       <button name="action" value="APPROVE" type="submit" disabled={isPending}
//         className="flex items-center gap-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 text-xs font-medium hover:bg-emerald-100 transition-all disabled:opacity-50"
//       >
//         <CheckCircle className="h-3.5 w-3.5" />
//         {isPending ? "Processing..." : "Approve"}
//       </button>
//       <button name="action" value="REJECT" type="submit" disabled={isPending}
//         className="flex items-center gap-1.5 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 border border-red-200 dark:border-red-800 px-3 py-1.5 text-xs font-medium hover:bg-red-100 transition-all disabled:opacity-50"
//       >
//         <XCircle className="h-3.5 w-3.5" />
//         Reject
//       </button>
//     </form>
//   );
// };

// // ─── Request row ──────────────────────────────────────────────
// const RequestRow = ({ request }: { request: IBalanceRequest }) => {
//   const statusConfig = STATUS_CONFIG[request.status];
//   return (
//     <div className="py-4">
//       <div className="flex items-start gap-3">
//         <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center shrink-0 text-sm font-bold text-blue-600 dark:text-blue-400">
//           {request.agent?.name?.charAt(0)?.toUpperCase() ?? "A"}
//         </div>
//         <div className="flex-1 overflow-hidden">
//           <div className="flex items-center justify-between gap-2 flex-wrap">
//             <div className="flex items-center gap-2">
//               <p className="text-sm font-medium">{request.agent?.name ?? "—"}</p>
//               <Badge className={cn("text-[10px] px-1.5 py-0 border-0", statusConfig.class)}>
//                 {statusConfig.label}
//               </Badge>
//             </div>
//             <p className="text-xs text-muted-foreground">
//               {new Date(request.createdAt).toLocaleDateString("en-BD", { day: "2-digit", month: "short", year: "numeric" })}
//             </p>
//           </div>
//           <p className="text-xs text-muted-foreground mt-0.5">{request.agent?.email} · {request.agent?.phone}</p>

//           {/* Amount */}
//           <div className="flex items-center gap-1.5 mt-2">
//             <BadgeDollarSign className="h-4 w-4 text-blue-500 shrink-0" />
//             <span className="text-base font-bold text-blue-600 dark:text-blue-400 tabular-nums">
//               ৳ {Number(request.amount).toLocaleString()}
//             </span>
//           </div>

//           {/* Note */}
//           {request.note && (
//             <div className="flex items-start gap-1.5 mt-1.5">
//               <FileText className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
//               <p className="text-xs text-muted-foreground italic">{request.note}</p>
//             </div>
//           )}

//           <RequestActions request={request} />
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── Main ─────────────────────────────────────────────────────
// const AdminAgentRequestsContent = ({ requests }: AdminAgentRequestsContentProps) => {
//   const pending = requests.filter((r) => r.status === "PENDING");
//   const others  = requests.filter((r) => r.status !== "PENDING");

//   return (
//     <div className="space-y-4">
//       {/* Pending */}
//       <Card>
//         <CardContent className="p-4">
//           <div className="flex items-center gap-2 mb-3">
//             <Clock className="h-4 w-4 text-yellow-500" />
//             <p className="text-sm font-semibold">Pending ({pending.length})</p>
//           </div>
//           {pending.length === 0 ? (
//             <p className="text-sm text-muted-foreground text-center py-6">No pending requests</p>
//           ) : (
//             pending.map((req, idx) => (
//               <div key={req.id}>
//                 <RequestRow request={req} />
//                 {idx < pending.length - 1 && <Separator />}
//               </div>
//             ))
//           )}
//         </CardContent>
//       </Card>

//       {/* History */}
//       {others.length > 0 && (
//         <Card>
//           <CardContent className="p-4">
//             <p className="text-sm font-semibold mb-3">History ({others.length})</p>
//             {others.map((req, idx) => (
//               <div key={req.id}>
//                 <RequestRow request={req} />
//                 {idx < others.length - 1 && <Separator />}
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default AdminAgentRequestsContent;