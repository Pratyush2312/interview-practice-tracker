import React from "react";

const StatCard = ({ title, value, description, icon }) => (
  <article className="min-h-[165px] rounded-[20px] border border-[#e3e5dc] bg-[#fafaf6] p-[22px] shadow-[0_4px_20px_-16px_rgba(23,34,29,0.28)] transition hover:-translate-y-0.5">
    <div className="flex items-start justify-between">
      <p className="text-sm font-medium text-[#778078]">{title}</p>
    </div>
    <p className="mt-4 font-[Manrope] text-[2.5rem] font-bold tracking-[-0.07em] text-[#17221d]">
      {value}
    </p>
    <p className="mt-1 text-sm text-[#778078]">{description}</p>
  </article>
);

export default StatCard;
