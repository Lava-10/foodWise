import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Calculator from "./pages/Calculator";
import Volunteer from "./pages/Volunteer";
import Quiz from "./pages/Quiz";
import FoodImageAnalysis from "./pages/FoodImageAnalysis";
import AiEducator from "./pages/AiEducator";
import { Provider } from "react-redux";
import store from "./features/store";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <main className="min-h-screen pt-16">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/food-analysis" element={<FoodImageAnalysis />} />
              <Route path="/ai-educator" element={<AiEducator />} />
            </Routes>
            <TooltipProvider>
              <Navigation />
              <Footer />
              <ChatBot />
            </TooltipProvider>
            <Toaster />
            <Sonner />
          </main>
        </QueryClientProvider>
      </Provider>
    );

export default App;
