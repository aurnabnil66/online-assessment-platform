export interface Question {
  id: string;
  title: string;
  type: "checkbox" | "radio" | "text";
  options?: string[];
  correctAnswer?: string | string[];
}

export interface QuestionSet {
  id: string;
  title: string;
  questions: Question[];
}

export interface Exam {
  id: string;
  title: string;
  totalCandidates: number;
  totalSlots: number;
  questionSets: QuestionSet[];
  questionType: string;
  startTime: string;
  endTime: string;
  duration: number;
  negativeMarking: boolean;
  createdAt: string;
  employerId: string;
}

export interface ExamState {
  exams: Exam[];
  loading: boolean;
}
