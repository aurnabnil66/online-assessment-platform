export interface CandidateExam {
  id: string;
  examId: string;
  candidateId: string;
  startTime?: string;
  endTime?: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  answers: Answer[];
  score?: number;
  tabSwitchCount: number;
}

export interface Answer {
  questionId: string;
  answer: string | string[];
  timestamp: string;
}

export interface CandidateExamState {
  candidateExams: CandidateExam[];
  activeExam: CandidateExam | null;
}
