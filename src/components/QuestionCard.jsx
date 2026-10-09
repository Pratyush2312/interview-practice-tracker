const QuestionCard = ({ title, category, difficulty, status, onComplete }) => {
  const normalizedStatus = status.toLowerCase();
  const isCompleted = normalizedStatus === "completed";
  const statusLabel =
    normalizedStatus === "in progress"
      ? "In progress"
      : isCompleted
        ? "Completed"
        : "Not started";
  const difficultyClass =
    {
      easy: "bg-emerald-50 text-emerald-700",
      medium: "bg-amber-50 text-amber-700",
      hard: "bg-rose-50 text-rose-700",
    }[difficulty.toLowerCase()] || "bg-slate-100 text-slate-600";

  return (
    <article className="flex flex-col gap-4 rounded-[18px] border border-[#e3e5dc] bg-[#fafaf6] px-5.5 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h4 className={`font-[Manrope] font-semibold text-slate-900 ${isCompleted && 'line-through'}`}>
          {title}
        </h4>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            {category}
          </span>
          <span
            className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize ${difficultyClass}`}>
            {difficulty}
          </span>
          <span
            className={`rounded-lg px-2.5 py-1 text-xs font-medium ${isCompleted ? "bg-emerald-50 text-emerald-700" : normalizedStatus === "in progress" ? "bg-indigo-50 text-indigo-700" : "bg-slate-100 text-slate-600"}`}>
            {statusLabel}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={onComplete}
        disabled={isCompleted}
        className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-4 ${isCompleted ? "cursor-default bg-[#eaf0dc] text-[#526b35] focus:ring-emerald-100" : "bg-[#19251f] text-white hover:bg-[#405a20] focus:ring-indigo-100"}`}>
        {isCompleted ? "✓ Done" : "Mark complete"}
      </button>
    </article>
  );
};

export default QuestionCard;
