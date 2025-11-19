import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, Users, Calendar } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

const Donations = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Donations</h1>
          <p className="text-muted-foreground mt-1">Track and manage all donations</p>
        </div>
        <Button>Record Donation</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Donations"
          value="$45,230"
          change="+23%"
          changeType="increase"
          icon={DollarSign}
          iconColor="text-success"
        />
        <StatCard
          title="This Month"
          value="$6,780"
          change="+12%"
          changeType="increase"
          icon={TrendingUp}
          iconColor="text-primary"
        />
        <StatCard
          title="Total Donors"
          value="142"
          change="+8"
          changeType="increase"
          icon={Users}
          iconColor="text-accent"
        />
        <StatCard
          title="Average Donation"
          value="$318"
          change="+5%"
          changeType="increase"
          icon={Calendar}
          iconColor="text-info"
        />
      </div>

      <Card className="p-6">
        <p className="text-center text-muted-foreground">Donation management features coming soon...</p>
      </Card>
    </div>
  );
};

export default Donations;
