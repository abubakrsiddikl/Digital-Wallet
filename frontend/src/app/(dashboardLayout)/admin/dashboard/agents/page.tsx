// import AdminAgentsContent from "@/components/modules/Admin/AdminAgent/AdminAgentContent";


const AdminAgentsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string }>;
}) => {
  const params = await searchParams;
  // const data = await getAllAgents(params);
const data = {
  "agents": [
    {
      "id": "agent_001",
      "name": "Ariful Islam",
      "image": "https://i.pravatar.cc/150?u=agent_001",
      "email": "arif.agent@gmail.com",
      "phone": "01711223344",
      "role": "AGENT",
      "status": "ACTIVE",
      "isApproved": true,
      "createdAt": "2026-01-10T10:00:00Z",
      "updatedAt": "2026-05-01T12:00:00Z",
      "wallet": {
        "id": "w_001",
        "userId": "agent_001",
        "balance": "5500.50",
        "isBlocked": false,
        "type": "AGENT_WALLET",
        "createdAt": "2026-01-10T10:05:00Z",
        "updatedAt": "2026-05-03T15:30:00Z"
      }
    },
    {
      "id": "agent_002",
      "name": "Rahat Talukder",
      "image": "https://i.pravatar.cc/150?u=agent_002",
      "email": "rahat.store@yahoo.com",
      "phone": "01822334455",
      "role": "AGENT",
      "status": "ACTIVE",
      "isApproved": true,
      "createdAt": "2026-02-15T09:30:00Z",
      "updatedAt": "2026-05-02T11:00:00Z",
      "wallet": {
        "id": "w_002",
        "userId": "agent_002",
        "balance": "12450.00",
        "isBlocked": false,
        "type": "AGENT_WALLET",
        "createdAt": "2026-02-15T09:35:00Z",
        "updatedAt": "2026-05-03T10:20:00Z"
      }
    },
    {
      "id": "agent_003",
      "name": "Sumon Ahmed",
      "image": "https://i.pravatar.cc/150?u=agent_003",
      "email": "sumon.telecom@hotmail.com",
      "phone": "01933445566",
      "role": "AGENT",
      "status": "BLOCKED",
      "isApproved": true,
      "createdAt": "2026-03-01T14:20:00Z",
      "updatedAt": "2026-05-01T16:45:00Z",
      "wallet": {
        "id": "w_003",
        "userId": "agent_003",
        "balance": "0.00",
        "isBlocked": true,
        "type": "AGENT_WALLET",
        "createdAt": "2026-03-01T14:25:00Z",
        "updatedAt": "2026-05-01T16:45:00Z"
      }
    },
    {
      "id": "agent_004",
      "name": "Mousumi Akter",
      "image": "https://i.pravatar.cc/150?u=agent_004",
      "email": "mousumi.bd@gmail.com",
      "phone": "01544556677",
      "role": "AGENT",
      "status": "ACTIVE",
      "isApproved": false,
      "createdAt": "2026-05-03T08:00:00Z",
      "updatedAt": "2026-05-03T08:00:00Z",
      "wallet": {
        "id": "w_004",
        "userId": "agent_004",
        "balance": "0.00",
        "isBlocked": false,
        "type": "AGENT_WALLET",
        "createdAt": "2026-05-03T08:00:00Z",
        "updatedAt": "2026-05-03T08:00:00Z"
      }
    },
    {
      "id": "agent_005",
      "name": "Kamal Hossain",
      "image": "https://i.pravatar.cc/150?u=agent_005",
      "email": "kamal.point@gmail.com",
      "phone": "01311223344",
      "role": "AGENT",
      "status": "ACTIVE",
      "isApproved": true,
      "createdAt": "2025-12-20T11:00:00Z",
      "updatedAt": "2026-04-30T10:00:00Z",
      "wallet": {
        "id": "w_005",
        "userId": "agent_005",
        "balance": "8900.75",
        "isBlocked": false,
        "type": "AGENT_WALLET",
        "createdAt": "2025-12-20T11:10:00Z",
        "updatedAt": "2026-05-02T19:00:00Z"
      }
    },
    {
      "id": "agent_006",
      "name": "Sultana Razia",
      "image": "https://i.pravatar.cc/150?u=agent_006",
      "email": "sultana.razia@gmail.com",
      "phone": "01655667788",
      "role": "AGENT",
      "status": "ACTIVE",
      "isApproved": true,
      "createdAt": "2026-04-05T15:30:00Z",
      "updatedAt": "2026-05-01T09:00:00Z",
      "wallet": {
        "id": "w_006",
        "userId": "agent_006",
        "balance": "150.00",
        "isBlocked": false,
        "type": "AGENT_WALLET",
        "createdAt": "2026-04-05T15:35:00Z",
        "updatedAt": "2026-05-03T11:00:00Z"
      }
    },
    {
      "id": "agent_007",
      "name": "Tanvir Hasan",
      "image": "https://i.pravatar.cc/150?u=agent_007",
      "email": "tanvir.hasan@live.com",
      "phone": "01722334499",
      "role": "AGENT",
      "status": "BLOCKED",
      "isApproved": true,
      "createdAt": "2026-01-25T10:15:00Z",
      "updatedAt": "2026-04-15T14:20:00Z",
      "wallet": {
        "id": "w_007",
        "userId": "agent_007",
        "balance": "3200.00",
        "isBlocked": true,
        "type": "AGENT_WALLET",
        "createdAt": "2026-01-25T10:20:00Z",
        "updatedAt": "2026-04-15T14:20:00Z"
      }
    },
    {
      "id": "agent_008",
      "name": "Nasrin Akter",
      "image": "https://i.pravatar.cc/150?u=agent_008",
      "email": "nasrin.akter@outlook.com",
      "phone": "01999887766",
      "role": "AGENT",
      "status": "ACTIVE",
      "isApproved": true,
      "createdAt": "2026-02-10T12:00:00Z",
      "updatedAt": "2026-05-01T17:30:00Z",
      "wallet": {
        "id": "w_008",
        "userId": "agent_008",
        "balance": "25600.40",
        "isBlocked": false,
        "type": "AGENT_WALLET",
        "createdAt": "2026-02-10T12:05:00Z",
        "updatedAt": "2026-05-03T14:00:00Z"
      }
    },
    {
      "id": "agent_009",
      "name": "Jamil Uddin",
      "image": "https://i.pravatar.cc/150?u=agent_009",
      "email": "jamil.agent@gmail.com",
      "phone": "01844332211",
      "role": "AGENT",
      "status": "ACTIVE",
      "isApproved": false,
      "createdAt": "2026-05-02T16:40:00Z",
      "updatedAt": "2026-05-02T16:40:00Z",
      "wallet": {
        "id": "w_009",
        "userId": "agent_009",
        "balance": "0.00",
        "isBlocked": false,
        "type": "AGENT_WALLET",
        "createdAt": "2026-05-02T16:45:00Z",
        "updatedAt": "2026-05-02T16:45:00Z"
      }
    },
    {
      "id": "agent_010",
      "name": "Sajid Khan",
      "image": "https://i.pravatar.cc/150?u=agent_010",
      "email": "sajid.khan@gmail.com",
      "phone": "01788776655",
      "role": "AGENT",
      "status": "ACTIVE",
      "isApproved": true,
      "createdAt": "2026-03-20T11:20:00Z",
      "updatedAt": "2026-05-01T15:10:00Z",
      "wallet": {
        "id": "w_010",
        "userId": "agent_010",
        "balance": "750.25",
        "isBlocked": false,
        "type": "AGENT_WALLET",
        "createdAt": "2026-03-20T11:25:00Z",
        "updatedAt": "2026-05-03T09:45:00Z"
      }
    }
  ],
  "meta": {
    "total": 10
  }
};
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">All Agents</h1>
        <p className="text-muted-foreground text-sm mt-1">Approve, reject, or block agent accounts.</p>
      </div>
      {/* <AdminAgentsContent agents={data?.agents ?? []} meta={data.meta} /> */}
    </div>
  );
};

export default AdminAgentsPage;