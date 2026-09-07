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
        className="peer w-full px-3 sm:px-4 py-2 sm:placeholder:text-base sm:py-3 md:text-lg text-base rounded-lg bg-white/10 border border-white/10 outline-none text-white placeholder:text-white/50 font-secondary focus:border-amber transition-all duration-200"
      />

      <label
        htmlFor={id}
        className={`
          absolute left-4 pointer-events-none
          transition-all duration-200 ease-out tracking-wider
          ${
            floating
              ? "-top-2.5 sm:-top-3.5 text-xs md:text-base px-2 bg-slate text-amber "
              : "top-1/2 -translate-y-1/2 text-base md:text-lg text-white/50"
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
          className={`absolute right-0 top-0 h-full w-10 sm:w-14 flex items-center justify-center rounded-r-lg bg-white/90 text-slate cursor-pointer hover:bg-white transition-colors duration-200 text-base sm:text-xl`}
        >
          {showPassword ? <HiEye /> : <HiEyeOff />}
        </button>
      )}
    </div>
  );
}

export default InputField;
