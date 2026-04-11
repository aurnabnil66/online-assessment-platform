import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Question } from "./question.type";

interface QuestionState {
  questions: Question[];
}

const initialState: QuestionState = {
  questions: [],
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    addQuestion(state, action: PayloadAction<Question>) {
      state.questions.push(action.payload);
    },
    updateQuestion(state, action: PayloadAction<Question>) {
      const idx = state.questions.findIndex((q) => q.id === action.payload.id);
      if (idx !== -1) state.questions[idx] = action.payload;
    },
    removeQuestion(state, action: PayloadAction<string>) {
      state.questions = state.questions.filter((q) => q.id !== action.payload);
    },
    clearExamQuestions(state, action: PayloadAction<string>) {
      state.questions = state.questions.filter(
        (q) => q.examId !== action.payload,
      );
    },
  },
});

export const {
  addQuestion,
  updateQuestion,
  removeQuestion,
  clearExamQuestions,
} = questionSlice.actions;

export const questionReducer = questionSlice.reducer;
