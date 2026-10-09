import React from "react";

const Navbar = () => (
  <nav className="border-b border-[#e2e4db] bg-[rgba(249,249,244,0.88)] px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
    <div className="mx-auto flex max-w-7xl items-center gap-3">
      <span
        className="flex h-9 w-9 rotate-[-8deg] items-center justify-center rounded-full bg-[#d4f478] text-lg font-bold text-[#17221d]"
        aria-hidden="true">
        ✳
      </span>
      <div>
        <h1 className="font-[Manrope] text-sm font-bold tracking-[-0.045em] text-[#17221d] sm:text-base">
          Practice<span className="text-[#758f37]">Track</span>
        </h1>
        <p className="text-xs tracking-[0.015em] text-slate-500">Interview preparation</p>
      </div>
    </div>
  </nav>
);

export default Navbar;
