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
      // 1. جلب بيانات المتبرعين ديناميكياً من API
      const donorsRes = await fetch("https://dummyjson.com/users?limit=150");
      const donorsData = await donorsRes.json();

      const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

      const formattedDonors = (donorsData.users || []).map((user, index) => ({
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

      // 2. جلب طلبات الدم ديناميكياً بالكامل من API (بدون أي بيانات ثابتة)
      const postsRes = await fetch("https://dummyjson.com/posts?limit=150");
      const postsData = await postsRes.json();

      const apiRequests = (postsData.posts || []).map((post, index) => ({
        id: post.id,
        firstName: `User_${post.userId}`,
        lastName: `Request`,
        bloodGroup: bloodGroups[index % bloodGroups.length],
        city: index % 2 === 0 ? "Cairo" : index % 3 === 0 ? "Giza" : "Alexandria",
        hospital: `Hospital Branch #${(post.id % 5) + 1}`,
        phone: `01${Math.floor(100000000 + Math.random() * 900000000)}`,
        urgency: index % 2 === 0 ? "Critical" : "Urgent",
        unitsNeeded: (index % 3) + 1,
      }));

      setRequests(apiRequests);
    } catch (error) {
      console.error("API Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // إضافة طلب جديد عبر API
  const addBloodRequest = async (newRequest) => {
    try {
      const response = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `Blood Request ${newRequest.bloodGroup}`,
          userId: 1,
        }),
      });

      const data = await response.json();

      const createdEntry = {
        id: data.id || Date.now(),
        ...newRequest,
        createdAt: new Date().toISOString(),
      };

      setRequests((prev) => [createdEntry, ...prev]);
    } catch (error) {
      console.error("Error posting request:", error);
    }
  };

  // فلترة المتبرعين
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

  // فلترة طلبات الدم
  const filteredRequests = requests.filter((req) => {
    const matchesType = bloodType ? req.bloodGroup === bloodType : true;
    const reqCity = req.city || "";
    const matchesCity = city
      ? reqCity.toLowerCase().includes(city.toLowerCase())
      : true;
    return matchesType && matchesCity;
  });

  const handleContact = (donor) => {
    if (donor.phone) {
      window.location.href = `tel:${donor.phone}`;
    } else {
      alert("No phone number available.");
    }
  };

  return {
    activeTab,
    setActiveTab,
    requests: filteredRequests,
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