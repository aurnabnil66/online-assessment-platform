"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { removeQuestion } from "@/lib/slices/question/question.slice";
import { Question } from "@/lib/slices/question/question.type";
import { RootState } from "@/lib/store";
import SteppedProgress from "@/components/SteppedProgress";
import QuestionModal from "@/components/QuestionModal";
import { CorrectBadge } from "@/icons/icons";

// QuestionCard component
function QuestionCard({
  question,
  index,
  onEdit,
  onRemove,
}: {
  question: Question;
  index: number;
  onEdit: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-2xl bg-white px-7 py-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-800">
          Question {index + 1}
        </span>
        <div className="flex items-center gap-2">
          <span className="rounded border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs text-gray-500">
            {question.type === "MCQ"
              ? "Multiple Choice"
              : question.type === "Checkbox"
                ? "Checkbox"
                : "Text"}
          </span>
          <span className="rounded border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs text-gray-500">
            {question.points} pt
          </span>
        </div>
      </div>

      {/* Question text - render HTML */}
      <div
        className="prose prose-sm mb-4 max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: question.questionText }}
      />

      {/* Options */}
      {question.type !== "Text" && (
        <div className="mb-5 space-y-2">
          {question.options.map((opt) => (
            <div
              key={opt.id}
              className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-sm ${
                opt.isCorrect
                  ? "bg-gray-100 font-medium text-gray-800"
                  : "text-gray-600"
              }`}
            >
              <div className="flex items-center gap-3">
                {question.type === "MCQ" ? (
                  <span className="text-gray-400">{opt.label}.</span>
                ) : (
                  <span className="text-gray-400">{opt.label}.</span>
                )}
                <div dangerouslySetInnerHTML={{ __html: opt.text }} />
              </div>
              {opt.isCorrect && <CorrectBadge />}
            </div>
          ))}
        </div>
      )}

      {/* Text answer preview */}
      {question.type === "Text" && question.answerText && (
        <div
          className="mb-5 text-sm leading-relaxed text-gray-600"
          dangerouslySetInnerHTML={{ __html: question.answerText }}
        />
      )}

      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <button
          type="button"
          onClick={onEdit}
          className="text-sm text-indigo-600 transition hover:text-indigo-800"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="text-sm text-red-500 transition hover:text-red-700"
        >
          Remove From Exam
        </button>
      </div>
    </div>
  );
}

// Main Page
export default function QuestionsPage() {
  const params = useParams();

  const examId = params?.examId ?? "demo-exam";

  const dispatch = useDispatch();

  const questions = useSelector((state: RootState) =>
    state.questions.questions.filter((q) => q.examId === examId),
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | undefined>(
    undefined,
  );

  const handleAddQuestion = () => {
    setEditingQuestion(undefined);
    setIsModalOpen(true);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setIsModalOpen(true);
  };

  const handleRemoveQuestion = (id: string) => {
    dispatch(removeQuestion(id));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingQuestion(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <SteppedProgress step={2} />

      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="space-y-4">
          {questions.map((q, idx) => (
            <QuestionCard
              key={q.id}
              question={q}
              index={idx}
              onEdit={() => handleEditQuestion(q)}
              onRemove={() => handleRemoveQuestion(q.id)}
            />
          ))}

          <button
            type="button"
            onClick={handleAddQuestion}
            className="w-full rounded-2xl bg-indigo-600 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Question
          </button>
        </div>
      </main>

      <QuestionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        examId={examId.toString()}
        editingQuestion={editingQuestion}
      />
    </div>
  );
}
