function Profile({ isGuest, name, email }) {
  const displayName = name
    ? `${name[0].toUpperCase()}${name.slice(1)}`
    : "Player";

  return (
    <div className="mb-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-center sm:p-5">
      <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-amber text-lg font-bold text-slate-900 sm:h-14 sm:w-14 sm:text-xl">
        {name?.[0]?.toUpperCase() || "P"}
      </div>

      <p className="m-0 text-sm font-semibold text-white sm:text-base">
        {isGuest ? "Guest" : displayName}
      </p>

      {email && (
        <p className="m-0 mt-0.5 break-all text-xs text-slate-400 sm:text-sm">
          {email}
        </p>
      )}
    </div>
  );
}

export default Profile;
