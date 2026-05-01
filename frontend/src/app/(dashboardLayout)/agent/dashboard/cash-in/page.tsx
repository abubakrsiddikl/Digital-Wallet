import AgentCashInForm from "@/components/modules/Agent/CashIn/AgentCashInForm";


const AgentCashInPage = () => {
  return (
    <div className="space-y-6 max-w-lg mx-auto md:mx-0">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Cash In</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Add money to a user&apos;s wallet. You give cash, user balance increases.
        </p>
      </div>
      <AgentCashInForm />
    </div>
  );
};

export default AgentCashInPage;