import { useState } from "react";
function useLogin() {
const [formData, setFormData] = useState({
username: "",
password: "",
});

const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleChange = (e) => {
setFormData((prev) => ({
...prev,
[e.target.name]: e.target.value,
}));
setError("");

};

const handleSubmit = async (e) => {
e.preventDefault();
setError("");

if (!formData.username || !formData.password) {
  setError("Please enter your username and password.");
  return;
}

setLoading(true);

try {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const savedUser = localStorage.getItem("userData");

  if (!savedUser) {
    setError("No account found. Please register first.");
    setLoading(false);
    return;
  }

  const user = JSON.parse(savedUser);

  const usernameMatches =
    formData.username === user.firstName ||
    formData.username === `${user.firstName} ${user.lastName}` ||
    formData.username === user.userName ||
    formData.username === user.email;

  const passwordMatches =
    formData.password === user.password;

  if (!usernameMatches || !passwordMatches) {
    setError("Invalid username or password.");
    setLoading(false);
    return;
  }

  localStorage.setItem("isAuthenticated", "true");

  const fullName =
    `${user.firstName || ""} ${user.lastName || ""}`.trim();

  localStorage.setItem("userName", fullName);
  localStorage.setItem("userEmail", user.email || "");

  window.dispatchEvent(new Event("authChange"));

  window.location.href = "/";
} catch (error) {
  console.error(error);
  setError("Something went wrong. Please try again.");
} finally {
  setLoading(false);
}
};

const togglePassword = () => {
setShowPassword((prev) => !prev);
};

return {
formData,
showPassword,
loading,
error,
handleChange,
handleSubmit,
togglePassword,
};
}

export default useLogin;
