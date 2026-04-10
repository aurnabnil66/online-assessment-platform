import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth/auth.slice";
import { examReducer } from "./slices/exam/exam.slice";
import { candidateExamReducer } from "./slices/candidateExam/candidateExam.slice";

export const rootReducer = combineReducers({
  auth: authReducer,
  exams: examReducer,
  candidateExam: candidateExamReducer,
});
