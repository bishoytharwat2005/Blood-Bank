import { useState } from "react";

function useBloodCompatibility() {
  const [selectedType, setSelectedType] = useState(null);

  const bloodTypes = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ];

  const bloodCompatibility = {
    "A+": {
      receive: ["A+", "A-", "O+", "O-"],
      donate: ["A+", "AB+"],
    },
    "A-": {
      receive: ["A-", "O-"],
      donate: ["A+", "A-", "AB+", "AB-"],
    },
    "B+": {
      receive: ["B+", "B-", "O+", "O-"],
      donate: ["B+", "AB+"],
    },
    "B-": {
      receive: ["B-", "O-"],
      donate: ["B+", "B-", "AB+", "AB-"],
    },
    "AB+": {
      receive: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      donate: ["AB+"],
    },
    "AB-": {
      receive: ["A-", "B-", "AB-", "O-"],
      donate: ["AB+", "AB-"],
    },
    "O+": {
      receive: ["O+", "O-"],
      donate: ["O+", "A+", "B+", "AB+"],
    },
    "O-": {
      receive: ["O-"],
      donate: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
  };

  return {
    selectedType,
    setSelectedType,
    bloodTypes,
    bloodCompatibility,
  };
}

export default useBloodCompatibility;