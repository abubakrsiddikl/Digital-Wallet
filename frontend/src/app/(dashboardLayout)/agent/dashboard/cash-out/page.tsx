import AgentCashOutForm from "@/components/modules/Agent/CashOut/AgentCashOutForm";


const AgentCashOutPage = () => {
  return (
    <div className="space-y-6 max-w-lg mx-auto md:mx-0">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Cash Out</h1>
        <p className="text-muted-foreground text-sm mt-1">
          User gives you cash, their wallet balance decreases. You receive the amount.
        </p>
      </div>
      <AgentCashOutForm />
    </div>
  );
};

export default AgentCashOutPage;