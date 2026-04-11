"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import RichTextEditor from "./RichTextEditor";
import {
  addQuestion,
  updateQuestion,
} from "@/lib/slices/question/question.slice";
import {
  Question,
  QuestionType,
  Option,
} from "@/lib/slices/question/question.type";

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  examId: string;
  editingQuestion?: Question;
  questionNumber?: number;
}

const LABELS = ["A", "B", "C", "D", "E", "F"];

const TrashIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
  </svg>
);

const ChevronIcon = () => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function QuestionModal({
  isOpen,
  onClose,
  examId,
  editingQuestion,
  questionNumber = 1,
}: QuestionModalProps) {
  const dispatch = useDispatch();
  const isEditing = !!editingQuestion;

  const [questionType, setQuestionType] = useState<QuestionType>(
    editingQuestion?.type || "MCQ",
  );
  const [points, setPoints] = useState(editingQuestion?.points || 1);
  const [questionText, setQuestionText] = useState(
    editingQuestion?.questionText || "",
  );
  const [options, setOptions] = useState<Option[]>(() => {
    if (editingQuestion?.options?.length) return editingQuestion.options;
    return LABELS.slice(0, 3).map((label) => ({
      id: crypto.randomUUID(),
      label,
      text: "",
      isCorrect: false,
    }));
  });
  const [answerText, setAnswerText] = useState(
    editingQuestion?.answerText || "",
  );

  const handleAddOption = () => {
    if (options.length < LABELS.length) {
      setOptions([
        ...options,
        {
          id: crypto.randomUUID(),
          label: LABELS[options.length],
          text: "",
          isCorrect: false,
        },
      ]);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleOptionChange = (index: number, text: string) => {
    const newOptions = [...options];
    newOptions[index].text = text;
    setOptions(newOptions);
  };

  const handleSetCorrect = (index: number) => {
    const newOptions = [...options];
    if (questionType === "MCQ") {
      newOptions.forEach((opt, i) => (opt.isCorrect = i === index));
    } else {
      newOptions[index].isCorrect = !newOptions[index].isCorrect;
    }
    setOptions(newOptions);
  };

  const validate = () => {
    if (!questionText.trim()) {
      alert("Please enter question text");
      return false;
    }
    if (questionType !== "Text") {
      if (options.some((opt) => !opt.text.trim())) {
        alert("Please fill in all option texts");
        return false;
      }
      if (!options.some((opt) => opt.isCorrect)) {
        alert("Please select at least one correct answer");
        return false;
      }
    }
    return true;
  };

  const buildQuestion = (id?: string): Question => ({
    id: id || editingQuestion?.id || crypto.randomUUID(),
    examId,
    type: questionType,
    points,
    questionText,
    options: questionType !== "Text" ? options : [],
    answerText: questionType === "Text" ? answerText : "",
  });

  const handleSubmit = () => {
    if (!validate()) return;
    if (isEditing) dispatch(updateQuestion(buildQuestion()));
    else dispatch(addQuestion(buildQuestion()));
    onClose();
  };

  const handleSaveAndAddMore = () => {
    if (!validate()) return;
    dispatch(addQuestion(buildQuestion(crypto.randomUUID())));
    resetForm();
  };

  const resetForm = () => {
    setQuestionType("MCQ");
    setPoints(1);
    setQuestionText("");
    setOptions(
      LABELS.slice(0, 3).map((label) => ({
        id: crypto.randomUUID(),
        label,
        text: "",
        isCorrect: false,
      })),
    );
    setAnswerText("");
  };

  if (!isOpen) return null;

  const isTextType = questionType === "Text";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 py-8 overflow-y-auto">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
        {/* ── Question Header ── */}
        <div className="flex items-center gap-3 px-6 pt-5 pb-4 border-b border-gray-100">
          {/* Numbered circle */}
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-400 text-sm font-semibold text-gray-600">
            {questionNumber}
          </div>

          <span className="text-base font-semibold text-gray-800">
            Question {questionNumber}
          </span>

          <div className="flex-1" />

          {/* Score */}
          <span className="text-sm font-medium text-gray-600 mr-1">Score:</span>
          <input
            type="number"
            min={1}
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            className="w-14 rounded-lg border border-gray-300 px-2 py-1.5 text-sm text-center font-medium text-gray-800 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
          />

          {/* Type dropdown */}
          <div className="relative ml-2">
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value as QuestionType)}
              className="appearance-none rounded-lg border border-gray-300 bg-white py-1.5 pl-3 pr-8 text-sm font-medium text-gray-700 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 cursor-pointer"
            >
              <option value="MCQ">Radio</option>
              <option value="Checkbox">Checkbox</option>
              <option value="Text">Text</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
              <ChevronIcon />
            </div>
          </div>

          {/* Delete button */}
          <button
            onClick={onClose}
            className="ml-2 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <TrashIcon />
          </button>
        </div>

        {/* Question Rich Text Editor */}
        <div className="px-6 pt-5">
          <div className="rounded-xl border border-gray-200 overflow-hidden bg-gray-50">
            <RichTextEditor
              value={questionText}
              onChange={setQuestionText}
              placeholder="Enter your question here..."
            />
          </div>
        </div>

        {/* MCQ / Checkbox Options */}
        {!isTextType && (
          <div className="px-6 pt-5 pb-2 space-y-5">
            {options.map((option, idx) => (
              <div key={option.id}>
                {/* Option header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    {/* Letter circle */}
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-400 text-sm font-semibold text-gray-600">
                      {option.label}
                    </div>

                    {/* Correct answer control */}
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      {questionType === "MCQ" ? (
                        <input
                          type="radio"
                          name={`correct-answer-${examId}`}
                          checked={option.isCorrect}
                          onChange={() => handleSetCorrect(idx)}
                          className="h-[17px] w-[17px] accent-violet-600 cursor-pointer"
                        />
                      ) : (
                        <input
                          type="checkbox"
                          checked={option.isCorrect}
                          onChange={() => handleSetCorrect(idx)}
                          className="h-[17px] w-[17px] rounded accent-violet-600 cursor-pointer"
                        />
                      )}
                      <span className="text-sm text-gray-500">
                        Set as correct answer
                      </span>
                    </label>
                  </div>

                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(idx)}
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500 transition-colors"
                    >
                      <TrashIcon />
                    </button>
                  )}
                </div>

                {/* Option editor */}
                <div className="rounded-xl border border-gray-200 overflow-hidden bg-gray-50">
                  <RichTextEditor
                    value={option.text}
                    onChange={(text) => handleOptionChange(idx, text)}
                    placeholder={`Option ${option.label} text`}
                    minHeight="80px"
                  />
                </div>
              </div>
            ))}

            {/* Add another option */}
            {options.length < LABELS.length && (
              <button
                type="button"
                onClick={handleAddOption}
                className="flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-800 transition-colors"
              >
                <span className="text-base font-bold">+</span>
                <span>Another options</span>
              </button>
            )}
          </div>
        )}

        {/*Text type: single answer editor (option A row)*/}
        {isTextType && (
          <div className="px-6 pt-5 pb-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-gray-400 text-sm font-semibold text-gray-600">
                A
              </div>
              <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500 transition-colors">
                <TrashIcon />
              </button>
            </div>
            <div className="rounded-xl border border-gray-200 overflow-hidden bg-gray-50">
              <RichTextEditor
                value={answerText}
                onChange={setAnswerText}
                placeholder="Enter a sample answer as reference..."
                minHeight="120px"
              />
            </div>
          </div>
        )}

        {/* ── Footer ── */}
        <div className="flex items-center justify-end gap-3 px-6 py-5 mt-4 border-t border-gray-100">
          <button
            onClick={isEditing ? onClose : handleSubmit}
            className="rounded-lg border border-violet-600 px-8 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-50 transition-colors"
          >
            {isEditing ? "Cancel" : "Save"}
          </button>

          {isEditing ? (
            <button
              onClick={handleSubmit}
              className="rounded-lg bg-[#6633FF] px-8 py-2 text-sm text-white hover:bg-violet-700 transition-colors shadow-sm"
            >
              Update Question
            </button>
          ) : (
            <button
              onClick={handleSaveAndAddMore}
              className="rounded-lg bg-[#6633FF] px-8 py-2 text-sm text-white hover:bg-violet-700 transition-colors shadow-sm"
            >
              Save &amp; Add More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
