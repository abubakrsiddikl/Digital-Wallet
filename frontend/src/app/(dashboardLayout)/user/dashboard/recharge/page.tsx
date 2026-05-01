import MobileRechargeForm from "@/components/modules/User/Recharge/MobileRechargeForm";

const UserMobileRechargePage = () => {
  return (
    <div className="space-y-6 max-w-lg mx-auto md:mx-0">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Mobile Recharge</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Recharge any mobile number instantly with your wallet balance.
        </p>
      </div>
      <MobileRechargeForm />
    </div>
  );
};

export default UserMobileRechargePage;