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
      className="question-form-backdrop fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/45 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpenModal(false);
      }}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="question-form-title"
        className="question-form-dialog my-auto flex w-full max-w-lg flex-col gap-6 rounded-2xl bg-white p-6 shadow-2xl sm:p-7">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="question-form-kicker">PRACTICE LIBRARY · NEW ENTRY</p>
            <h2
              id="question-form-title"
              className="text-xl font-bold text-slate-900">
              Add a question
            </h2>

            <p className="text-sm text-slate-500">
              Save something worth getting better at.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenModal(false)}
            aria-label="Close dialog"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-2xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-100">
            ×
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="question-form-fields flex flex-col gap-5">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="question-title"
              className="text-sm font-medium text-slate-700">
              Question
            </label>

            <input
              id="question-title"
              autoFocus
              type="text"
              placeholder="e.g. Explain Virtual DOM"
              {...register("title", {
                required: "Question title is required",
              })}
              className="question-form-control rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            />

            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

        
          <div className="flex flex-col gap-2">
            <label
              htmlFor="question-category"
              className="text-sm font-medium text-slate-700">
              Category
            </label>

            <select
              id="question-category"
              {...register("category")}
              className="question-form-control rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50">
              <option value="DSA">DSA</option>
              <option value="JavaScript">JavaScript</option>
              <option value="React">React</option>
              <option value="Backend">Backend</option>
              <option value="HR">HR</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="question-type"
              className="text-sm font-medium text-slate-700">
              Type
            </label>
            <select
              {...register("type")}
              id="question-type"
              className="question-form-control rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50">
              <option value="DSA">DSA</option>
              <option value="Interview">Interview</option>
              <option value="Machine Coding">Machine Coding</option>
            </select>
          </div>

  
          <div className="flex flex-col gap-2">
            <label
              htmlFor="question-difficulty"
              className="text-sm font-medium text-slate-700">
              Difficulty
            </label>

            <select
              id="question-difficulty"
              {...register("difficulty")}
              className="question-form-control rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="question-status"
              className="text-sm font-medium text-slate-700">
              Status
            </label>

            <select
              id="question-status"
              {...register("status")}
              className="question-form-control rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50">
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="question-form-actions flex justify-end gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="question-form-cancel rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100">
              Cancel
            </button>

            <button
              type="submit"
              className="question-form-submit rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100">
              Save question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
