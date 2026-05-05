// import AdminCommissionContent from "@/components/modules/Admin/AdminCommission/AdminCommissionContent";

const AdminCommissionSettingsPage = async () => {
  // const data = await getCommissionSettings();
  const data = {
    settings: {
      sendMoneyAgentCommission: 0.0,
      sendMoneySystemCommission: 5.0,
      cashOutAgentCommission: 0.45,
      cashOutSystemCommission: 0.05,
      cashInAgentCommission: 0.4,
      cashInSystemCommission: 0.0,
    },
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Commission Settings
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Set commission rates for each transaction type.
        </p>
      </div>
      {/* <AdminCommissionContent settings={data?.settings} /> */}
    </div>
  );
};

export default AdminCommissionSettingsPage;
