import { getUserProfile } from "@/services/auth/auth.api";
import NavbarContent from "./NavbarContent";

export default async function Navbar() {
  const user = await getUserProfile();
  return <NavbarContent user={user ?? null} />;
}
