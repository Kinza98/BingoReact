import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

function InputField({ type = "text", value, onChange, label, id }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = type === "password";
  const hasValue = Boolean(value);
  const floating = isFocused || hasValue;

  return (
    <div className="relative w-full">
      <input
        type={isPassword && showPassword ? "text" : type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        id={id}
        className="peer w-full rounded-lg border border-slate-400/30 bg-[#ecf8fb] px-3 py-2 text-base font-secondary text-slate-900 outline-none placeholder:text-slate-600/70 focus:border-amber sm:px-4 sm:py-3 md:text-lg dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-white/50"
      />

      <label
        htmlFor={id}
        className={`
          pointer-events-none absolute left-4
          tracking-wider transition-all duration-200 ease-out
          ${
            floating
              ? "-top-2.5 bg-[#ecf8fb] px-2 text-xs text-amber sm:-top-3.5 md:text-base dark:bg-slate"
              : "top-1/2 -translate-y-1/2 text-[0.975rem] text-slate-600/70 sm:text-base md:text-lg dark:text-white/50"
          }
        `}
      >
        {label}
      </label>

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((show) => !show)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-0 top-0 flex h-full w-10 cursor-pointer items-center justify-center rounded-r-lg bg-slate-400/30 text-slate-800 transition-colors duration-200 hover:bg-slate-400/50 sm:w-14 sm:text-xl dark:bg-white/90 dark:text-slate dark:hover:bg-white"
        >
          {showPassword ? <HiEye /> : <HiEyeOff />}
        </button>
      )}
    </div>
  );
}

export default InputField;
