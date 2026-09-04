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
      const savedRequests = localStorage.getItem("bloodRequests");
      if (savedRequests) {
        setRequests(JSON.parse(savedRequests));
      }
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