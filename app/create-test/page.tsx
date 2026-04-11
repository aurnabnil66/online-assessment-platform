"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addExam } from "@/lib/slices/exam/exam.slice";
import { RootState } from "@/lib/store";
import SteppedProgress from "@/components/SteppedProgress";
import { ChevronDownIcon } from "@/icons/icons";

interface ExamData {
  id: string; // Add id to track the created exam
  title: string;
  totalCandidates: string;
  totalSlots: string;
  totalQuestionSet: string;
  questionType: string;
  startTime: string;
  endTime: string;
  duration: string;
}

export default function CreateTestPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const authUser = useSelector((state: RootState) => state.auth.user);

  const [isViewMode, setIsViewMode] = useState(false);
  const [savedData, setSavedData] = useState<ExamData | null>(null);
  const [savedExamId, setSavedExamId] = useState<string | null>(null); // Store the exam ID

  const [title, setTitle] = useState("");
  const [totalCandidates, setTotalCandidates] = useState("");
  const [totalSlots, setTotalSlots] = useState("");
  const [totalQuestionSet, setTotalQuestionSet] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("");

  const computeDuration = (start: string, end: string) => {
    if (start && end) {
      const [sh, sm] = start.split(":").map(Number);
      const [eh, em] = end.split(":").map(Number);
      const diff = eh * 60 + em - (sh * 60 + sm);
      setDuration(diff > 0 ? `${diff}` : "");
    } else {
      setDuration("");
    }
  };

  const handleStartTime = (val: string) => {
    setStartTime(val);
    computeDuration(val, endTime);
  };

  const handleEndTime = (val: string) => {
    setEndTime(val);
    computeDuration(startTime, val);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const examId = crypto.randomUUID(); // Generate ID first

    const data: ExamData = {
      id: examId,
      title,
      totalCandidates,
      totalSlots,
      totalQuestionSet,
      questionType,
      startTime,
      endTime,
      duration,
    };

    setSavedData(data);
    setSavedExamId(examId); // Store the exam ID
    setIsViewMode(true);

    dispatch(
      addExam({
        id: examId,
        title,
        totalCandidates: Number(totalCandidates),
        totalSlots: Number(totalSlots),
        questionSets: [],
        questionType: questionType || "Multiple Choice",
        startTime: startTime || new Date().toISOString(),
        endTime: endTime || new Date().toISOString(),
        duration: Number(duration) || 60,
        negativeMarking: false,
        createdAt: new Date().toISOString(),
        employerId: authUser?.id || "",
      }),
    );
  };

  const handleEdit = () => {
    setIsViewMode(false);
  };

  // shared styles
  const inputCls =
    "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  const selectCls =
    "w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  // label and value pair
  const InfoField = ({ label, value }: { label: string; value: string }) => (
    <div>
      <p className="mb-1 text-xs font-medium text-gray-400">{label}</p>
      <p className="text-sm font-semibold text-gray-800">{value || "—"}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <SteppedProgress />

      <main className="mx-auto max-w-4xl px-6 py-10">
        {isViewMode && savedData ? (
          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              {/* Header row */}
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">
                  Basic Information
                </h2>
                <button
                  type="button"
                  onClick={handleEdit}
                  className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H7v-3.414a2 2 0 01.586-1.414z"
                    />
                  </svg>
                  Edit
                </button>
              </div>

              {/* Divider line under title */}
              <div className="mb-6">
                <p className="mb-1 text-xs font-medium text-gray-400">
                  Online Test Title
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  {savedData.title}
                </p>
              </div>

              {/* 4-column stats */}
              <div className="mb-6 grid grid-cols-2 gap-y-5 md:grid-cols-4">
                <InfoField
                  label="Total Candidates"
                  value={Number(savedData.totalCandidates).toLocaleString()}
                />
                <InfoField label="Total Slots" value={savedData.totalSlots} />
                <InfoField
                  label="Total Question Set"
                  value={savedData.totalQuestionSet}
                />
                <InfoField
                  label="Duration Per Slots (Minutes)"
                  value={savedData.duration}
                />
              </div>

              {/* Divider */}
              <div className="mb-6 border-t border-gray-100" />

              {/* Question Type */}
              <InfoField
                label="Question Type"
                value={
                  savedData.questionType === "Multiple Choice"
                    ? "MCQ"
                    : savedData.questionType
                }
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="rounded-xl border border-gray-300 bg-white px-10 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => router.push(`/exam/${savedExamId}/questions`)}
                className="rounded-xl bg-indigo-600 px-10 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save &amp; Continue
              </button>
            </div>
          </div>
        ) : (
          /* ══════════════════════ EDIT / CREATE MODE ══════════════════════ */
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="mb-8 text-xl font-bold text-gray-800">
              Basic Information
            </h2>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Online Test Title */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Online Test Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter online test title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className={inputCls}
                />
              </div>

              {/* Total Candidates + Total Slots */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Total Candidates <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter total candidates"
                    value={totalCandidates}
                    onChange={(e) => setTotalCandidates(e.target.value)}
                    required
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Total Slots <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={totalSlots}
                      onChange={(e) => setTotalSlots(e.target.value)}
                      required
                      className={selectCls}
                    >
                      <option value="" disabled>
                        Select total shots
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                    </select>
                    <ChevronDownIcon />
                  </div>
                </div>
              </div>

              {/* Total Question Set + Question Type */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Total Question Set <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={totalQuestionSet}
                      onChange={(e) => setTotalQuestionSet(e.target.value)}
                      required
                      className={selectCls}
                    >
                      <option value="" disabled>
                        Select total question set
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                    <ChevronDownIcon />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Question Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={questionType}
                      onChange={(e) => setQuestionType(e.target.value)}
                      required
                      className={selectCls}
                    >
                      <option value="" disabled>
                        Select question type
                      </option>
                      <option value="Multiple Choice">Multiple Choice</option>
                      <option value="True/False">True/False</option>
                      <option value="Short Answer">Short Answer</option>
                    </select>
                    <ChevronDownIcon />
                  </div>
                </div>
              </div>

              {/* Start Time + End Time + Duration */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => handleStartTime(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => handleEndTime(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Duration
                  </label>
                  <input
                    type="text"
                    placeholder="Duration Time"
                    value={duration ? `${duration} min` : ""}
                    readOnly
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-500 placeholder-gray-400 outline-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="rounded-xl border border-gray-300 bg-white px-10 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-10 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save &amp; Continue
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
