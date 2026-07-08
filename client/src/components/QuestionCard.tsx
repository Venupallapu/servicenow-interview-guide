import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Question, categories, difficulties } from "@/data/questions";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const category = categories.find((c) => c.id === question.category);
  const difficulty = difficulties.find((d) => d.id === question.difficulty);

  const difficultyColors = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800",
    advanced: "bg-red-100 text-red-800"
  };

  const categoryColors: Record<string, string> = {
    blue: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
    orange: "bg-orange-100 text-orange-800",
    red: "bg-red-100 text-red-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    indigo: "bg-indigo-100 text-indigo-800",
    pink: "bg-pink-100 text-pink-800"
  };

  return (
    <div
      className={cn(
        "border border-border rounded-lg overflow-hidden transition-all duration-200",
        "hover:shadow-md hover:border-primary/50 cursor-pointer",
        isExpanded && "shadow-md border-primary/50"
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Question Header */}
      <div className="p-5 bg-background hover:bg-muted/50 transition-colors">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-foreground leading-tight mb-3">
              {question.question}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category && (
                <Badge
                  className={cn(
                    "text-xs font-medium",
                    categoryColors[category.color as keyof typeof categoryColors]
                  )}
                >
                  {category.label}
                </Badge>
              )}
              {difficulty && (
                <Badge
                  className={cn(
                    "text-xs font-medium",
                    difficultyColors[difficulty.id as keyof typeof difficultyColors]
                  )}
                >
                  {difficulty.label}
                </Badge>
              )}
            </div>
          </div>
          <ChevronDown
            className={cn(
              "w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 mt-1",
              isExpanded && "transform rotate-180"
            )}
          />
        </div>
      </div>

      {/* Answer Section */}
      {isExpanded && (
        <div className="border-t border-border bg-muted/30 p-5 animate-in fade-in duration-200">
          <div className="prose prose-sm max-w-none">
            <p className="text-sm text-foreground leading-relaxed mb-4">
              {question.answer}
            </p>

            {question.keyPoints && question.keyPoints.length > 0 && (
              <div className="mt-4">
                <h4 className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">
                  Key Points
                </h4>
                <ul className="space-y-1">
                  {question.keyPoints.map((point, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {question.relatedTopics && question.relatedTopics.length > 0 && (
              <div className="mt-4">
                <h4 className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">
                  Related Topics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {question.relatedTopics.map((topic, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="text-xs font-medium"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
