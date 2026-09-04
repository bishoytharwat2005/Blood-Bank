import { useEffect, useState } from "react";

function useFindBlood(navigate) {
  const [activeTab, setActiveTab] = useState("donors");
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [bloodType, setBloodType] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);

    let localDonors = [];
    let localRequests = [];

    try {
      localDonors = JSON.parse(
        localStorage.getItem("blood_donors") || "[]"
      );
    } catch {
      localDonors = [];
    }

    try {
      localRequests = JSON.parse(
        localStorage.getItem("blood_requests") || "[]"
      );
    } catch {
      localRequests = [];
    }

    try {
      const response = await fetch(
        "https://dummyjson.com/users?limit=0"
      );

      const data = await response.json();

      const apiDonors = (data.users || []).map((user) => ({
        ...user,
        source: "api",
        bloodGroup:
          user.bloodGroup || user.bloodType || "O+",
        city:
          user.address?.city || user.city || "Unknown",
      }));

      setDonors([...localDonors, ...apiDonors]);
      setRequests(localRequests);
    } catch (error) {
      console.error(error);
      setDonors(localDonors);
      setRequests(localRequests);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener("donorsUpdated", handleUpdate);
    window.addEventListener("requestsUpdated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("donorsUpdated", handleUpdate);
      window.removeEventListener("requestsUpdated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const getBlockedUntil = (donor) => {
    if (!donor.blockedUntil) {
      return null;
    }

    const date = new Date(donor.blockedUntil);

    if (date <= new Date()) {
      return null;
    }

    return date;
  };

  const handleContact = (donor) => {
    let currentUser = {};

    try {
      currentUser = JSON.parse(
        localStorage.getItem("userData") || "{}"
      );
    } catch {
      currentUser = {};
    }

    const requesterName =
      currentUser.firstName ||
      currentUser.userName ||
      localStorage.getItem("userName") ||
      "User";

    const now = new Date();
    const blockedUntil = new Date(now);

    blockedUntil.setMonth(
      blockedUntil.getMonth() + 3
    );

    const donorId = donor.id || Date.now();

    let blocks = {};

    try {
      blocks = JSON.parse(
        localStorage.getItem("donor_blocks") || "{}"
      );
    } catch {
      blocks = {};
    }

    blocks[donorId] = blockedUntil.toISOString();

    localStorage.setItem(
      "donor_blocks",
      JSON.stringify(blocks)
    );

    if (donor.source === "local") {
      let localDonors = [];

      try {
        localDonors = JSON.parse(
          localStorage.getItem("blood_donors") || "[]"
        );
      } catch {
        localDonors = [];
      }

      const updatedDonors = localDonors.map((item) =>
        item.id === donor.id
          ? {
              ...item,
              blockedUntil:
                blockedUntil.toISOString(),
              available: false,
            }
          : item
      );

      localStorage.setItem(
        "blood_donors",
        JSON.stringify(updatedDonors)
      );
    }

    const conversationId = `${requesterName}-${donorId}`;

    let chats = {};

    try {
      chats = JSON.parse(
        localStorage.getItem("blood_chats") || "{}"
      );
    } catch {
      chats = {};
    }

    if (!chats[conversationId]) {
      chats[conversationId] = [
        {
          id: Date.now(),
          sender: "system",
          text: `You started a conversation with ${
            donor.firstName || "the donor"
          }.`,
          createdAt: new Date().toISOString(),
        },
      ];
    }

    localStorage.setItem(
      "blood_chats",
      JSON.stringify(chats)
    );

    window.dispatchEvent(new Event("donorsUpdated"));

    navigate("/chat", {
      state: {
        donor: {
          ...donor,
          blockedUntil:
            blockedUntil.toISOString(),
          available: false,
        },
        conversationId,
      },
    });
  };

  const addBloodRequest = (newRequest) => {
    let localRequests = [];

    try {
      localRequests = JSON.parse(
        localStorage.getItem("blood_requests") || "[]"
      );
    } catch {
      localRequests = [];
    }

    const requestItem = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...newRequest,
    };

    const updatedRequests = [requestItem, ...localRequests];

    localStorage.setItem(
      "blood_requests",
      JSON.stringify(updatedRequests)
    );

    setRequests(updatedRequests);
    window.dispatchEvent(new Event("requestsUpdated"));
  };

  const filteredDonors = donors.filter((donor) => {
    const donorBlood =
      donor.bloodGroup ||
      donor.bloodType ||
      "";

    const donorCity =
      donor.address?.city ||
      donor.city ||
      "";

    const blockedUntil = getBlockedUntil(donor);

    const bloodMatch =
      !bloodType ||
      donorBlood.toLowerCase() ===
        bloodType.toLowerCase();

    const cityMatch =
      !city ||
      donorCity
        .toLowerCase()
        .includes(city.toLowerCase());

    return (
      bloodMatch &&
      cityMatch &&
      !blockedUntil
    );
  });

  return {
    activeTab,
    setActiveTab,
    donors,
    requests,
    bloodType,
    setBloodType,
    city,
    setCity,
    loading,
    filteredDonors,
    handleContact,
    getBlockedUntil,
    loadData,
    addBloodRequest,
  };
}

export default useFindBlood;