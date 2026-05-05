import AdminUsersContent from "@/components/modules/Admin/AdminUser/AdminUserContent";
import { queryStringFormatter } from "@/lib/formatter";
import { getAllUsers } from "@/services/user/user.api";

const AdminUsersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  
  const queryString = queryStringFormatter(searchParamsObj);
  const data = await getAllUsers(queryString);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">All Users</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage user accounts — search, block, or unblock.
        </p>
      </div>
      <AdminUsersContent users={data?.data ?? []} meta={data?.meta} />
    </div>
  );
};

export default AdminUsersPage;
