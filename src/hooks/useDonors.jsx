import { useEffect, useState } from "react";

function useDonors() {
  const [donors, setDonors] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("blood_donors")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleDonorsUpdated = () => {
      try {
        const savedDonors =
          JSON.parse(localStorage.getItem("blood_donors")) || [];

        setDonors(savedDonors);
      } catch {
        setDonors([]);
      }
    };

    window.addEventListener("donorsUpdated", handleDonorsUpdated);

    return () => {
      window.removeEventListener("donorsUpdated", handleDonorsUpdated);
    };
  }, []);

  const addDonor = (donor) => {
    const updatedDonors = [donor, ...donors];

    localStorage.setItem(
      "blood_donors",
      JSON.stringify(updatedDonors)
    );

    setDonors(updatedDonors);

    window.dispatchEvent(new Event("donorsUpdated"));
  };

  const getBlockedUntil = (donor) => {
    if (!donor.blockedUntil) return null;

    const date = new Date(donor.blockedUntil);

    if (date <= new Date()) {
      return null;
    }

    return date;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB");
  };

  return {
    donors,
    setDonors,
    addDonor,
    getBlockedUntil,
    formatDate,
  };
}

export default useDonors;
