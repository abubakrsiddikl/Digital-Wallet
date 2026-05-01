import BalanceRequestForm from "@/components/modules/Agent/BalanceRequest/BalanceRequestForm";


const AgentBalanceRequestPage = () => {
  return (
    <div className="space-y-6 max-w-lg mx-auto md:mx-0">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Balance Request</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Request balance from admin to top up your agent wallet.
        </p>
      </div>
      <BalanceRequestForm />
    </div>
  );
};

export default AgentBalanceRequestPage;