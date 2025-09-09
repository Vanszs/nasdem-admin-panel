import { Link } from "react-router-dom";
import { Plus, FileText, Image, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const quickActions = [
  {
    title: "Tulis Berita",
    description: "Buat artikel baru untuk publikasi",
    href: "/news/create",
    icon: FileText,
    color: "bg-brand-accent",
  },
  {
    title: "Upload Galeri",
    description: "Tambah foto dan media baru",
    href: "/gallery/upload",
    icon: Image, 
    color: "bg-brand-primary",
  },
  {
    title: "Kelola Struktur",
    description: "Update data pengurus organisasi",
    href: "/structure/dpd",
    icon: Users,
    color: "bg-success",
  },
];

export function QuickActions() {
  return (
    <Card className="admin-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {quickActions.map((action) => (
          <Link key={action.title} to={action.href}>
            <Button
              variant="ghost" 
              className="w-full justify-start h-auto p-3 smooth-transition hover:bg-muted/50 focus-ring"
            >
              <div className={`p-2 rounded-lg mr-3 ${action.color}`}>
                <action.icon className="h-4 w-4 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}