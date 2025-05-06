
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageLayout } from "./components/layout/PageLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import NLP from "./pages/NLP";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout><Dashboard /></PageLayout>} />
          <Route path="/dashboard" element={<PageLayout><Dashboard /></PageLayout>} />
          <Route path="/analytics" element={<PageLayout><Analytics /></PageLayout>} />
          <Route path="/nlp" element={<PageLayout><NLP /></PageLayout>} />
          <Route path="/settings" element={<PageLayout><Settings /></PageLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
