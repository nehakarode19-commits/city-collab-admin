import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Organizations from "./pages/Organizations";
import Members from "./pages/Members";
import Events from "./pages/Events";
import Donations from "./pages/Donations";
import Sponsorships from "./pages/Sponsorships";
import Volunteering from "./pages/Volunteering";
import Relationships from "./pages/Relationships";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/organizations" element={<AdminLayout><Organizations /></AdminLayout>} />
          <Route path="/members" element={<AdminLayout><Members /></AdminLayout>} />
          <Route path="/events" element={<AdminLayout><Events /></AdminLayout>} />
          <Route path="/donations" element={<AdminLayout><Donations /></AdminLayout>} />
          <Route path="/sponsorships" element={<AdminLayout><Sponsorships /></AdminLayout>} />
          <Route path="/volunteering" element={<AdminLayout><Volunteering /></AdminLayout>} />
          <Route path="/relationships" element={<AdminLayout><Relationships /></AdminLayout>} />
          <Route path="/reports" element={<AdminLayout><Reports /></AdminLayout>} />
          <Route path="/settings" element={<AdminLayout><Settings /></AdminLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
