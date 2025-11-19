import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Upload, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const basicInfoSchema = z.object({
  organizationType: z.string().min(1, "Organization type is required"),
  organizationName: z.string().min(1, "Organization name is required"),
  department: z.array(z.string()).min(1, "At least one department is required"),
  position: z.array(z.string()).min(1, "At least one position is required"),
  organizationMail: z.string().email().optional().or(z.literal("")),
  primaryContactName: z.string().min(1, "Primary contact name is required"),
  primaryEmail: z.string().email().optional().or(z.literal("")),
  primaryPhone: z.string().min(1, "Primary phone is required"),
  website: z.string().url().optional().or(z.literal("")),
  foundYear: z.string().min(1, "Found year is required"),
  address: z.string().min(1, "Address is required"),
  legalStatus: z.string().optional(),
  taxId: z.string().optional(),
  whatsapp: z.string().url().optional().or(z.literal("")),
  facebook: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  publicProfile: z.string().min(1, "Public profile is required"),
});

interface AddOrganizationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const organizationTypes = ["Non-Profit", "Government", "Corporate", "Educational", "Religious"];
const departments = ["Fire", "Police Department", "Emergency Services", "Administration", "Community Outreach"];
const positions = ["Director", "Manager", "Coordinator", "Volunteer", "Staff"];
const legalStatuses = ["Registered", "Non-Registered", "Pending"];
const publicProfiles = ["Public", "Private", "Internal"];

