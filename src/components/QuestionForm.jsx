import { useForm } from "react-hook-form";

const QuestionForm = ({ setOpenModal, setQuestions }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      category: "DSA",
      difficulty: "easy",
      status: "in progress",
    },
  });

  const onSubmit = (data) => {
    setQuestions((prev) => [...prev, { data, id: Date.now() }]);
    reset();
    setOpenModal(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[rgba(13,20,16,0.67)] p-4 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpenModal(false);
      }}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="question-form-title"
        className="my-auto flex max-h-[min(90dvh,820px)] w-full max-w-lg flex-col gap-6 overflow-y-auto overscroll-contain rounded-3xl border border-[#e6e9df] bg-[#fafaf6] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-8 max-[640px]:my-0 max-[640px]:mt-auto max-[640px]:max-h-[92dvh] max-[640px]:gap-5 max-[640px]:rounded-t-3xl max-[640px]:rounded-b-none max-[640px]:px-5 max-[640px]:pt-6 max-[640px]:pb-[max(20px,env(safe-area-inset-bottom))]">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-2">
            <span className="w-fit rounded-full bg-[#e9eddf] px-3 py-1 text-[10px] font-bold tracking-[0.16em] text-[#657b46]">
              PRACTICE LIBRARY
            </span>

            <h2
              id="question-form-title"
              className="font-[Manrope] text-2xl font-bold tracking-tight text-[#19251f] sm:text-[1.8rem]">
              Add a question
            </h2>

            <p className="text-sm leading-relaxed text-[#778078]">
              Save something worth getting better at.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenModal(false)}
            aria-label="Close dialog"
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#edf0e6] text-2xl text-[#586453] transition hover:bg-[#dfe6d3] focus:outline-none focus:ring-4 focus:ring-[#e7eddb]">
            <span aria-hidden="true">×</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Question title */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="question-title"
              className="text-sm font-semibold text-[#364238]">
              Question title
            </label>

            <input
              id="question-title"
              autoFocus
              type="text"
              placeholder="e.g. Explain Virtual DOM"
              {...register("title", {
                required: "Question title is required",
                validate: (value) =>
                  value.trim().length > 0 || "Enter a valid question title",
              })}
              className="min-h-12 w-full rounded-xl border border-[#e1e4d9] bg-white px-4 py-3 text-sm text-[#26332a] outline-none transition placeholder:text-[#a0a69b] focus:border-[#91a66d] focus:ring-4 focus:ring-[#e7eddb]"
            />

            {errors.title && (
              <p className="text-xs font-medium text-[#b4533f]">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Category and type */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-2">
              <label
                htmlFor="question-category"
                className="text-sm font-semibold text-[#364238]">
                Category
              </label>

              <select
                id="question-category"
                {...register("category")}
                className="min-h-12 w-full rounded-xl border border-[#e1e4d9] bg-white px-3 py-3 text-sm text-[#26332a] outline-none transition focus:border-[#91a66d] focus:ring-4 focus:ring-[#e7eddb]">
                <option value="DSA">DSA</option>
                <option value="JavaScript">JavaScript</option>
                <option value="React">React</option>
                <option value="Backend">Backend</option>
                <option value="HR">HR</option>
              </select>
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <label
                htmlFor="question-type"
                className="text-sm font-semibold text-[#364238]">
                Practice type
              </label>

              <select
                id="question-type"
                {...register("type")}
                className="min-h-12 w-full rounded-xl border border-[#e1e4d9] bg-white px-3 py-3 text-sm text-[#26332a] outline-none transition focus:border-[#91a66d] focus:ring-4 focus:ring-[#e7eddb]">
                <option value="DSA">DSA</option>
                <option value="Interview">Interview</option>
                <option value="Machine Coding">Machine Coding</option>
              </select>
            </div>
          </div>

          {/* Difficulty and status */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-2">
              <label
                htmlFor="question-difficulty"
                className="text-sm font-semibold text-[#364238]">
                Difficulty
              </label>

              <select
                id="question-difficulty"
                {...register("difficulty")}
                className="min-h-12 w-full rounded-xl border border-[#e1e4d9] bg-white px-3 py-3 text-sm text-[#26332a] outline-none transition focus:border-[#91a66d] focus:ring-4 focus:ring-[#e7eddb]">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <label
                htmlFor="question-status"
                className="text-sm font-semibold text-[#364238]">
                Status
              </label>

              <select
                id="question-status"
                {...register("status")}
                className="min-h-12 w-full rounded-xl border border-[#e1e4d9] bg-white px-3 py-3 text-sm text-[#26332a] outline-none transition focus:border-[#91a66d] focus:ring-4 focus:ring-[#e7eddb]">
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#e4e6dd] pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="min-h-11 rounded-full border border-[#dfe3d8] px-5 py-2.5 text-sm font-semibold text-[#465247] transition hover:bg-[#eff1e9] focus:outline-none focus:ring-4 focus:ring-[#e7eddb] sm:flex-none">
              Cancel
            </button>

            <button
              type="submit"
              className="min-h-11 rounded-full bg-[#19251f] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#344a32] focus:outline-none focus:ring-4 focus:ring-[#dce6cf] sm:flex-none">
              Save question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
