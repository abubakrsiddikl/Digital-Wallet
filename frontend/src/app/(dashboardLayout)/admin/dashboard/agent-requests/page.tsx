// import AdminAgentRequestsContent from "@/components/modules/Admin/AdminAgentRequest/AdminAgentRequestsContent";

const AdminAgentRequestsPage = async () => {
  // const data = await getAgentBalanceRequests();
  const data = {
  "requests": [
    {
      "id": "req_9921_abc123",
      "agent": {
        "id": "agent_001",
        "name": "Ariful Islam",
        "phone": "01711223344",
        "email": "arif.agent@gmail.com",
        "role": "AGENT"
      },
      "amount": 50000,
      "note": "Need emergency balance for evening rush",
      "status": "PENDING",
      "createdAt": "2026-05-03T10:15:00Z"
    },
    {
      "id": "req_9922_def456",
      "agent": {
        "id": "agent_002",
        "name": "Rahat Talukder",
        "phone": "01822334455",
        "email": "rahat.store@yahoo.com",
        "role": "AGENT"
      },
      "amount": 25000,
      "note": "Weekly balance refill",
      "status": "APPROVED",
      "createdAt": "2026-05-02T14:30:45Z"
    },
    {
      "id": "req_9923_ghi789",
      "agent": {
        "id": "agent_003",
        "name": "Sumon Ahmed",
        "phone": "01933445566",
        "email": "sumon.telecom@hotmail.com",
        "role": "AGENT"
      },
      "amount": 100000,
      "note": "Bulk cash-in request",
      "status": "REJECTED",
      "createdAt": "2026-05-01T09:00:00Z"
    },
    {
      "id": "req_9924_jkl012",
      "agent": {
        "id": "agent_004",
        "name": "Mousumi Akter",
        "phone": "01544556677",
        "role": "AGENT"
      },
      "amount": 15000,
      "status": "PENDING",
      "createdAt": "2026-05-03T20:45:10Z"
    }
  ]
};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Agent Balance Requests</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Review and approve or reject agent balance top-up requests.
        </p>
      </div>
      {/* <AdminAgentRequestsContent requests={data.requests ?? []} /> */}
    </div>
  );
};

export default AdminAgentRequestsPage;