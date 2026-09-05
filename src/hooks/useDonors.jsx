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

  const addDonor = (newDonor) => {
    // 1. تنظيف رقم الهاتف ومقارنته لمنع التكرار تماماً
    const cleanPhone = newDonor.phone ? String(newDonor.phone).trim() : "";

    const exists = donors.some((d) => {
      const existingPhone = d.phone ? String(d.phone).trim() : "";
      return cleanPhone && existingPhone === cleanPhone;
    });

    if (exists) {
      return false;
    }

    const updatedDonors = [newDonor, ...donors];

    localStorage.setItem("blood_donors", JSON.stringify(updatedDonors));
    setDonors(updatedDonors);

    window.dispatchEvent(new Event("donorsUpdated"));
    return true;
  };

  const getBlockedUntil = (donor) => {
    if (!donor?.blockedUntil) {
      return null;
    }

    const blockedDate = new Date(donor.blockedUntil);
    const now = new Date();

    // إذا كان تاريخ الحظر انتهى بالنسبة لتاريخ الوقت الحالي، ارجع null (أي متاح)
    if (isNaN(blockedDate.getTime()) || blockedDate <= now) {
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

      if (!isNaN(blockedUntil.getTime()) && blockedUntil <= new Date()) {
        return {
          ...donor,
          available: true,
          blockedUntil: null,
        };
      }

      return donor;
    });

    localStorage.setItem("blood_donors", JSON.stringify(updatedDonors));
    setDonors(updatedDonors);
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

  // دالة لتصفية القائمة ومنع عرض الكروت المكررة بنسخ مختلفة في الـ Render
  const uniqueDonors = donors.filter(
    (donor, index, self) =>
      index ===
      self.findIndex(
        (d) =>
          (d.phone && donor.phone && String(d.phone).trim() === String(donor.phone).trim()) ||
          (d.id && donor.id && d.id === donor.id)
      )
  );

  return {
    donors: uniqueDonors, // إرجاع القائمة بدون تكرار
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