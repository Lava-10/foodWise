import { useState } from "react";
import axios from "../lib/axiosInstance";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Image as ImageIcon, Loader } from "lucide-react";
import ReactMarkdown from "react-markdown";

const FoodImageAnalysis = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!imageFile) return;

    setIsLoading(true);
    setShowInfo(false);

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post("/ai/analyze-food-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAnalysisData(response.data.result);
      setShowInfo(true);
    } catch (error) {
      console.error("Error analyzing the image:", error);
      setAnalysisData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-green-800">
          AI Food Image Analyzer
        </h2>

        <div
          className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center transition-colors ${
            dragActive
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-green-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-green-500" />
          <p className="text-gray-600 mb-2">Drag and drop your food image here</p>
          <p className="text-sm text-gray-500 mb-4">or</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer inline-block px-4 py-2 border border-green-500 text-green-500 rounded-lg hover:bg-green-50"
          >
            Select an Image
          </label>
          <Button
            onClick={handleAnalyze}
            className="w-full sm:w-auto mt-4"
            disabled={!imageFile || isLoading}
          >
            {isLoading ? (
              <Loader className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <ImageIcon className="w-4 h-4 mr-2" />
            )}
            {isLoading ? "Analyzing..." : "Analyze Image"}
          </Button>
        </div>

        {isLoading && (
          <div className="mt-8 text-center text-green-800">
            <Loader className="w-8 h-8 mx-auto mb-4 animate-spin" />
            <p>AI is analyzing the image...</p>
          </div>
        )}
        {showInfo && analysisData && (
          <div className="mt-8 bg-green-50 p-6 rounded-lg animate-fade-in">
            {imageFile && (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Uploaded content"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}

            <div className="max-h-96 overflow-y-auto bg-white p-4 rounded-lg border border-gray-300 shadow-md">
              <ReactMarkdown className="prose prose-green text-green-900">
                {analysisData}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {!isLoading && !analysisData && showInfo && (
          <div className="mt-8 text-center text-red-500">
            <p>
              Unable to analyze the image. Please try again with a different
              one.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default FoodImageAnalysis;