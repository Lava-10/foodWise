import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plate, Users, Brain, Camera } from "lucide-react"; // Changed DropletIcon to Plate

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden food-bg"> {/* Changed wave-bg to food-bg */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-90" /> {/* Changed color gradient */}
          {/* Animated Wave Background (Now Food-Related) */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-white/20">
            <div className="relative h-full w-[200%] animate-wave">
              <svg
                viewBox="0 0 1000 100"
                className="absolute h-full w-full fill-white/20"
              >
                <path d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 L1000,100 L0,100 Z" />
              </svg>
            </div>
          </div>
          {/* Floating Elements (Now Food-Related) */}
          <div className="absolute top-1/4 left-1/4 animate-bounce">
            <Plate className="w-8 h-8 text-white/40" /> {/* Changed icon */}
          </div>
          <div className="absolute top-1/3 right-1/4 animate-bounce delay-300">
            <Plate className="w-6 h-6 text-white/30" /> {/* Changed icon */}
          </div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Save Food, Help Needy
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our mission to save Food and help needy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/calculator">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-green-50" // Changed color
              >
                Calculate Your Impact
              </Button>
            </Link>
            <Link to="/volunteer">
              <Button
                size="lg"
                variant="outline"
                className="text-green-600 border-white hover:bg-white/10" // Changed color
              >
                Join as Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-900"> {/* Changed color */}
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Plate className="w-12 h-12 text-green-500 mb-4" /> {/* Changed icon and color */}
            <h3 className="text-xl font-semibold mb-2">Food Footprint Calculator</h3> {/* Changed Title */}
            <p className="text-gray-600">
              Assess your personal food wastage and understand your dietary impact.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Users className="w-12 h-12 text-green-500 mb-4" /> {/* Changed color */}
            <h3 className="text-xl font-semibold mb-2">Community Engagement Portal</h3> {/* Changed Title */}
            <p className="text-gray-600">
              Participate in virtual food rescue initiatives and connect with local food banks.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Brain className="w-12 h-12 text-green-500 mb-4" /> {/* Changed color */}
            <h3 className="text-xl font-semibold mb-2">Interactive Quizzes</h3>
            <p className="text-gray-600">
              Test your knowledge about sustainable diets and food storage methods.
            </p>
          </Card>
          <Link to="/food-analysis"> {/* Changed link path */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Camera className="w-12 h-12 text-green-500 mb-4" /> {/* Changed color */}
              <h3 className="text-xl font-semibold mb-2">
                AI Food Image Analysis
              </h3> {/* Changed Title */}
              <p className="text-gray-600">
                Upload images of food items and receive detailed feedback and recommendations.
              </p>
            </Card>
          </Link>

          <Link to="/ai-educator">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4060/4060166.png"
                alt="AI Educator Avatar"
                className="w-12 h-12 rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">AI Educator Avatar</h3>
              <p className="text-gray-600">
                Get personalized educational content from our AI-powered educator about food sustainability.
              </p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;