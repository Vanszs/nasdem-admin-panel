import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { FileText, Image, Users, Pin, Archive } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ActivityItem {
  id: string;
  type: "news" | "gallery" | "structure";
  action: "created" | "published" | "pinned" | "unpinned" | "archived" | "updated";
  title: string;
  user: string;
  timestamp: Date;
}

// Mock data
const activities: ActivityItem[] = [
  {
    id: "1",
    type: "news",
    action: "published",
    title: "Program Pembangunan Infrastruktur Sidoarjo 2024",
    user: "Admin User",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: "2", 
    type: "news",
    action: "pinned",
    title: "Rapat Koordinasi DPD Partai NasDem",
    user: "Editor User",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
  },
  {
    id: "3",
    type: "gallery",
    action: "created",
    title: "Foto Kegiatan Sosialisasi Program",
    user: "Media Officer",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
  },
  {
    id: "4",
    type: "structure",
    action: "updated", 
    title: "Data Pengurus DPD Sidoarjo",
    user: "Admin User",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
];

const getActivityIcon = (type: ActivityItem["type"], action: ActivityItem["action"]) => {
  if (action === "pinned") return Pin;
  if (action === "archived") return Archive;
  
  switch (type) {
    case "news": return FileText;
    case "gallery": return Image;
    case "structure": return Users;
    default: return FileText;
  }
};

const getActivityColor = (action: ActivityItem["action"]) => {
  switch (action) {
    case "published": return "bg-success/10 text-success";
    case "pinned": return "bg-accent/10 text-accent";
    case "archived": return "bg-warning/10 text-warning";
    case "created": return "bg-info/10 text-info";
    case "updated": return "bg-primary/10 text-primary";
    default: return "bg-muted/10 text-muted-foreground";
  }
};

const getActionLabel = (action: ActivityItem["action"]) => {
  switch (action) {
    case "created": return "dibuat";
    case "published": return "dipublikasi";
    case "pinned": return "di-pin";
    case "unpinned": return "unpin";
    case "archived": return "diarsip";
    case "updated": return "diperbarui";
    default: return action;
  }
};

export function RecentActivity() {
  return (
    <Card className="admin-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Aktivitas Terbaru</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const Icon = getActivityIcon(activity.type, activity.action);
          
          return (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 smooth-transition">
              <div className={`p-2 rounded-lg ${getActivityColor(activity.action)}`}>
                <Icon className="h-3 w-3" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium truncate">{activity.title}</p>
                  <Badge variant="secondary" className="text-xs">
                    {getActionLabel(activity.action)}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Avatar className="h-4 w-4">
                    <AvatarFallback className="text-[10px]">
                      {activity.user.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{activity.user}</span>
                  <span>•</span>
                  <span>
                    {formatDistanceToNow(activity.timestamp, { 
                      addSuffix: true, 
                      locale: id 
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}