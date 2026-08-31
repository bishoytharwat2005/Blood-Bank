import { useEffect, useState } from "react";

function useLikedRequests() {
  const [likedRequests, setLikedRequests] = useState(() => {
    try {
      const savedLikes = localStorage.getItem("liked_requests");
      return savedLikes ? JSON.parse(savedLikes) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "liked_requests",
      JSON.stringify(likedRequests)
    );
  }, [likedRequests]);

  const toggleLike = (id) => {
    setLikedRequests((prev) => {
      if (prev.includes(id)) {
        return prev.filter((requestId) => requestId !== id);
      }

      return [...prev, id];
    });
  };

  const removeLike = (id) => {
    setLikedRequests((prev) =>
      prev.filter((requestId) => requestId !== id)
    );
  };

  const isLiked = (id) => likedRequests.includes(id);

  return {
    likedRequests,
    toggleLike,
    removeLike,
    isLiked,
  };
}

export default useLikedRequests;
