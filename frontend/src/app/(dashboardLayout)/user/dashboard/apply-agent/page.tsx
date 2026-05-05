
import { getMyApplicationStatus } from "@/services/agentApplication/agentApplication.api";
import AgentApplyForm from "@/components/modules/User/AgentApply/AgentApplyForm";
import ApplicationStatusCard from "@/components/modules/User/AgentApply/ApplicationStatusCard";





const AgentApplyPage = async () => {
  const application = await getMyApplicationStatus();
  console.log(application)

  return (
    <div className="space-y-6 max-w-lg mx-auto md:mx-0">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Become an Agent
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Apply to become a Takaa agent and start earning commission.
        </p>
      </div>

      {application?.data ? (
        <ApplicationStatusCard application={application?.data || {}} />
      ) : (
        <AgentApplyForm />
      )}
    </div>
  );
};

export default AgentApplyPage;
