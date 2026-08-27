import { Shield, HardDrive, Eye, Lock, FileCheck, Server, UserCheck, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const principles = [
  {
    icon: HardDrive,
    title: "Local Storage First",
    items: ["All data stored on your device", "Encrypted local database", "No cloud dependency for core functions", "Your device, your rules"],
  },
  {
    icon: Eye,
    title: "Selective Sharing",
    items: ["You choose what to share", "Permission-based connections", "Granular privacy controls", "Easy disconnect anytime"],
  },
  {
    icon: Lock,
    title: "Data Minimalism",
    items: ["Only collect what's necessary", "Automatic data expiry options", "No behavioral profiling", "Transparent data usage"],
  },
  {
    icon: Shield,
    title: "Zero Monitoring",
    items: ["No third-party tracking", "No data selling", "No surveillance analytics", "Complete user autonomy"],
  },
];

const certifications = [
  { name: "GDPR Compliant", icon: FileCheck },
  { name: "SOC 2 Type II", icon: Server },
  { name: "ISO 27001", icon: Shield },
  { name: "Privacy by Design", icon: UserCheck },
];

const Privacy = () => {
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-2xl md:text-3xl font-bold">Privacy & Security</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your data belongs to you. We built this platform with a zero-monitoring philosophy — 
          everything stays local unless you explicitly choose to share.
        </p>
      </div>

      {/* Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {principles.map((principle) => (
          <Card key={principle.title}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <principle.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-base">{principle.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {principle.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-primary text-xs">●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Certifications & Compliance</CardTitle>
          <CardDescription>Industry-standard security certifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex flex-col items-center gap-2 p-4 rounded-lg border text-center">
                <cert.icon className="h-6 w-6 text-primary" />
                <span className="text-xs font-medium">{cert.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Control */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6 md:p-8 text-center space-y-3">
          <Globe className="h-8 w-8 text-primary mx-auto" />
          <h3 className="font-semibold text-lg">You Own Your Data</h3>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Export or delete all your data at any time. We provide full data portability 
            and the right to be forgotten. No lock-in, no tricks.
          </p>
          <Badge variant="secondary">Full Data Portability</Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default Privacy;
