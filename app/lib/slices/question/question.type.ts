export type QuestionType = "MCQ" | "Checkbox" | "Text";

export interface Option {
  id: string;
  label: string; // "A", "B", "C", "D"
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  examId: string;
  type: QuestionType;
  points: number;
  questionText: string;
  options: Option[]; // empty for Text type
  answerText?: string; // for Text type
}
