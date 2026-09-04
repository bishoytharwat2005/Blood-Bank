import { useState, useEffect } from "react";

export default function useFindBlood(navigate) {
  const [activeTab, setActiveTab] = useState("requests");
  const [requests, setRequests] = useState([]);
  const [donors, setDonors] = useState([]);
  const [bloodType, setBloodType] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      // 1. جلب بيانات المتبرعين من API
      const donorsRes = await fetch("https://dummyjson.com/users?limit=9");
      const donorsData = await donorsRes.json();

      const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
      const formattedDonors = donorsData.users.map((user, index) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        bloodGroup: user.bloodGroup || bloodGroups[index % bloodGroups.length],
        city: user.address?.city || "Cairo",
        phone: user.phone,
        image: user.image,
        availableDate: "2026-09-15",
      }));

      setDonors(formattedDonors);

      // 2. جلب طلبات الدم (من API أو LocalStorage كنسخة احتياطية)
      const savedRequests = localStorage.getItem("bloodRequests");
      if (savedRequests) {
        setRequests(JSON.parse(savedRequests));
      } else {
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
        ];
        setRequests(initialRequests);
        localStorage.setItem("bloodRequests", JSON.stringify(initialRequests));
      }
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addBloodRequest = async (newRequest) => {
    try {
      // إرسال POST Request إلى الـ API
      const response = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRequest),
      });

      const data = await response.json();

      const createdEntry = {
        id: data.id || Date.now(),
        ...newRequest,
        createdAt: new Date().toISOString(),
      };

      setRequests((prev) => {
        const updated = [createdEntry, ...prev];
        localStorage.setItem("bloodRequests", JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error("Error posting request:", error);
    }
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