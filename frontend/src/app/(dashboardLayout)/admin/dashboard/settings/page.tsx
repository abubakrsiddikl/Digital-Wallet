// import AdminSettingsContent from "@/components/modules/Admin/AdminSetting/AdminSettingsContent";


const AdminSettingsPage = async () => {
  // const data = await getSystemSettings();
  const data ={
  "settings": {
    "minSendAmount": 10,
    "maxSendAmount": 25000,
    "minCashOutAmount": 50,
    "maxCashOutAmount": 30000,
    "minCashInAmount": 100,
    "maxCashInAmount": 50000,
    "appName": "SwiftSend Wallet",
    "supportEmail": "support@swiftsend.com"
  }
};
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Configure global system preferences.</p>
      </div>
      {/* <AdminSettingsContent settings={data?.settings} /> */}
    </div>
  );
};

export default AdminSettingsPage;