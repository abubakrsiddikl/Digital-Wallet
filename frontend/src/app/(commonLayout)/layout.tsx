import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";


export const dynamic = "force-dynamic"; 

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen space-y-6 ">
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
}