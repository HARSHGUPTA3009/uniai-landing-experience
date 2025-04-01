
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import gsap from "gsap";
import Index from "./pages/Index";
import ATSChecker from "./pages/ATSChecker";
import Interview from "./pages/Interview";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import "./index.css"; 

const queryClient = new QueryClient();

// Animation wrapper component
const AnimationLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Page transition animation
    const content = document.querySelector(".page-content");
    if (content) {
      // Animate out and in on location change
      gsap.fromTo(
        content,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [location]);

  return <div className="page-content">{children}</div>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AnimationLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/ats-checker" element={<ATSChecker />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
