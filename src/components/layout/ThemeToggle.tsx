"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export default function ThemeToggle({ hidden = false }: { hidden?: boolean }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const initialTheme = savedTheme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = initialTheme;
    const frame = window.requestAnimationFrame(() => setTheme(initialTheme));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <div
      className={`theme-lamp fixed right-24 top-0 z-[80] flex flex-col items-center transition-[transform,opacity] duration-500 ease-out md:right-8 ${
        hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <span aria-hidden="true" className="theme-lamp__cord" />
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        className={`theme-lamp__button ${theme === "light" ? "is-on" : ""} ${
          hidden ? "pointer-events-none" : ""
        }`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="size-8"
        >
          <path
            d="M12 2.5a7 7 0 0 0-4.1 12.68c.72.52 1.1 1.15 1.1 1.82v.5h6v-.5c0-.67.38-1.3 1.1-1.82A7 7 0 0 0 12 2.5Z"
            fill="currentColor"
            fillOpacity=".2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 20h5m-4.5-3h4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span className="sr-only">
          {theme === "dark" ? "Turn the lights on" : "Turn the lights off"}
        </span>
      </button>
    </div>
  );
}
