"use client";

import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Search } from "lucide-react";
import { RootState } from "@/lib/store";
import { ExamCard } from "@/components/ExamCard";
import Link from "next/link";

export default function DashboardPage() {
  const exams = useSelector((state: RootState) => state.exams.exams);

  const [search, setSearch] = useState("");

  const filteredExams = useMemo(() => {
    return exams.filter((exam) =>
      exam.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [exams, search]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <main className="flex-1 px-4 py-8 sm:px-8 lg:px-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-semibold text-slate-700">
            Online Tests
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-[500px]">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by exam title"
                className="w-full rounded-xl border text-black border-violet-300 bg-white px-4 py-3 pr-12 outline-none focus:border-violet-500 focus:ring-1 focus:ring-[#6633FF]"
              />
              <Search
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6633FF]"
                size={18}
              />
            </div>

            <Link
              href={"/create-test"}
              className="rounded-xl bg-[#6633FF] px-6 py-3 font-semibold text-white"
            >
              Create Online Test
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filteredExams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      </main>
    </div>
  );
}
