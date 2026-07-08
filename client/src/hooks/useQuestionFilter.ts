import { useMemo } from "react";
import { Question } from "@/data/questions";

export function useQuestionFilter(
  questions: Question[],
  searchTerm: string,
  selectedCategory: string | null,
  selectedDifficulty: string | null
) {
  return useMemo(() => {
    return questions.filter((question) => {
      const matchesSearch =
        searchTerm === "" ||
        question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (question.keyPoints?.some((point) =>
          point.toLowerCase().includes(searchTerm.toLowerCase())
        ) ?? false);

      const matchesCategory =
        selectedCategory === null || question.category === selectedCategory;

      const matchesDifficulty =
        selectedDifficulty === null || question.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [questions, searchTerm, selectedCategory, selectedDifficulty]);
}
