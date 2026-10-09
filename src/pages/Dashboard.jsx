import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import QuestionCard from "../components/QuestionCard";
import QuestionForm from "../components/QuestionForm";

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [category, setCategory] = useState("all");
  const [questions, setQuestions] = useState(JSON.parse(localStorage.getItem("questions")) || []);

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  const completedCount = questions.filter(
    (q) => q.data.status === "completed",
  ).length;
  const progress = questions.length
    ? Math.round((completedCount / questions.length) * 100)
    : 0;
  const categories = [
    ...new Set(questions.map((q) => q.data.category).filter(Boolean)),
  ];
  const filteredQuestions = useMemo(
    () =>
      questions.filter(({ data }) => {
        const query = searchQuery.trim().toLowerCase();
        return (
          data.title.toLowerCase().includes(query) &&
          (difficulty === "all" ||
            data.difficulty.toLowerCase() === difficulty) &&
          (filter === "all" || data.status.toLowerCase() === filter) &&
          (category === "all" || data.category === category)
        );
      }),
    [questions, searchQuery, difficulty, filter, category],
  );

  const updateStatus = (id, status) =>
    setQuestions((current) =>
      current.map((q) =>
        q.id === id ? { ...q, data: { ...q.data, status } } : q,
      ),
    );

  return (
    <div className="min-h-screen min-w-[320px] bg-[#f3f3ed] text-[#17221d] selection:bg-[#d4f478] selection:text-[#102118]">
      <Navbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="relative isolate flex min-h-[290px] flex-col justify-between gap-5 overflow-hidden rounded-[30px] bg-[#19251f] p-[clamp(28px,5vw,60px)] text-[#f7f8ef] shadow-[0_24px_70px_-45px_rgba(23,34,29,0.8)] before:absolute before:right-[4%] before:-top-[210px] before:-z-10 before:size-[440px] before:rounded-full before:border before:border-[rgba(212,244,120,0.24)] before:content-[''] before:shadow-[0_0_0_35px_rgba(212,244,120,0.035),0_0_0_75px_rgba(212,244,120,0.025),0_0_0_120px_rgba(212,244,120,0.02)] after:absolute after:-bottom-[110px] after:right-[16%] after:-z-10 after:size-[280px] after:rounded-full after:bg-[radial-gradient(circle_at_35%_30%,#d4f478,#8fae47_48%,#526b35_70%)] after:opacity-[0.88] after:blur-[0.2px] after:content-[''] sm:flex-row sm:items-end max-[640px]:min-h-[350px] max-[640px]:items-start max-[640px]:justify-center max-[640px]:rounded-3xl max-[640px]:after:-right-[60px] max-[640px]:after:-bottom-[150px] max-[640px]:after:size-[220px] max-[640px]:after:opacity-[0.45] motion-safe:animate-rise-in">
          <div className="max-w-[620px]">
            <p className="mb-[18px] text-xs font-semibold uppercase tracking-[0.2em] text-[#d4f478]">
              Your preparation, at a glance
            </p>
            <h2 className="max-w-[600px] font-[Manrope] text-[clamp(2.25rem,5vw,4.35rem)] font-semibold leading-[0.99] tracking-[-0.07em]">
              Build your interview confidence.
            </h2>
            <p className="mt-[18px] max-w-[430px] text-sm leading-6 text-[#b7c0b7] sm:text-base">
              A little practice every day adds up. Keep your questions organized
              and see your progress grow.
            </p>
          </div>
          <button
            onClick={() => setOpenModal(true)}
            className="relative z-10 mt-1 inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#d4f478] px-5 py-3 text-sm font-semibold text-[#19251f] transition-[transform,background] duration-200 hover:-translate-y-0.5 hover:bg-[#e1ffa0] focus:outline-none focus:ring-4 focus:ring-indigo-200 sm:mt-0">
            <span aria-hidden="true" className="text-lg leading-none">
              +
            </span>{" "}
            Add a question
          </button>
        </section>

        <section
          className="grid grid-cols-1 gap-[14px] sm:grid-cols-4 motion-safe:animate-rise-in motion-safe:[animation-delay:80ms]"
          aria-label="Practice summary">
          <StatCard
            title="Questions tracked"
            value={questions.length}
            description="In your practice list"
          />
          <StatCard
            title="DSA Questions"
            value={
              questions.filter(
                (question) =>
                  question.data.type === "DSA" &&
                  question.data.status === "completed",
              ).length
            }
            description={
              questions.filter((question) => question.data.type === "DSA")
                ? `${questions.filter((question) => question.data.type === "DSA").length - questions.filter((question) => question.data.type === "DSA" && question.data.status === "completed").length} still to practice`
                : "Your wins will show up here"
            }
          />
          <StatCard
            title="Interview Questions"
            value={
              questions.filter(
                (question) =>
                  question.data.type === "Interview" &&
                  question.data.status === "completed",
              ).length
            }
            description={
              questions.filter((question) => question.data.type === "Interview")
                ? `${questions.filter((question) => question.data.type === "Interview").length - questions.filter((question) => question.data.type === "Interview" && question.data.status === "completed").length} still to complete`
                : "Your wins will show up here"
            }
          />

          <StatCard
            title="Machine Coding Questions"
            value={
              questions.filter(
                (question) =>
                  question.data.type === "Machine Coding" &&
                  question.data.status === "completed",
              ).length
            }
            description={
              questions.filter(
                (question) => question.data.type === "Machine Coding",
              )
                ? `${questions.filter((question) => question.data.type === "Machine Coding").length - questions.filter((question) => question.data.type === "Machine Coding" && question.data.status === "completed").length} still to complete`
                : "Your wins will show up here"
            }
          />
        </section>

        <section
          className="rounded-[22px] border-0 bg-[#e6e9db] p-5 shadow-none sm:p-7 motion-safe:animate-rise-in motion-safe:[animation-delay:140ms]"
          aria-labelledby="progress-heading">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h3 id="progress-heading" className="font-[Manrope] font-semibold tracking-[-0.045em]">
                Your progress
              </h3>
              <p className="mt-1 text-sm text-[#707a6d]">
                Questions marked complete
              </p>
            </div>
            <span className="font-[Manrope] text-2xl font-bold tracking-tight text-[#405a20]">
              {progress}
              <span className="text-base">%</span>
            </span>
          </div>
          <div
            className="h-[7px] overflow-hidden rounded-full bg-[#d1d6c6]"
            role="progressbar"
            aria-label="Overall practice progress"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100">
            <div
              className="h-full rounded-full bg-[#8dac45] transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        <section
          className="flex flex-col gap-4 motion-safe:animate-rise-in motion-safe:[animation-delay:200ms]"
          aria-labelledby="questions-heading">
          <div className="flex flex-col gap-1">
            <h3
              id="questions-heading"
              className="font-[Manrope] text-xl font-bold tracking-[-0.045em]">
              Your questions
            </h3>
            <p className="text-sm text-slate-500">
              Find the next thing to work on.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 rounded-[18px] border border-[#e3e5dc] bg-[#fafaf6] p-4 shadow-none sm:grid-cols-2 lg:grid-cols-4">
            <label className="relative sm:col-span-2 lg:col-span-1">
              <span className="sr-only">Search questions</span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                ⌕
              </span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="search"
                placeholder="Search questions..."
                className="w-full rounded-xl border border-[#e3e5dc] bg-[#f4f5ef] py-2.5 pl-9 pr-3 text-sm text-[#26332a] outline-none transition focus:border-[#9bad72] focus:bg-white focus:ring-4 focus:ring-[#e5edcf]"
              />
            </label>
            <label>
              <span className="sr-only">Filter by category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-[#e3e5dc] bg-[#f4f5ef] px-3 py-2.5 text-sm text-[#26332a] outline-none focus:border-[#9bad72] focus:ring-4 focus:ring-[#e5edcf]">
                <option value="all">All categories</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="sr-only">Filter by difficulty</span>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full rounded-xl border border-[#e3e5dc] bg-[#f4f5ef] px-3 py-2.5 text-sm text-[#26332a] outline-none focus:border-[#9bad72] focus:ring-4 focus:ring-[#e5edcf]">
                <option value="all">All difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>
            <label>
              <span className="sr-only">Filter by status</span>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full rounded-xl border border-[#e3e5dc] bg-[#f4f5ef] px-3 py-2.5 text-sm text-[#26332a] outline-none focus:border-[#9bad72] focus:ring-4 focus:ring-[#e5edcf]">
                <option value="all">All statuses</option>
                <option value="pending">Not started</option>
                <option value="in progress">In progress</option>
                <option value="completed">Completed</option>
              </select>
            </label>
          </div>
          <div className="question-list flex flex-col gap-3">
            {filteredQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                title={question.data.title}
                category={question.data.category}
                difficulty={question.data.difficulty}
                status={question.data.status}
                onComplete={() => updateStatus(question.id, "completed")}
              />
            ))}
            {filteredQuestions.length === 0 && (
              <div className="rounded-[22px] border border-dashed border-[#d2d7c8] bg-[#fafaf6] px-6 py-12 text-center">
                <div
                  className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#edf2e4] text-xl text-[#607a30]"
                  aria-hidden="true">
                  {questions.length ? "⌕" : "+"}
                </div>
                <h4 className="font-semibold text-[#26332a]">
                  {questions.length
                    ? "No questions match these filters"
                    : "Start with one question"}
                </h4>
                <p className="mx-auto mt-1 max-w-sm text-sm text-[#26332a]">
                  {questions.length
                    ? "Try a different search or clear a filter to see your practice list."
                    : "Add a question you want to practice and keep your preparation in one place."}
                </p>
                {questions.length ? (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setCategory("all");
                      setDifficulty("all");
                      setFilter("all");
                    }}
                    className="mt-4 text-sm font-semibold text-[#607a30] hover:text-[#405a20]">
                    Clear filters
                  </button>
                ) : (
                  <button
                    onClick={() => setOpenModal(true)}
                    className="mt-4 rounded-lg bg-[#19251f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#405a20]">
                    Add your first question
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
        {openModal && (
          <QuestionForm
            setOpenModal={setOpenModal}
            setQuestions={setQuestions}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
