import React from "react";

const Navbar = () => (
  <nav className="site-nav border-b border-slate-200/80 bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
    <div className="mx-auto flex max-w-7xl items-center gap-3">
      <span
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white shadow-md shadow-indigo-600/20"
        aria-hidden="true">
        ✳
      </span>
      <div>
        <h1 className="text-sm font-bold tracking-tight text-slate-900 sm:text-base">
          Practice<span className="text-indigo-600">Track</span>
        </h1>
        <p className="text-xs text-slate-500">Interview preparation</p>
      </div>
    </div>
  </nav>
);

export default Navbar;
