import { Exam } from "../slices/exam/exam.type";

export const mockExams: Exam[] = [
  {
    id: "1",
    title: "React Developer Assessment",
    totalCandidates: 45,
    totalSlots: 50,
    questionSets: [],
    questionType: "Multiple Choice",
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 60,
    negativeMarking: true,
    createdAt: new Date().toISOString(),
    employerId: "emp1",
  },
  {
    id: "2",
    title: "Frontend Fundamentals",
    totalCandidates: 32,
    totalSlots: 40,
    questionSets: [],
    questionType: "Mixed",
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 45,
    negativeMarking: false,
    createdAt: new Date().toISOString(),
    employerId: "emp1",
  },
];
