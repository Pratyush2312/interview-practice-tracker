import React from "react";

const StatCard = ({ title, value, description, icon }) => (
  <article className="stat-card rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
    <div className="flex items-start justify-between">
      <p className="text-sm font-medium text-slate-500">{title}</p>
    </div>
    <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
      {value}
    </p>
    <p className="mt-1 text-sm text-slate-500">{description}</p>
  </article>
);

export default StatCard;
