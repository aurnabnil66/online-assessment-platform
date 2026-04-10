import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Exam, ExamState } from "@/lib/slices/exam/exam.type";
import { mockExams } from "@/lib/utils/mockData";

const initialState: ExamState = {
  exams: [],
  loading: false,
};

const examSlice = createSlice({
  name: "exams",
  initialState: {
    ...initialState,
    exams: mockExams, // mock data for initial demonstration
  },
  reducers: {
    addExam: (state, action: PayloadAction<Exam>) => {
      state.exams.push(action.payload);
    },
    updateExam: (state, action: PayloadAction<Exam>) => {
      const index = state.exams.findIndex((e) => e.id === action.payload.id);

      if (index !== -1) {
        state.exams[index] = action.payload;
      }
    },
    deleteExam: (state, action: PayloadAction<string>) => {
      state.exams = state.exams.filter((e) => e.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { addExam, updateExam, deleteExam, setLoading } =
  examSlice.actions;

export const examReducer = examSlice.reducer;
