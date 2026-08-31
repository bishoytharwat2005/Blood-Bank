import { useEffect, useState } from "react";

function useBloodRequests() {
  const [requests, setRequests] = useState(() => {
    try {
      const savedRequests = localStorage.getItem("blood_requests");
      return savedRequests ? JSON.parse(savedRequests) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("blood_requests", JSON.stringify(requests));
  }, [requests]);

  const addRequest = (request) => {
    setRequests((prev) => [request, ...prev]);
  };

  const deleteRequest = (id) => {
    setRequests((prev) =>
      prev.filter((request) => request.id !== id)
    );
  };

  return {
    requests,
    addRequest,
    deleteRequest,
  };
}

export default useBloodRequests;
