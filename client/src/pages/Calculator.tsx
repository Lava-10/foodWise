import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Calculator = () => {
  const [cookingWaste, setCookingWaste] = useState("");
  const [plateWaste, setPlateWaste] = useState("");
  const [expiredFood, setExpiredFood] = useState("");
  const [showTips, setShowTips] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTips(true);
  };

  const data = [
    {
      name: 'Cooking Waste',
      quantity: Number(cookingWaste) || 0,
    },
    {
      name: 'Plate Waste',
      quantity: Number(plateWaste) || 0,
    },
    {
      name: 'Expired Food',
      quantity: Number(expiredFood) || 0,
    },
  ];

  const foodSavingTips = [
    "Plan meals to avoid unnecessary cooking waste",
    "Store leftovers properly and consume within a few days",
    "Check expiration dates regularly and consume items nearing expiry first",
    "Practice portion control to reduce plate waste",
    "Compost food scraps instead of discarding them",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-green-600">Food Waste Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cookingWaste">Daily cooking waste (grams)</Label>
              <Input
                id="cookingWaste"
                type="number"
                value={cookingWaste}
                onChange={(e) => setCookingWaste(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plateWaste">Daily plate waste (grams)</Label>
              <Input
                id="plateWaste"
                type="number"
                value={plateWaste}
                onChange={(e) => setPlateWaste(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiredFood">Daily expired food discarded (grams)</Label>
              <Input
                id="expiredFood"
                type="number"
                value={expiredFood}
                onChange={(e) => setExpiredFood(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Get Tips
            </Button>
          </form>

          {showTips && (
            <div className="mt-8 space-y-8">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Grams', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="quantity" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-600">Food Saving Tips:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {foodSavingTips.map((tip, index) => (
                    <li key={index} className="text-gray-600">{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Calculator;
