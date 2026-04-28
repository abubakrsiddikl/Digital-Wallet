
// email টা searchParams থেকে নেব

import OtpVerifyForm from "@/components/modules/Auth/OtpVerifyForm";

// login করার পর redirect হবে /verify-otp?email=xxx@gmail.com
export default async function OtpVerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  if (!email) {
    // email না থাকলে login এ পাঠাও
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Invalid request.</p>
          <a
            href="/login"
            className="text-emerald-600 hover:underline font-medium"
          >
            Back to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
              <path d="M4 8h16M12 8v8M7 16h10"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Verify your email</h1>
          <p className="text-sm text-muted-foreground mt-1">
            One last step to complete login
          </p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <OtpVerifyForm email={email} />
        </div>
      </div>
    </div>
  );
}