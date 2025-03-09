import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Avatar3 from "@/components/ElevenLab_Simli/Avatar3";

const AiEducator = () => {
  const [currentTip, setCurrentTip] = useState(0);

  const foodTips = [
    {
      title: "Plan Your Meals",
      content: "Plan your meals for the week to buy only what you need, reducing impulse buys and food waste.",
    },
    {
      title: "Proper Food Storage",
      content: "Store fruits and vegetables properly to keep them fresh longer. Use airtight containers and understand which foods should be refrigerated.",
    },
    {
      title: "Love Your Leftovers",
      content: "Get creative with leftovers! Transform them into new meals or freeze them for later use.",
    },
    {
      title: "Understand 'Best By' Dates",
      content: "Learn the difference between 'best by' and 'use by' dates. Many foods are still safe to eat after their 'best by' date.",
    },
    {
      title: "Compost Food Scraps",
      content: "Compost fruit and vegetable peels, coffee grounds, and other food scraps to enrich your garden soil and reduce landfill waste.",
    },
    {
      title: "First In, First Out (FIFO)",
      content: "Organize your pantry and refrigerator using the FIFO method. Place newer items in the back and older items in the front to use them before they spoil.",
    },
    {
      title: "Portion Control",
      content: "Serve appropriate portion sizes to avoid overeating and wasting food. Use smaller plates to help manage portions.",
    },
    {
      title: "Shop Your Fridge First",
      content: "Before grocery shopping, check your refrigerator and pantry to see what you already have. Plan meals around existing ingredients.",
    },
  ];

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % waterTips.length);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://saasaitools.com/wp-content/uploads/2023/12/gliglish-avatar-brunette-square-new-indigo.png" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-ocean-800">FoodTeach</h2>
            <p className="text-ocean-600">Your AI Food Conservation Guide</p>
          </div>
        </div>

        {/* Avatar3 Component Displayed Here */}
        <div className="mb-8 bg-blue-300">
          <Avatar3 />
        </div>

        <Card className="p-6 mb-8 bg-gradient-to-br from-ocean-50 to-white">
          <h3 className="text-xl font-semibold mb-4 text-ocean-800">{waterTips[currentTip].title}</h3>
          <p className="text-ocean-700 mb-6">{waterTips[currentTip].content}</p>
          <Button onClick={nextTip} className="w-full sm:w-auto">
            Next Tip
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AiEducator;
