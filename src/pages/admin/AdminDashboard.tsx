import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Images, Calendar, Users, MessageSquare, UserPlus, ArrowRight } from "lucide-react";

interface Stats {
  gallery: number;
  events: number;
  leadership: number;
  applications: number;
  messages: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    gallery: 0,
    events: 0,
    leadership: 0,
    applications: 0,
    messages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [gallery, events, leadership, applications, messages] = await Promise.all([
        supabase.from("gallery_images").select("id", { count: "exact", head: true }),
        supabase.from("events").select("id", { count: "exact", head: true }),
        supabase.from("leadership_team").select("id", { count: "exact", head: true }),
        supabase.from("membership_applications").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
      ]);

      setStats({
        gallery: gallery.count || 0,
        events: events.count || 0,
        leadership: leadership.count || 0,
        applications: applications.count || 0,
        messages: messages.count || 0,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: "Gallery Images", value: stats.gallery, icon: Images, path: "/admin/gallery", color: "text-blue-500" },
    { title: "Events", value: stats.events, icon: Calendar, path: "/admin/events", color: "text-green-500" },
    { title: "Leadership Team", value: stats.leadership, icon: Users, path: "/admin/leadership", color: "text-purple-500" },
    { title: "Applications", value: stats.applications, icon: UserPlus, path: "/admin/applications", color: "text-orange-500" },
    { title: "Messages", value: stats.messages, icon: MessageSquare, path: "/admin/messages", color: "text-pink-500" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome to the ECCA Admin Panel</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.path} to={card.path}>
                <Card className="hover:border-primary/50 transition-all cursor-pointer group">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {card.title}
                    </CardTitle>
                    <Icon className={`w-4 h-4 ${card.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">
                        {loading ? "..." : card.value}
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/admin/gallery" className="block p-3 rounded-lg hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <Images className="w-5 h-5 text-blue-500" />
                  <span>Add new gallery image</span>
                </div>
              </Link>
              <Link to="/admin/events" className="block p-3 rounded-lg hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <span>Create new event</span>
                </div>
              </Link>
              <Link to="/admin/leadership" className="block p-3 rounded-lg hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-purple-500" />
                  <span>Add team member</span>
                </div>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Check the Applications and Messages sections to see recent submissions from website visitors.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
