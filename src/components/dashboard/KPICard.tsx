import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    type: "increase" | "decrease" | "neutral";
    period?: string;
  };
  icon: LucideIcon;
  description?: string;
  color?: "primary" | "accent" | "success" | "warning" | "info";
}

export function KPICard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  description, 
  color = "primary" 
}: KPICardProps) {
  const colorClasses = {
    primary: "text-primary bg-primary/10",
    accent: "text-accent bg-accent/10", 
    success: "text-success bg-success/10",
    warning: "text-warning bg-warning/10",
    info: "text-info bg-info/10",
  };

  const changeColorClasses = {
    increase: "text-success bg-success/10",
    decrease: "text-destructive bg-destructive/10", 
    neutral: "text-muted-foreground bg-muted",
  };

  return (
    <Card className="admin-card smooth-transition hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{value}</div>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          {change && (
            <Badge 
              variant="secondary"
              className={`${changeColorClasses[change.type]} border-0 text-xs`}
            >
              {change.type === "increase" && "+"}
              {change.type === "decrease" && "-"}
              {change.value}
              {change.period && ` ${change.period}`}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}