export function AddOrganizationModal({ open, onOpenChange }: AddOrganizationModalProps) {
  const [activeTab, setActiveTab] = useState("basic");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof basicInfoSchema>>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      organizationType: "",
      organizationName: "",
      department: [],
      position: [],
      organizationMail: "",
      primaryContactName: "",
      primaryEmail: "",
      primaryPhone: "",
      website: "",
      foundYear: "",
      address: "",
      legalStatus: "",
      taxId: "",
      whatsapp: "",
      facebook: "",
      twitter: "",
      linkedin: "",
      publicProfile: "",
    },
  });

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size must be less than 5MB",
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size must be less than 5MB",
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleDepartment = (dept: string) => {
    const updated = selectedDepartments.includes(dept)
      ? selectedDepartments.filter((d) => d !== dept)
      : [...selectedDepartments, dept];
    setSelectedDepartments(updated);
    form.setValue("department", updated);
  };

  const togglePosition = (pos: string) => {
    const updated = selectedPositions.includes(pos)
      ? selectedPositions.filter((p) => p !== pos)
      : [...selectedPositions, pos];
    setSelectedPositions(updated);
    form.setValue("position", updated);
  };

  const onSubmit = async (data: z.infer<typeof basicInfoSchema>) => {
    if (!logoPreview) {
      toast({
        title: "Error",
        description: "Logo is required",
        variant: "destructive",
      });
      return;
    }

    console.log("Form data:", data);
    
    toast({
      title: "Success",
      description: "Organization created successfully",
    });
    
    onOpenChange(false);
    form.reset();
    setSelectedDepartments([]);
    setSelectedPositions([]);
    setLogoPreview(null);
    setBannerPreview(null);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => (currentYear - i).toString());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Organization</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-6 lg:grid-cols-12 w-full">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="membership">Membership</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="hours">Hours</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="committee">Committee</TabsTrigger>
            <TabsTrigger value="notice">Notice</TabsTrigger>
            <TabsTrigger value="banking">Banking</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="sponsorship">Sponsorship</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6 pt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="organizationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization Type *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {organizationTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="organizationName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter organization name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="department"
                    render={() => (
                      <FormItem>
                        <FormLabel>Department *</FormLabel>
                        <div className="flex flex-wrap gap-2">
                          {departments.map((dept) => (
                            <Button
                              key={dept}
                              type="button"
                              variant={selectedDepartments.includes(dept) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleDepartment(dept)}
                            >
                              {dept}
                              {selectedDepartments.includes(dept) && (
                                <X className="ml-2 h-3 w-3" />
                              )}
                            </Button>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="position"
                    render={() => (
                      <FormItem>
                        <FormLabel>Position *</FormLabel>
                        <div className="flex flex-wrap gap-2">
                          {positions.map((pos) => (
                            <Button
                              key={pos}
                              type="button"
                              variant={selectedPositions.includes(pos) ? "default" : "outline"}
                              size="sm"
                              onClick={() => togglePosition(pos)}
                            >
                              {pos}
                              {selectedPositions.includes(pos) && (
                                <X className="ml-2 h-3 w-3" />
                              )}
                            </Button>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="organizationMail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization Mail</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="organization@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="primaryContactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Contact Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter contact name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="primaryEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="contact@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="primaryPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Phone *</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="foundYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Found Year *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="legalStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Legal Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {legalStatuses.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="taxId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter tax ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address *</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter full address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp</FormLabel>
                        <FormControl>
                          <Input placeholder="https://wa.me/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook</FormLabel>
                        <FormControl>
                          <Input placeholder="https://facebook.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter</FormLabel>
                        <FormControl>
                          <Input placeholder="https://twitter.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn</FormLabel>
                        <FormControl>
                          <Input placeholder="https://linkedin.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FormLabel>Logo Upload *</FormLabel>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center">
                      {logoPreview ? (
                        <div className="relative">
                          <img
                            src={logoPreview}
                            alt="Logo preview"
                            className="mx-auto max-h-32 rounded"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="mt-2"
                            onClick={() => setLogoPreview(null)}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <label className="cursor-pointer">
                          <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                          <p className="mt-2 text-sm text-muted-foreground">
                            Click to upload logo (PNG/JPEG, max 5MB)
                          </p>
                          <input
                            type="file"
                            accept="image/png,image/jpeg"
                            className="hidden"
                            onChange={handleLogoUpload}
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <FormLabel>Banner Image</FormLabel>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center">
                      {bannerPreview ? (
                        <div className="relative">
                          <img
                            src={bannerPreview}
                            alt="Banner preview"
                            className="mx-auto max-h-32 rounded"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="mt-2"
                            onClick={() => setBannerPreview(null)}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <label className="cursor-pointer">
                          <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                          <p className="mt-2 text-sm text-muted-foreground">
                            Click to upload banner (PNG/JPEG, max 5MB)
                          </p>
                          <input
                            type="file"
                            accept="image/png,image/jpeg"
                            className="hidden"
                            onChange={handleBannerUpload}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="publicProfile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Public Profile *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select profile type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {publicProfiles.map((profile) => (
                            <SelectItem key={profile} value={profile}>
                              {profile}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Organization</Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="history" className="pt-4">
            <div className="text-center text-muted-foreground py-8">
              History & Milestones - Coming Soon
            </div>
          </TabsContent>

          <TabsContent value="membership" className="pt-4">
            <div className="text-center text-muted-foreground py-8">
              Membership Type - Coming Soon
            </div>
          </TabsContent>

          <TabsContent value="contact" className="pt-4">
            <div className="text-center text-muted-foreground py-8">
              Contact and Location - Coming Soon
            </div>
          </TabsContent>

          <TabsContent value="hours" className="pt-4">
            <div className="text-center text-muted-foreground py-8">
              Hours & Status - Coming Soon
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="pt-4">
            <div className="text-center text-muted-foreground py-8">
              Gallery - Coming Soon
            </div>
          </TabsContent>

          <TabsContent value="committee" className="pt-4">
            <div className="text-center text-muted-foreground py-8">
              Committee & Leadership - Coming Soon
            </div>
          </TabsContent>

          <TabsContent value="notice" className="pt-4">
            <div className="text-center text-muted-foreground py-8">
              Notice Board - Coming Soon
            </div>
          </TabsContent>

          <TabsContent value="banking" className="pt-4">
            <div className="text-center text-muted-foreground py-8">
              Banking - Coming Soon
            </div>
          </TabsContent>

          <TabsContent value="documents" className="pt-4">
            <div className="text-center text-muted-foreground py-8">
              Documents - Coming Soon
            </div>
          </TabsContent>

          <TabsContent value="faq" className="pt-4">
            <div className="text-center text-muted-foreground py-8">
              FAQ - Coming Soon
            </div>
          </TabsContent>

          <TabsContent value="sponsorship" className="pt-4">
            <div className="text-center text-muted-foreground py-8">
              Sponsorship & Branding - Coming Soon
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
