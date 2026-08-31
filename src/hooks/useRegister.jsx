import { useState } from "react";
import { useNavigate } from "react-router";

function useRegister() {
  const navigate = useNavigate();

  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationalId: "",
    password: "",
    confirmPassword: "",
    bloodType: "O+",
    city: "Cairo",
    address: "",
    idFront: "",
    idBack: "",
    photo: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!/^\d{14}$/.test(formData.nationalId)) {
      alert("National ID must be 14 digits.");
      return;
    }

    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      nationalId: formData.nationalId,
      password: formData.password,
      bloodType: formData.bloodType,
      city: formData.city,
      address: formData.address,
      idFront: formData.idFront,
      idBack: formData.idBack,
      photo: formData.photo,
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    localStorage.setItem(
      "userName",
      `${formData.firstName} ${formData.lastName}`
    );

    localStorage.setItem("userEmail", formData.email);

    localStorage.setItem("isAuthenticated", "false");

    window.dispatchEvent(new Event("authChange"));

    alert("Registration successful! Please login.");

    navigate("/login");
  };

  return {
    formData,
    handleChange,
    handleFileChange,
    handleSubmit,
  };
}

export default useRegister;