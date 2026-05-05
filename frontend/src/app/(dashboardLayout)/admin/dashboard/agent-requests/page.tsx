import AdminApplicationsContent from "@/components/modules/Admin/AdminAgentRequest/AdminAgentRequestsContent";
import { getAdminApplications, getAdminBalanceRequests } from "@/services/agentApplication/agentApplication.api";


const AdminAgentRequestsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; searchTerm?: string; page?: string }>;
}) => {
  const params = await searchParams;
  const query = new URLSearchParams(params as Record<string, string>).toString();

  const [applicationsRes, balanceReqRes] = await Promise.all([
    getAdminApplications(query),
    getAdminBalanceRequests(query),
  ]);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Agent Requests</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Review agent applications and balance top-up requests.
        </p>
      </div>
      <AdminApplicationsContent
        applications={applicationsRes?.data ?? []}
        balanceRequests={balanceReqRes?.data ?? []}
        applicationsMeta={applicationsRes?.meta}
        balanceReqMeta={balanceReqRes?.meta}
      />
    </div>
  );
};

export default AdminAgentRequestsPage;