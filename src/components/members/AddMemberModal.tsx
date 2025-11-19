import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, Upload, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AddMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddMemberModal({ open, onOpenChange }: AddMemberModalProps) {
  const [activeTab, setActiveTab] = useState("member-info");
  
  // Member Information State
  const [prefix, setPrefix] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [address, setAddress] = useState("");
  const [education, setEducation] = useState("");
  const [profession, setProfession] = useState("");
  const [employer, setEmployer] = useState("");
  const [industry, setIndustry] = useState("");
  const [otherOrganizations, setOtherOrganizations] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [govIdType, setGovIdType] = useState("");
  const [govIdNumber, setGovIdNumber] = useState("");
  const [govIdFile, setGovIdFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [medal, setMedal] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string>("");

  // Membership Details State
  const [membershipName, setMembershipName] = useState("");
  const [membershipType, setMembershipType] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [duration, setDuration] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [renewalDate, setRenewalDate] = useState<Date>();
  const [sponsorOrganization, setSponsorOrganization] = useState("");
  const [sponsorshipStatus, setSponsorshipStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDate, setPaymentDate] = useState<Date>();
  const [discountApplied, setDiscountApplied] = useState("");
  const [discountReason, setDiscountReason] = useState("");
  const [baseFees, setBaseFees] = useState("");
  const [taxPercentage, setTaxPercentage] = useState("");
  const [discount, setDiscount] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const skillsList = ["Computer", "Math", "Science", "Arts", "Music", "Sports", "Leadership", "Communication"];

  const handleSkillToggle = (skill: string) => {
    setSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleProfilePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setProfilePhoto(file);
      setProfilePhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleGovIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setGovIdFile(file);
      toast.success("Government ID uploaded successfully");
    }
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setReceiptFile(file);
      toast.success("Receipt uploaded successfully");
    }
  };

  const calculateSubTotal = () => {
    const fees = parseFloat(baseFees) || 0;
    const tax = parseFloat(taxPercentage) || 0;
    const disc = parseFloat(discount) || 0;
    const taxAmount = (fees * tax) / 100;
    return fees + taxAmount - disc;
  };

  const handleSaveMemberInfo = () => {
    if (!firstName || !lastName) {
      toast.error("First Name and Last Name are required");
      return;
    }
    toast.success("Member information saved");
    setActiveTab("membership-details");
  };

  const handleSubmit = () => {
    if (!membershipType) {
      toast.error("Membership Type is required");
      return;
    }
    
    const memberData = {
      memberInfo: {
        prefix, firstName, middleName, lastName, suffix,
        department, position, phoneNumber, gender,
        dateOfBirth, address, education, profession,
        employer, industry, otherOrganizations, skills,
        govIdType, govIdNumber, description,
        social: { whatsapp, twitter, facebook, linkedin },
        medal
      },
      membershipDetails: {
        membershipName, membershipType, basePrice, duration,
        startDate, renewalDate, sponsorOrganization,
        sponsorshipStatus, paymentMethod, paymentDate,
        discountApplied, discountReason,
        billing: { baseFees, taxPercentage, discount, subTotal: calculateSubTotal() }
      }
    };

    console.log("Member Data:", memberData);
    toast.success("Member added successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="member-info">Member Information</TabsTrigger>
            <TabsTrigger value="membership-details">Membership Details</TabsTrigger>
          </TabsList>

          <TabsContent value="member-info" className="space-y-6">
            {/* Personal Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Details</h3>
              <div className="grid grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prefix">Prefix</Label>
                  <Select value={prefix} onValueChange={setPrefix}>
                    <SelectTrigger id="prefix">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mr">Mr.</SelectItem>
                      <SelectItem value="mrs">Mrs.</SelectItem>
                      <SelectItem value="ms">Ms.</SelectItem>
                      <SelectItem value="dr">Dr.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="middleName">Middle Name</Label>
                  <Input id="middleName" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="suffix">Suffix</Label>
                  <Input id="suffix" value={suffix} onChange={(e) => setSuffix(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fire">Fire</SelectItem>
                      <SelectItem value="police">Police Department</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Select value={position} onValueChange={setPosition}>
                    <SelectTrigger id="position">
                      <SelectValue placeholder="Select Position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mayor">Mayor</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="officer">Officer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dateOfBirth && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateOfBirth ? format(dateOfBirth, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dateOfBirth} onSelect={setDateOfBirth} initialFocus className="pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Search location..." />
              </div>
            </div>

            {/* Education & Profession */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Education & Profession</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="education">Education</Label>
                  <Select value={education} onValueChange={setEducation}>
                    <SelectTrigger id="education">
                      <SelectValue placeholder="Select Education" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bsc">BSC</SelectItem>
                      <SelectItem value="msc">MSC</SelectItem>
                      <SelectItem value="ba">BA</SelectItem>
                      <SelectItem value="ma">MA</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profession">Profession</Label>
                  <Input id="profession" value={profession} onChange={(e) => setProfession(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employer">Employer</Label>
                  <Input id="employer" value={employer} onChange={(e) => setEmployer(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" value={industry} onChange={(e) => setIndustry(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherOrgs">Other Organizations/Affiliated Groups</Label>
                <Input id="otherOrgs" value={otherOrganizations} onChange={(e) => setOtherOrganizations(e.target.value)} />
              </div>
            </div>

            {/* Skills & Interests */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Skills & Interests</h3>
              <div className="grid grid-cols-4 gap-4">
                {skillsList.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox id={skill} checked={skills.includes(skill)} onCheckedChange={() => handleSkillToggle(skill)} />
                    <Label htmlFor={skill} className="cursor-pointer">{skill}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Government ID */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Government ID</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="govIdType">Government ID Type</Label>
                  <Select value={govIdType} onValueChange={setGovIdType}>
                    <SelectTrigger id="govIdType">
                      <SelectValue placeholder="Select ID Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aadhar">Aadhar</SelectItem>
                      <SelectItem value="pan">PAN</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="drivers">Driver's License</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="govIdNumber">Government ID Number</Label>
                  <Input id="govIdNumber" value={govIdNumber} onChange={(e) => setGovIdNumber(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="govIdUpload">Government ID Upload</Label>
                <div className="flex items-center gap-2">
                  <Input id="govIdUpload" type="file" onChange={handleGovIdUpload} accept="image/*,.pdf" />
                  {govIdFile && <span className="text-sm text-muted-foreground">{govIdFile.name}</span>}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Social Media</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input id="whatsapp" type="url" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="https://" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input id="twitter" type="url" value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="https://" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input id="facebook" type="url" value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="https://" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input id="linkedin" type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="https://" />
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Certifications</h3>
              <div className="space-y-2">
                <Label htmlFor="medal">Medal</Label>
                <Select value={medal} onValueChange={setMedal}>
                  <SelectTrigger id="medal">
                    <SelectValue placeholder="Select Certificate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="certificate">Certificate</SelectItem>
                    <SelectItem value="gold">Gold Medal</SelectItem>
                    <SelectItem value="silver">Silver Medal</SelectItem>
                    <SelectItem value="bronze">Bronze Medal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Profile Photo</h3>
              <div className="space-y-2">
                <Label htmlFor="profilePhoto">Upload Photo</Label>
                <Input id="profilePhoto" type="file" onChange={handleProfilePhotoUpload} accept="image/jpeg,image/png" />
                {profilePhotoPreview && (
                  <div className="mt-2">
                    <img src={profilePhotoPreview} alt="Profile Preview" className="w-32 h-32 object-cover rounded-md border" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="active:bg-destructive active:text-destructive-foreground">Cancel</Button>
              <Button onClick={handleSaveMemberInfo}>Next</Button>
            </div>
          </TabsContent>

          <TabsContent value="membership-details" className="space-y-6">
            {/* Membership Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Membership Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="membershipName">Membership Name</Label>
                  <Select value={membershipName} onValueChange={setMembershipName}>
                    <SelectTrigger id="membershipName">
                      <SelectValue placeholder="Select Membership" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                      <SelectItem value="bronze">Bronze</SelectItem>
                      <SelectItem value="platinum">Platinum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="membershipType">Membership Type *</Label>
                  <Select value={membershipType} onValueChange={setMembershipType}>
                    <SelectTrigger id="membershipType">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
                      <SelectItem value="family">Family</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="basePrice">Base Price</Label>
                  <Input id="basePrice" type="number" value={basePrice} onChange={(e) => setBasePrice(e.target.value)} placeholder="$0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Select Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1year">1 Year</SelectItem>
                      <SelectItem value="2years">2 Years</SelectItem>
                      <SelectItem value="3years">3 Years</SelectItem>
                      <SelectItem value="lifetime">Lifetime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus className="pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Renewal Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !renewalDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {renewalDate ? format(renewalDate, "PPP") : "Auto-calculated"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={renewalDate} onSelect={setRenewalDate} initialFocus className="pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Benefits</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sponsorOrg">Sponsor Organization</Label>
                  <Input id="sponsorOrg" value={sponsorOrganization} onChange={(e) => setSponsorOrganization(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sponsorshipStatus">Sponsorship Status</Label>
                  <Select value={sponsorshipStatus} onValueChange={setSponsorshipStatus}>
                    <SelectTrigger id="sponsorshipStatus">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger id="paymentMethod">
                      <SelectValue placeholder="Select Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit">Credit Card</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="check">Check</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Payment Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !paymentDate && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {paymentDate ? format(paymentDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={paymentDate} onSelect={setPaymentDate} initialFocus className="pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discountApplied">Discount Applied</Label>
                  <Input id="discountApplied" type="number" value={discountApplied} onChange={(e) => setDiscountApplied(e.target.value)} placeholder="$0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountReason">Discount Reason</Label>
                  <Input id="discountReason" value={discountReason} onChange={(e) => setDiscountReason(e.target.value)} />
                </div>
              </div>
            </div>

            {/* Billing Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Billing Information</h3>
              <div className="border rounded-lg p-4 space-y-4 bg-muted/50">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="baseFees">Base Fees</Label>
                    <Input id="baseFees" type="number" value={baseFees} onChange={(e) => setBaseFees(e.target.value)} placeholder="$0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxPercentage">Tax Percentage (%)</Label>
                    <Input id="taxPercentage" type="number" value={taxPercentage} onChange={(e) => setTaxPercentage(e.target.value)} placeholder="0%" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discount">Discount</Label>
                  <Input id="discount" type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="$0.00" />
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Sub Total:</span>
                    <span className="text-2xl font-bold text-primary">${calculateSubTotal().toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full">Send</Button>
              </div>
            </div>

            {/* Receipt Attachment */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Receipt Attachment</h3>
              <div className="space-y-2">
                <Label htmlFor="receipt">Upload Receipt</Label>
                <div className="flex items-center gap-2">
                  <Input id="receipt" type="file" onChange={handleReceiptUpload} accept="image/*,.pdf" />
                  {receiptFile && <span className="text-sm text-muted-foreground">{receiptFile.name}</span>}
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("member-info")}>Back</Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)} className="active:bg-destructive active:text-destructive-foreground">Cancel</Button>
                <Button onClick={handleSubmit}>Save Profile</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
