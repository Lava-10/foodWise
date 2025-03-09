import { useState } from \"react\";
import { Badge } from \"@/components/ui/badge\";
import { Button } from \"@/components/ui/button\";
import { Card } from \"@/components/ui/card\";
import { useToast } from \"@/hooks/use-toast\";

const quizQuestions = [
  {
    question: \"What percentage of food produced globally is wasted?\",
    options: [\"10%\", \"20%\", \"30%\", \"40%\"],
    correct: \"30%\"
  },
  {
    question: \"Which sector contributes most to food waste globally?\",
    options: [\"Retail\", \"Households\", \"Restaurants\", \"Agriculture\"],
    correct: \"Households\"
  },
  {
    question: \"What's the optimal temperature for refrigerating most fresh foods?\",
    options: [\"-1°C\", \"0-4°C\", \"5-8°C\", \"9-12°C\"],
    correct: \"0-4°C\"
  },
  {
    question: \"Which method is best for preserving leftover food?\",
    options: [\"Freezing\", \"Leaving at room temperature\", \"Refrigeration\", \"Microwaving\"],
    correct: \"Freezing\"
  },
  {
    question: \"What practice reduces food waste effectively?\",
    options: [\"Cooking large portions\", \"Frequent grocery shopping\", \"Meal planning\", \"Eating out often\"],
    correct: \"Meal planning\"
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleAnswer = (answer: string) => {
    if (answer === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
      toast({
        title: \"Correct!\",
        description: \"Great job! Keep going!\",
        variant: \"default\",
      });
    } else {
      toast({
        title: \"Incorrect\",
        description: `The correct answer was ${quizQuestions[currentQuestion].correct}`,
        variant: \"destructive\",
      });
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const getBadge = () => {
    if (score === quizQuestions.length) return \"Food Hero\";
    if (score >= quizQuestions.length * 0.8) return \"Waste Warrior\";
    if (score >= quizQuestions.length * 0.6) return \"Sustainability Advocate\";
    return \"Food Saver\";
  };

  if (showResults) {
    return (
      <div className=\"container mx-auto px-4 py-8\">
        <Card className=\"p-6 text-center\">
          <h2 className=\"text-2xl font-bold mb-4\">Quiz Complete!</h2>
          <p className=\"text-xl mb-4\">Your score: {score}/{quizQuestions.length}</p>
          <Badge className=\"text-lg p-2 bg-green-500\">{getBadge()}</Badge>
        </Card>
      </div>
    );
  }

  return (
    <div className=\"container mx-auto px-4 py-8\">
      <Card className=\"p-6\">
        <h2 className=\"text-2xl font-bold mb-6\">Food Sustainability Quiz</h2>
        <p className=\"mb-8\">Question {currentQuestion + 1} of {quizQuestions.length}</p>
        <h3 className=\"text-xl mb-4\">{quizQuestions[currentQuestion].question}</h3>
        <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
          {quizQuestions[currentQuestion].options.map((option) => (
            <Button
              key={option}
              onClick={() => handleAnswer(option)}
              className=\"p-4 text-lg\"
              variant=\"outline\"
            >
              {option}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Quiz;