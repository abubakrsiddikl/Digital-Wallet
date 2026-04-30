import CashOutForm from "@/components/modules/User/CashOut/CashOutForm";


const UserCashOutPage = () => {
  return (
    <div className="space-y-6 max-w-lg mx-auto md:mx-0">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Cash Out</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Withdraw cash through a registered agent near you.
        </p>
      </div>
      <CashOutForm />
    </div>
  );
};

export default UserCashOutPage;