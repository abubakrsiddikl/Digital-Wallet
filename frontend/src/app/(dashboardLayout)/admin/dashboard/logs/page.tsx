import AdminLogsContent from "@/components/modules/Admin/AdminLogs/AdminLogsContent";


const AdminAuditLogsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ action?: string; from?: string; to?: string }>;
}) => {
  const params = await searchParams;
  // const data = await getAuditLogs(params);
  const data = [
  {
    "id": "log_77001",
    "action": "APPROVE_AGENT",
    "actor": "Abu Bakr Siddik",
    "actorRole": "ADMIN",
    "target": "agent_rahul_01",
    "details": "Approved new agent request for Rahul Telecom",
    "ip": "103.230.104.18",
    "createdAt": "2026-05-03T09:30:00Z"
  },
  {
    "id": "log_77002",
    "action": "BLOCK_USER",
    "actor": "Abu Bakr Siddik",
    "actorRole": "ADMIN",
    "target": "user_malicious_99",
    "details": "Blocked user due to suspicious multiple failed PIN attempts",
    "ip": "103.230.104.18",
    "createdAt": "2026-05-03T11:45:20Z"
  },
  {
    "id": "log_77003",
    "action": "LOGIN",
    "actor": "Admin Staff 01",
    "actorRole": "ADMIN",
    "details": "Successful admin panel login",
    "ip": "114.31.2.45",
    "createdAt": "2026-05-03T08:00:10Z"
  },
  {
    "id": "log_77004",
    "action": "APPROVE_REQUEST",
    "actor": "Abu Bakr Siddik",
    "actorRole": "ADMIN",
    "target": "req_9921_abc123",
    "details": "Approved balance request of ৳50,000 for Agent Ariful",
    "ip": "103.230.104.18",
    "createdAt": "2026-05-03T10:20:00Z"
  },
  {
    "id": "log_77005",
    "action": "UPDATE_SETTINGS",
    "actor": "Abu Bakr Siddik",
    "actorRole": "ADMIN",
    "details": "Updated Cash Out commission rate from 0.45% to 0.48%",
    "ip": "103.230.104.18",
    "createdAt": "2026-05-02T16:10:00Z"
  },
  {
    "id": "log_77006",
    "action": "TRANSACTION",
    "actor": "System Automator",
    "actorRole": "ADMIN",
    "target": "TXN-88291",
    "details": "Automated reconciliation for failed transaction refund",
    "ip": "127.0.0.1",
    "createdAt": "2026-05-03T14:00:45Z"
  },
  {
    "id": "log_77007",
    "action": "LOGOUT",
    "actor": "Admin Staff 01",
    "actorRole": "ADMIN",
    "details": "Session ended successfully",
    "ip": "114.31.2.45",
    "createdAt": "2026-05-03T17:30:00Z"
  }
];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Audit Logs</h1>
        <p className="text-muted-foreground text-sm mt-1">System event history for all admin and user actions.</p>
      </div>
      <AdminLogsContent logs={data ?? []} />
    </div>
  );
};

export default AdminAuditLogsPage;