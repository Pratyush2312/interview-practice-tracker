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
    <div className="dashboard-page min-h-screen bg-[#f7f8fc] text-slate-900">
      <Navbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="hero-panel flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[.18em] text-indigo-600">
              Your preparation, at a glance
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Build your interview confidence.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              A little practice every day adds up. Keep your questions organized
              and see your progress grow.
            </p>
          </div>
          <button
            onClick={() => setOpenModal(true)}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-indigo-200 hover:scale-95 ease-in">
            <span aria-hidden="true" className="text-lg leading-none">
              +
            </span>{" "}
            Add a question
          </button>
        </section>

        <section
          className="stats-grid grid grid-cols-1 gap-4 sm:grid-cols-4"
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
          className="progress-panel rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7"
          aria-labelledby="progress-heading">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h3 id="progress-heading" className="font-semibold">
                Your progress
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Questions marked complete
              </p>
            </div>
            <span className="text-2xl font-bold tracking-tight text-black">
              {progress}
              <span className="text-base">%</span>
            </span>
          </div>
          <div
            className="h-2.5 overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-label="Overall practice progress"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100">
            <div
              className="h-full rounded-full bg-green-600 transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        <section
          className="question-section flex flex-col gap-4"
          aria-labelledby="questions-heading">
          <div className="flex flex-col gap-1">
            <h3
              id="questions-heading"
              className="text-xl font-bold tracking-tight">
              Your questions
            </h3>
            <p className="text-sm text-slate-500">
              Find the next thing to work on.
            </p>
          </div>
          <div className="filter-panel grid grid-cols-1 gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              />
            </label>
            <label>
              <span className="sr-only">Filter by category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50">
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50">
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50">
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
              <div className="empty-panel rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                <div
                  className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 text-xl text-indigo-600"
                  aria-hidden="true">
                  {questions.length ? "⌕" : "+"}
                </div>
                <h4 className="font-semibold">
                  {questions.length
                    ? "No questions match these filters"
                    : "Start with one question"}
                </h4>
                <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
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
                    className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                    Clear filters
                  </button>
                ) : (
                  <button
                    onClick={() => setOpenModal(true)}
                    className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
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
