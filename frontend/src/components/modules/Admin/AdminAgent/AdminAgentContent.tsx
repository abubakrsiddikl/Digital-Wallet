// "use client";

// import { useActionState, useEffect, useState } from "react";
// import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import { Search, ShieldBan, ShieldCheck, UserCheck, UserX, X } from "lucide-react";
// import { toast } from "sonner";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { IUser } from "@/types/auth.type";

// import { cn } from "@/lib/utils";

// interface AdminAgentsContentProps {
//   agents: IUser[];
//   meta?: { total: number };
// }

// const STATUS_FILTERS = ["All", "ACTIVE", "BLOCKED"];

// // ─── Agent action buttons ─────────────────────────────────────
// const AgentActionButtons = ({ agent }: { agent: IUser }) => {
//   const [state, formAction, isPending] = useActionState(()=>{}, null);

//   useEffect(() => {
//     if (!state) return;
//     if (state.success) toast.success(state.message ?? "Updated!");
//     else if (state.message) toast.error(state.message);
//   }, [state]);

//   const isBlocked = agent.status === "BLOCKED";
//   const isApproved = agent.isApproved;

//   return (
//     <form action={formAction} className="flex items-center gap-1.5">
//       <input type="hidden" name="agentId" value={agent.id} />

//       {/* Approve/Reject */}
//       {!isApproved ? (
//         <>
//           <button name="action" value="APPROVE" type="submit" disabled={isPending}
//             className="flex items-center gap-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 text-xs font-medium hover:bg-emerald-100 transition-all disabled:opacity-50"
//           >
//             <UserCheck className="h-3.5 w-3.5" /> Approve
//           </button>
//           <button name="action" value="REJECT" type="submit" disabled={isPending}
//             className="flex items-center gap-1 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 border border-red-200 dark:border-red-800 px-2.5 py-1 text-xs font-medium hover:bg-red-100 transition-all disabled:opacity-50"
//           >
//             <UserX className="h-3.5 w-3.5" /> Reject
//           </button>
//         </>
//       ) : (
//         <button name="action" value={isBlocked ? "UNBLOCK" : "BLOCK"} type="submit" disabled={isPending}
//           className={cn(
//             "flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-medium transition-all disabled:opacity-50",
//             isBlocked
//               ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100"
//               : "bg-red-50 dark:bg-red-950/30 text-red-600 border-red-200 dark:border-red-800 hover:bg-red-100"
//           )}
//         >
//           {isBlocked ? <ShieldCheck className="h-3.5 w-3.5" /> : <ShieldBan className="h-3.5 w-3.5" />}
//           {isBlocked ? "Unblock" : "Block"}
//         </button>
//       )}
//     </form>
//   );
// };

// // ─── Agent row ────────────────────────────────────────────────
// const AgentRow = ({ agent }: { agent: IUser }) => (
//   <div className="flex items-start gap-3 py-3">
//     <div className="h-9 w-9 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center shrink-0 text-sm font-bold text-emerald-700 dark:text-emerald-400">
//       {agent.name.charAt(0).toUpperCase()}
//     </div>
//     <div className="flex-1 overflow-hidden">
//       <div className="flex items-center gap-2 flex-wrap">
//         <p className="text-sm font-medium truncate">{agent.name}</p>
//         <Badge className={cn("text-[10px] px-1.5 py-0 border-0",
//           agent.isApproved
//             ? agent.status === "ACTIVE" ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400" : "bg-red-100 dark:bg-red-950/40 text-red-600"
//             : "bg-yellow-100 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-400"
//         )}>
//           {agent.isApproved ? agent.status : "PENDING"}
//         </Badge>
//       </div>
//       <p className="text-xs text-muted-foreground truncate">{agent.email}</p>
//       <p className="text-xs text-muted-foreground">{agent.phone} · ৳{Number(agent.wallet?.balance ?? 0).toLocaleString()}</p>
//       <div className="mt-2">
//         <AgentActionButtons agent={agent} />
//       </div>
//     </div>
//     <p className="text-xs text-muted-foreground shrink-0">
//       {new Date(agent.createdAt).toLocaleDateString("en-BD", { day: "2-digit", month: "short", year: "numeric" })}
//     </p>
//   </div>
// );

// // ─── Main ─────────────────────────────────────────────────────
// const AdminAgentsContent = ({ agents, meta }: AdminAgentsContentProps) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const [search, setSearch] = useState(searchParams.get("search") ?? "");

//   const handleFilter = (key: string, value: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     if (value && value !== "All") params.set(key, value);
//     else params.delete(key);
//     router.push(`${pathname}?${params.toString()}`);
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     handleFilter("search", search);
//   };

//   return (
//     <div className="space-y-4">
//       <Card>
//         <CardContent className="p-4 space-y-3">
//           <form onSubmit={handleSearch} className="flex gap-2">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
//               <Input placeholder="Search agents..." className="pl-9 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
//             </div>
//             <Button type="submit" size="sm" className="h-9 bg-emerald-600 hover:bg-emerald-700 text-white">Search</Button>
//             {searchParams.toString() && (
//               <Button type="button" variant="ghost" size="sm" className="h-9" onClick={() => { setSearch(""); router.push(pathname); }}>
//                 <X className="h-4 w-4" />
//               </Button>
//             )}
//           </form>
//           <div className="flex gap-1.5 flex-wrap">
//             {STATUS_FILTERS.map((s) => (
//               <button key={s} onClick={() => handleFilter("status", s)}
//                 className={cn("rounded-full border px-3 py-1 text-xs font-medium transition-all",
//                   (searchParams.get("status") ?? "All") === s
//                     ? "bg-emerald-600 text-white border-emerald-600"
//                     : "border-border text-muted-foreground hover:bg-muted"
//                 )}
//               >{s}</button>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent className="p-4">
//           <p className="text-sm font-medium mb-3">{meta?.total ?? agents.length} agents</p>
//           {agents.length === 0 ? (
//             <div className="py-14 text-center">
//               <UserCheck className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
//               <p className="text-sm text-muted-foreground">No agents found</p>
//             </div>
//           ) : (
//             agents?.map((agent, idx) => (
//               <div key={agent.id}>
//                 <AgentRow agent={agent} />
//                 {idx < agents.length - 1 && <Separator />}
//               </div>
//             ))
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AdminAgentsContent;