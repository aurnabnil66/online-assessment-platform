import { Clock3, FileText, Users } from "lucide-react";

export const ExamCard = ({ exam }: { exam: any }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-700">{exam.title}</h3>

      <div className="mt-6 grid grid-cols-1 gap-4 text-slate-600 sm:grid-cols-3">
        <div className="flex items-center gap-2">
          <Users size={18} />
          <span>Candidates: {exam.totalCandidates}</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText size={18} />
          <span>Question Set: {exam.questionSets.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock3 size={18} />
          <span>Exam Slots: {exam.totalSlots}</span>
        </div>
      </div>

      <button className="mt-6 rounded-xl border border-[#6633FF] px-6 py-3 text-[#6633FF]">
        View Candidates
      </button>
    </div>
  );
};
