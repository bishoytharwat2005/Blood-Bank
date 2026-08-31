import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

function useChat() {
  const location = useLocation();
  const navigate = useNavigate();

  const donor = location.state?.donor;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const getCurrentUser = () => {
    try {
      return JSON.parse(localStorage.getItem("userData") || "{}");
    } catch {
      return {};
    }
  };

  const currentUser = getCurrentUser();

  const currentUserName =
    currentUser.firstName ||
    currentUser.userName ||
    "You";

  const donorId = donor?.id || "unknown";

  const conversationId = `${currentUserName}-${donorId}`;

  useEffect(() => {
    if (!donor) return;

    let chats = {};

    try {
      chats = JSON.parse(
        localStorage.getItem("blood_chats") || "{}"
      );
    } catch {
      chats = {};
    }

    setMessages(chats[conversationId] || []);
  }, [conversationId, donor]);

  const saveMessages = (updatedMessages) => {
    let chats = {};

    try {
      chats = JSON.parse(
        localStorage.getItem("blood_chats") || "{}"
      );
    } catch {
      chats = {};
    }

    chats[conversationId] = updatedMessages;

    localStorage.setItem(
      "blood_chats",
      JSON.stringify(chats)
    );

    setMessages(updatedMessages);
  };

  const handleSend = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "user",
      senderName: currentUserName,
      text: message.trim(),
      createdAt: new Date().toISOString(),
    };

    saveMessages([...messages, newMessage]);

    setMessage("");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleFindBlood = () => {
    navigate("/find-blood");
  };

  const donorName = donor?.firstName
    ? `${donor.firstName} ${donor.lastName || ""}`.trim()
    : donor?.name || "Blood Donor";

  const donorCity =
    donor?.address?.city ||
    donor?.city ||
    "Unknown";

  const donorBloodType =
    donor?.bloodGroup ||
    donor?.bloodType ||
    "N/A";

  return {
    donor,
    message,
    setMessage,
    messages,
    currentUserName,
    donorName,
    donorCity,
    donorBloodType,
    handleSend,
    handleBack,
    handleFindBlood,
  };
}

export default useChat;

