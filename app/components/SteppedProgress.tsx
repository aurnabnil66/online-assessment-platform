"use client";

import { useRouter } from "next/navigation";

interface Props {
  /** 1 = Basic Info active, 2 = Questions Sets active (Basic Info complete) */
  step?: 1 | 2;
}

export default function SteppedProgress({ step = 1 }: Props) {
  const router = useRouter();

  const step1Complete = step >= 2;
  const step2Active = step === 2;

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-4xl px-6 py-5">
        {/* Title */}
        <h1 className="mb-4 text-lg font-bold text-gray-800">
          Manage Online Test
        </h1>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Step 1 */}
            <div className="flex items-center gap-2">
              {step1Complete ? (
                /* Completed checkmark circle */
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
              ) : (
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                  1
                </span>
              )}
              <span
                className={`text-sm font-semibold ${
                  step === 1 ? "text-indigo-600" : "text-gray-500"
                }`}
              >
                Basic Info
              </span>
            </div>

            {/* Connector */}
            <div
              className={`h-px w-16 ${step1Complete ? "bg-indigo-400" : "bg-gray-300"}`}
            />

            {/* Step 2 */}
            <div className="flex items-center gap-2">
              {step2Active ? (
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
              ) : (
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-white text-xs font-bold text-gray-400">
                  2
                </span>
              )}
              <span
                className={`text-sm font-semibold ${
                  step2Active ? "text-indigo-600" : "text-gray-400"
                }`}
              >
                Questions Sets
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
