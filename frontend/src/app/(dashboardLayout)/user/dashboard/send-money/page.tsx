import SendMoneyForm from "@/components/modules/User/SendMoney/SendMoneyForm";


const UserSendMoneyPage = () => {
  return (
    <div className="space-y-6 max-w-lg mx-auto md:mx-0">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Send Money</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Transfer money to any registered user instantly.
        </p>
      </div>
      <SendMoneyForm />
    </div>
  );
};

export default UserSendMoneyPage;