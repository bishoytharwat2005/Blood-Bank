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
    if (!donor?.blockedUntil) {
      return null;
    }

    const blockedDate = new Date(donor.blockedUntil);
    const now = new Date();

    if (isNaN(blockedDate.getTime())) {
      return null;
    }

    if (blockedDate <= now) {
      return null;
    }

    return blockedDate;
  };

  const isDonorBlocked = (donor) => {
    return getBlockedUntil(donor) !== null;
  };

  const isDonorAvailable = (donor) => {
    return !isDonorBlocked(donor);
  };

  const updateExpiredDonors = () => {
    const updatedDonors = donors.map((donor) => {
      if (!donor.blockedUntil) {
        return donor;
      }

      const blockedUntil = new Date(donor.blockedUntil);

      if (
        !isNaN(blockedUntil.getTime()) &&
        blockedUntil <= new Date()
      ) {
        return {
          ...donor,
          available: true,
          blockedUntil: null,
          availableDate: new Date()
            .toISOString()
            .split("T")[0],
        };
      }

      return donor;
    });

    localStorage.setItem(
      "blood_donors",
      JSON.stringify(updatedDonors)
    );

    setDonors(updatedDonors);

    window.dispatchEvent(new Event("donorsUpdated"));
  };

  useEffect(() => {
    updateExpiredDonors();

    const interval = setInterval(() => {
      updateExpiredDonors();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleDateString("en-GB");
  };

  return {
    donors,
    setDonors,
    addDonor,
    getBlockedUntil,
    isDonorBlocked,
    isDonorAvailable,
    updateExpiredDonors,
    formatDate,
  };
}

export default useDonors;