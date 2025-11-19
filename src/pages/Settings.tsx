import { Card } from "@/components/ui/card";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure system settings and preferences</p>
      </div>

      <Card className="p-6">
        <p className="text-center text-muted-foreground">System settings coming soon...</p>
      </Card>
    </div>
  );
};

export default Settings;
