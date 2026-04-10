import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CandidateExam,
  CandidateExamState,
  Answer,
} from "@/lib/slices/candidateExam/candidateExam.type";

const initialState: CandidateExamState = {
  candidateExams: [],
  activeExam: null,
};

const candidateExamSlice = createSlice({
  name: "candidateExams",
  initialState,
  reducers: {
    startExam: (
      state,
      action: PayloadAction<{ examId: string; candidateId: string }>,
    ) => {
      const existing = state.candidateExams.find(
        (ce) =>
          ce.examId === action.payload.examId &&
          ce.candidateId === action.payload.candidateId,
      );

      if (!existing) {
        const newCandidateExam: CandidateExam = {
          id: Date.now().toString(),
          examId: action.payload.examId,
          candidateId: action.payload.candidateId,
          startTime: new Date().toISOString(),
          status: "IN_PROGRESS",
          answers: [],
          tabSwitchCount: 0,
        };
        state.candidateExams.push(newCandidateExam);
        state.activeExam = newCandidateExam;
      } else {
        state.activeExam = existing;
      }
    },
    submitAnswer: (state, action: PayloadAction<Answer>) => {
      if (state.activeExam) {
        const existingIndex = state.activeExam.answers.findIndex(
          (a) => a.questionId === action.payload.questionId,
        );
        if (existingIndex !== -1) {
          state.activeExam.answers[existingIndex] = action.payload;
        } else {
          state.activeExam.answers.push(action.payload);
        }

        // Update in candidateExams list
        const examIndex = state.candidateExams.findIndex(
          (ce) => ce.id === state.activeExam?.id,
        );
        if (examIndex !== -1) {
          state.candidateExams[examIndex] = state.activeExam;
        }
      }
    },
    completeExam: (
      state,
      action: PayloadAction<{ examId: string; score?: number }>,
    ) => {
      if (
        state.activeExam &&
        state.activeExam.examId === action.payload.examId
      ) {
        state.activeExam.status = "COMPLETED";
        state.activeExam.endTime = new Date().toISOString();
        state.activeExam.score = action.payload.score;

        const examIndex = state.candidateExams.findIndex(
          (ce) => ce.id === state.activeExam?.id,
        );
        if (examIndex !== -1) {
          state.candidateExams[examIndex] = state.activeExam;
        }
        state.activeExam = null;
      }
    },
    incrementTabSwitch: (state) => {
      if (state.activeExam) {
        state.activeExam.tabSwitchCount++;
        const examIndex = state.candidateExams.findIndex(
          (ce) => ce.id === state.activeExam?.id,
        );
        if (examIndex !== -1) {
          state.candidateExams[examIndex] = state.activeExam;
        }
      }
    },
  },
});

export const { startExam, submitAnswer, completeExam, incrementTabSwitch } =
  candidateExamSlice.actions;

export const candidateExamReducer = candidateExamSlice.reducer;
