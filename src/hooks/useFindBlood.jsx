import { useState, useEffect } from "react";

export default function useFindBlood(navigate) {
  const [activeTab, setActiveTab] = useState("requests");
  const [requests, setRequests] = useState([]);
  const [donors, setDonors] = useState([]);
  const [bloodType, setBloodType] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  // بيانات افتراضية للمتبرعين
  const initialDonors = [
    {
      id: 1,
      firstName: "Ahmed",
      lastName: "Ali",
      bloodGroup: "A+",
      city: "Cairo",
      phone: "01012345678",
      availableDate: "2026-09-10",
    },
    {
      id: 2,
      firstName: "Mina",
      lastName: "Sameh",
      bloodGroup: "O-",
      city: "Alexandria",
      phone: "01123456789",
      availableDate: "2026-09-12",
    },
    {
      id: 3,
      firstName: "Sara",
      lastName: "Hassan",
      bloodGroup: "B+",
      city: "Giza",
      phone: "01234567890",
      availableDate: "2026-09-15",
    },
  ];

  // بيانات افتراضية لطلبات الدم
  const initialRequests = [
    {
      id: 101,
      firstName: "Mohamed",
      lastName: "Ibrahim",
      bloodGroup: "O+",
      city: "Cairo",
      hospital: "Al Salam Hospital",
      phone: "01098765432",
      urgency: "Critical",
      unitsNeeded: 2,
    },
    {
      id: 102,
      firstName: "Kirollos",
      lastName: "Nabil",
      bloodGroup: "A-",
      city: "Giza",
      hospital: "El Borg Hospital",
      phone: "01187654321",
      urgency: "Urgent",
      unitsNeeded: 1,
    },
  ];

  const loadData = async () => {
    setLoading(true);
    try {
      // جلب الطلبات من localStorage أو تعيين البيانات الافتراضية
      const savedRequests = localStorage.getItem("bloodRequests");
      if (savedRequests && JSON.parse(savedRequests).length > 0) {
        setRequests(JSON.parse(savedRequests));
      } else {
        setRequests(initialRequests);
        localStorage.setItem("bloodRequests", JSON.stringify(initialRequests));
      }

      // تعيين المتبرعين الافتراضيين
      setDonors(initialDonors);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addBloodRequest = async (newRequest) => {
    const newEntry = {
      id: Date.now(),
      ...newRequest,
      createdAt: new Date().toISOString(),
    };

    setRequests((prevRequests) => {
      const updated = [newEntry, ...prevRequests];
      localStorage.setItem("bloodRequests", JSON.stringify(updated));
      return updated;
    });
  };

  const filteredDonors = donors.filter((donor) => {
    const matchesType = bloodType
      ? (donor.bloodGroup || donor.bloodType) === bloodType
      : true;
    const donorCity = donor.address?.city || donor.city || "";
    const matchesCity = city
      ? donorCity.toLowerCase().includes(city.toLowerCase())
      : true;
    return matchesType && matchesCity;
  });

  const handleContact = (donor) => {
    if (donor.phone) {
      window.location.href = `tel:${donor.phone}`;
    } else {
      alert("No phone number available for this donor.");
    }
  };

  return {
    activeTab,
    setActiveTab,
    requests,
    bloodType,
    setBloodType,
    city,
    setCity,
    loading,
    filteredDonors,
    handleContact,
    addBloodRequest,
    loadData,
  };
}