import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { 
  Images, 
  Calendar, 
  Users, 
  MessageSquare, 
  UserPlus, 
  ArrowRight, 
  TrendingUp,
  Clock,
  Eye,
  Plus,
  Activity,
  Bell,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";

interface Stats {
  gallery: number;
  events: number;
  leadership: number;
  applications: number;
  messages: number;
}

interface RecentApplication {
  id: string;
  name: string;
  status: string;
  created_at: string;
}

interface RecentMessage {
  id: string;
  name: string;
  subject: string;
  status: string;
  created_at: string;
}

interface UpcomingEvent {
  id: string;
  title: string;
  event_date: string;
  location: string | null;
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
  const [recentApplications, setRecentApplications] = useState<RecentApplication[]>([]);
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [pendingApplications, setPendingApplications] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch counts
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

      // Fetch recent applications
      const { data: appData } = await supabase
        .from("membership_applications")
        .select("id, name, status, created_at")
        .order("created_at", { ascending: false })
        .limit(5);
      
      if (appData) setRecentApplications(appData);

      // Count pending applications
      const { count: pendingCount } = await supabase
        .from("membership_applications")
        .select("id", { count: "exact", head: true })
        .eq("status", "pending");
      
      setPendingApplications(pendingCount || 0);

      // Fetch recent messages
      const { data: msgData } = await supabase
        .from("contact_submissions")
        .select("id, name, subject, status, created_at")
        .order("created_at", { ascending: false })
        .limit(5);
      
      if (msgData) setRecentMessages(msgData);

      // Count unread messages
      const { count: unreadCount } = await supabase
        .from("contact_submissions")
        .select("id", { count: "exact", head: true })
        .eq("status", "unread");
      
      setUnreadMessages(unreadCount || 0);

      // Fetch upcoming events
      const today = new Date().toISOString().split('T')[0];
      const { data: eventData } = await supabase
        .from("events")
        .select("id, title, event_date, location")
        .gte("event_date", today)
        .order("event_date", { ascending: true })
        .limit(3);
      
      if (eventData) setUpcomingEvents(eventData);

      setLoading(false);
    };

    fetchData();
  }, []);

  const statCards = [
    { title: "Gallery Images", value: stats.gallery, icon: Images, path: "/admin/gallery", color: "text-blue-500", bgColor: "bg-blue-500/10" },
    { title: "Events", value: stats.events, icon: Calendar, path: "/admin/events", color: "text-primary", bgColor: "bg-primary/10" },
    { title: "Leadership Team", value: stats.leadership, icon: Users, path: "/admin/leadership", color: "text-purple-500", bgColor: "bg-purple-500/10" },
    { title: "Applications", value: stats.applications, icon: UserPlus, path: "/admin/applications", color: "text-secondary", bgColor: "bg-secondary/10" },
    { title: "Messages", value: stats.messages, icon: MessageSquare, path: "/admin/messages", color: "text-pink-500", bgColor: "bg-pink-500/10" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
      case "unread":
        return "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400";
      case "approved":
      case "read":
        return "bg-green-500/20 text-green-600 dark:text-green-400";
      case "rejected":
        return "bg-red-500/20 text-red-600 dark:text-red-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">Welcome to the ECCA Admin Panel</p>
          </div>
          <div className="flex items-center gap-2">
            {pendingApplications > 0 && (
              <Badge variant="secondary" className="gap-1 bg-yellow-500/20 text-yellow-600 dark:text-yellow-400">
                <Bell className="w-3 h-3" />
                {pendingApplications} pending
              </Badge>
            )}
            {unreadMessages > 0 && (
              <Badge variant="secondary" className="gap-1 bg-blue-500/20 text-blue-600 dark:text-blue-400">
                <MessageSquare className="w-3 h-3" />
                {unreadMessages} unread
              </Badge>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.path} to={card.path}>
                <Card className="hover:border-primary/50 transition-all cursor-pointer group h-full">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${card.bgColor}`}>
                        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${card.color}`} />
                      </div>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold mb-1">
                      {loading ? "..." : card.value}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm text-muted-foreground">{card.title}</p>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Quick Actions */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">Common tasks at your fingertips</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/admin/gallery">
                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
                  <div className="p-1.5 rounded-md bg-blue-500/10">
                    <Plus className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm">Add Gallery Image</p>
                    <p className="text-xs text-muted-foreground">Upload new photos</p>
                  </div>
                </Button>
              </Link>
              <Link to="/admin/events">
                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
                  <div className="p-1.5 rounded-md bg-primary/10">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm">Create Event</p>
                    <p className="text-xs text-muted-foreground">Schedule new activities</p>
                  </div>
                </Button>
              </Link>
              <Link to="/admin/leadership">
                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
                  <div className="p-1.5 rounded-md bg-purple-500/10">
                    <Users className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm">Add Team Member</p>
                    <p className="text-xs text-muted-foreground">Update leadership</p>
                  </div>
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Applications */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                  Recent Applications
                </CardTitle>
                <Link to="/admin/applications">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View All
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {recentApplications.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No applications yet</p>
              ) : (
                <div className="space-y-3">
                  {recentApplications.slice(0, 4).map((app) => (
                    <div key={app.id} className="flex items-center justify-between gap-2 py-2 border-b border-border last:border-0">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm truncate">{app.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(app.created_at), "MMM d, yyyy")}
                        </p>
                      </div>
                      <Badge className={`text-xs ${getStatusColor(app.status)}`}>
                        {app.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Messages */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
                  Recent Messages
                </CardTitle>
                <Link to="/admin/messages">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View All
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {recentMessages.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No messages yet</p>
              ) : (
                <div className="space-y-3">
                  {recentMessages.slice(0, 4).map((msg) => (
                    <div key={msg.id} className="flex items-center justify-between gap-2 py-2 border-b border-border last:border-0">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm truncate">{msg.subject}</p>
                        <p className="text-xs text-muted-foreground truncate">from {msg.name}</p>
                      </div>
                      <Badge className={`text-xs ${getStatusColor(msg.status)}`}>
                        {msg.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Upcoming Events
              </CardTitle>
              <Link to="/admin/events">
                <Button variant="ghost" size="sm" className="text-xs">
                  Manage Events
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-4">No upcoming events scheduled</p>
                <Link to="/admin/events">
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 rounded-xl bg-muted/50 border border-border"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-center min-w-[50px]">
                        <p className="text-lg font-bold text-primary">
                          {format(new Date(event.event_date), "d")}
                        </p>
                        <p className="text-xs text-muted-foreground uppercase">
                          {format(new Date(event.event_date), "MMM")}
                        </p>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-sm truncate">{event.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {event.location || "Location TBA"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/20">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-lg mb-1">Manage ECCA Website</h3>
                <p className="text-sm text-muted-foreground">
                  Use this admin panel to manage all aspects of the ECCA website including events, gallery, leadership team, and member applications.
                </p>
              </div>
              <Link to="/" target="_blank">
                <Button variant="outline" className="gap-2">
                  <Eye className="w-4 h-4" />
                  View Website
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
