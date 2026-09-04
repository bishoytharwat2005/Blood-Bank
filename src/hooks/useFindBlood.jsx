import { useState, useEffect } from "react";

export default function useFindBlood(navigate) {
  const [activeTab, setActiveTab] = useState("requests");
  const [requests, setRequests] = useState([]);
  const [donors, setDonors] = useState([]);
  const [bloodType, setBloodType] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. جلب البيانات الحقيقية من API
  const loadData = async () => {
    setLoading(true);
    try {
      // جلب المتبرعين من DummyJSON API
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

      // جلب الطلبات من API خارجي (DummyJSON Posts API)
      const postsRes = await fetch("https://dummyjson.com/posts?limit=10");
      const postsData = await postsRes.json();

      const formattedRequests = (postsData.posts || []).map((post, index) => ({
        id: post.id,
        firstName: `Patient ${post.userId}`,
        lastName: `Ref #${post.id}`,
        bloodGroup: bloodGroups[index % bloodGroups.length],
        city: index % 2 === 0 ? "Cairo" : "Alexandria",
        hospital: "General Hospital",
        phone: `010${Math.floor(10000000 + Math.random() * 90000000)}`,
        urgency: index % 3 === 0 ? "Critical" : "Urgent",
        unitsNeeded: (index % 3) + 1,
      }));

      // دمج الطلبات القادمة من الـ API مع الطلبات المضافة حديثاً من قبل المستخدم
      const localSaved = JSON.parse(localStorage.getItem("bloodRequests") || "[]");
      setRequests([...localSaved, ...formattedRequests]);

    } catch (error) {
      console.error("API Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 2. إرسال طلب جديد إلى API
  const addBloodRequest = async (newRequest) => {
    try {
      const response = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `Blood Request ${newRequest.bloodGroup}`,
          userId: 5,
        }),
      });

      const data = await response.json();

      const createdEntry = {
        id: data.id || Date.now(),
        ...newRequest,
        createdAt: new Date().toISOString(),
      };

      // تحديث الحالة وحفظ العنصر الجديد محلياً لضمان بقائه في الجلسة الحالية
      const existingLocal = JSON.parse(localStorage.getItem("bloodRequests") || "[]");
      const updatedLocal = [createdEntry, ...existingLocal];
      localStorage.setItem("bloodRequests", JSON.stringify(updatedLocal));

      setRequests((prev) => [createdEntry, ...prev]);
    } catch (error) {
      console.error("Error posting to API:", error);
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

  // فلترة الطلبات
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