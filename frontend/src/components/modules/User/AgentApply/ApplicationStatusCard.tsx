import { CheckCircle, Clock, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { IAgentRequest } from "@/types/agentApplication.type";
import AgentApplyForm from "./AgentApplyForm";


// ─── Status display when already applied ─────────────────────
const ApplicationStatusCard = ({
  application,
}: {
  application: IAgentRequest;
}) => {
  const config = {
    PENDING: {
      icon: Clock,
      title: "Application Under Review",
      desc: "Your application is being reviewed by admin. This usually takes 1-2 business days.",
      color:
        "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/30",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      iconBg: "bg-yellow-100 dark:bg-yellow-900",
    },
    APPROVED: {
      icon: CheckCircle,
      title: "Application Approved!",
      desc: "Congratulations! Your agent account is active. You can now access all agent features.",
      color:
        "border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-100 dark:bg-emerald-900",
    },
    REJECTED: {
      icon: XCircle,
      title: "Application Rejected",
      desc: "Your application was rejected. You can re-apply with updated information.",
      color: "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30",
      iconColor: "text-red-600 dark:text-red-400",
      iconBg: "bg-red-100 dark:bg-red-900",
    },
  };
  console.log(application)

  const c = config[application.status] || config.PENDING;
  const Icon = c.icon;

  return (
    <div className="space-y-4">
      <Card className={`border ${c.color}`}>
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div
              className={`h-10 w-10 rounded-full ${c.iconBg} flex items-center justify-center shrink-0`}
            >
              <Icon className={`h-5 w-5 ${c.iconColor}`} />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-semibold ${c.iconColor}`}>
                {c.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {c.desc}
              </p>
              {application.reviewNote && (
                <div className="mt-2 rounded-lg bg-background/60 border px-3 py-2">
                  <p className="text-xs font-medium text-foreground">
                    Admin note:
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 italic">
                    {application.reviewNote}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submitted details */}
      <Card>
        <CardContent className="p-4 text-sm space-y-2">
          <p className="font-medium text-foreground mb-2">Submitted Details</p>
          <div className="flex justify-between text-muted-foreground">
            <span>NID Number</span>
            <span className="font-medium text-foreground tabular-nums">
              {application.nidNumber}
            </span>
          </div>
          {application.businessName && (
            <div className="flex justify-between text-muted-foreground">
              <span>Business Name</span>
              <span className="font-medium text-foreground">
                {application.businessName}
              </span>
            </div>
            
          )}
          {application.status && (
            <div className="flex justify-between text-muted-foreground">
              <span>Application Status</span>
              <span className="font-medium text-foreground">
                {application.status}
              </span>
            </div>
            
          )}
          <div className="flex justify-between text-muted-foreground">
            <span>Applied on</span>
            <span className="font-medium text-foreground">
              {new Date(application.createdAt).toLocaleDateString("en-BD", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Allow re-apply if rejected */}
      {application.status === "REJECTED" && (
        <div>
          <p className="text-sm font-semibold mb-3">Re-apply</p>
          <AgentApplyForm />
        </div>
      )}
    </div>
  );
};

export default ApplicationStatusCard;