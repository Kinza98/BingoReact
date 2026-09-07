// authValidators.js

export function validateEmail(email) {
  if (!email) return "Email is required";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Please enter a valid email";
  }

  return "";
}

export function validatePassword(password) {
  if (!password) return "Password is required";

  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }

  if (!/^[a-zA-Z0-9_]+$/.test(password)) {
    return "Password can only contain letters, numbers, and _";
  }

  return "";
}

export function validateUsername(username) {
  if (!username) return "Username is required";

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return "Username can only contain letters, numbers, and _";
  }

  return "";
}
