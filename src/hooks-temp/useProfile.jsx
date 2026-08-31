import { useState } from "react";
import { useNavigate } from "react-router";

function getUserData() {
  const savedUser = localStorage.getItem("userData");

  if (!savedUser) return null;

  try {
    return JSON.parse(savedUser);
  } catch {
    return null;
  }
}

function useProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(getUserData());
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    nationalId: user?.nationalId || "",
    bloodType: user?.bloodType || "O+",
    city: user?.city || "Cairo",
    address: user?.address || "",
    photo: user?.photo || "",
    idFront: user?.idFront || "",
    idBack: user?.idBack || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

  const handleSave = () => {
    localStorage.setItem("userData", JSON.stringify(formData));

    localStorage.setItem(
      "userName",
      `${formData.firstName} ${formData.lastName}`
    );

    localStorage.setItem("userEmail", formData.email);

    setUser(formData);
    setEditing(false);

    window.dispatchEvent(new Event("authChange"));
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");

    setUser(null);

    window.dispatchEvent(new Event("authChange"));

    navigate("/login");
  };

  const handleEdit = () => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      nationalId: user?.nationalId || "",
      bloodType: user?.bloodType || "O+",
      city: user?.city || "Cairo",
      address: user?.address || "",
      photo: user?.photo || "",
      idFront: user?.idFront || "",
      idBack: user?.idBack || "",
    });

    setEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      nationalId: user?.nationalId || "",
      bloodType: user?.bloodType || "O+",
      city: user?.city || "Cairo",
      address: user?.address || "",
      photo: user?.photo || "",
      idFront: user?.idFront || "",
      idBack: user?.idBack || "",
    });

    setEditing(false);
  };

  return {
    user,
    editing,
    formData,
    handleChange,
    handleFileChange,
    handleSave,
    handleLogout,
    handleEdit,
    handleCancel,
  };
}

export default useProfile;

