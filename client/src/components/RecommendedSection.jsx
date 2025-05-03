import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "./ui/Card";

const RecommendedSection = ({ questionCount = 3 }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`/api/recommendations?count=${questionCount}`);
        const data = await response.json();
        setRecommendations(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load recommendations.");
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [questionCount]);

  return (
    <Card className="mb-6">
      <h3 className="text-xl font-semibold mb-4 dark:text-gray-200">Recommended for you</h3>
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="loader"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 dark:text-red-400">{error}</div>
      ) : (
        <div className="space-y-4">
          {recommendations.map((question) => (
            <div 
              key={question._id} 
              className="p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              onClick={() => navigate(`/questions/${question._id}`)}
            >
              <h4 className="font-medium dark:text-gray-200">{question.title}</h4>
              <div className="flex text-sm text-gray-600 dark:text-gray-400 mt-2">
                <span className="mr-4">{question.tags.slice(0, 3).join(", ")}</span>
                <span>{new Date(question.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

RecommendedSection.propTypes = {
  questionCount: PropTypes.number,
};

export default RecommendedSection;