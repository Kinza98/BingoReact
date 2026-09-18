function Profile({ isGuest, name, email }) {
  return (
    <div className="text-center bg-white/5 border border-white/10 rounded-2xl p-5 mb-5">
      <div className="w-14 h-14 rounded-full bg-teal-400 flex items-center justify-center text-[#0D1B26] text-xl font-bold mx-auto mb-2">
        {name?.[0]?.toUpperCase()}
      </div>

      <p className="text-white text-base font-semibold m-0">
        {isGuest
          ? "Guest"
          : `${name?.[0]?.toUpperCase()}${name?.slice(1)}` || "Player"}
      </p>

      {email && <p className="text-slate-400 text-sm mt-0.5 m-0">{email}</p>}
    </div>
  );
}

export default Profile;
