
import React from "react";

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeStyle = "";
  let label = "";

  if (score > 70) {
    badgeStyle = "bg-badge-green text-green-600";
    label = "Strong";
  } else if (score > 49) {
    badgeStyle = "bg-badge-yellow text-yellow-600";
    label = "Good Start";
  } else {
    badgeStyle = "bg-badge-red text-red-600";
    label = "Needs Work";
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${badgeStyle}`}>
      <p className="text-sm font-semibold">{label}</p>
    </div>
  );
};

export default ScoreBadge;
