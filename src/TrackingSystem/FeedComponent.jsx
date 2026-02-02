import React, { useState, useEffect } from "react";

const Api=import.meta.env.VITE_BACKEND_API

const FeedbackComponent = ({ provider }) => {
  console.log(provider)
  const [feedbacks] = useState([
    {
      id: 1,
      userName: "Rajesh Kumar",
      rating: 5,
      date: "2 days ago",
      comment:
        "Excellent service! Very professional and fixed my plumbing issue quickly.",
      verified: true,
      helpful: 12,
      serviceType: "Plumbing",
    },
    {
      id: 2,
      userName: "Priya Sharma",
      rating: 4,
      date: "1 week ago",
      comment:
        "Good work and on time. Pricing was reasonable and transparent.",
      verified: true,
      helpful: 8,
      serviceType: "Plumbing",
    },
    {
      id: 3,
      userName: "Amit Patel",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Solved a problem others couldn’t fix. Worth every rupee.",
      verified: false,
      helpful: 15,
      serviceType: "Plumbing",
    },
  ]);

  const [filter, setFilter] = useState("all");

  useEffect(() => {
      
       const feedBackData=async()=>{
            const data=await fetch(`${Api}/api/feedBackGet/getFeedback`,{
                method:"Put",
                headers:{
                  "Content-Type":"Application/json"
                },
                body:JSON.stringify({email:provider.email})
            });
            const result=await data.json()
            console.log(result)
       }
       feedBackData()

  }, [provider.email]);

  const filteredFeedbacks =
    filter === "all"
      ? feedbacks
      : feedbacks.filter((f) => f.rating === Number(filter));

  const ratingStats = {
    average: (
      feedbacks.reduce((a, b) => a + b.rating, 0) /
      feedbacks.length
    ).toFixed(1),
    total: feedbacks.length,
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-sm ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* HEADER */}
      <div className="sticky top-0 bg-white border-b px-5 py-4 z-10">
        <h2 className="text-lg font-semibold">
          {provider.name} Reviews
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="font-medium text-gray-900">
            {ratingStats.average}
          </span>
          {renderStars(Math.round(ratingStats.average))}
          <span>({ratingStats.total})</span>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mt-3">
          {["all", 5, 4, 3, 2, 1].map((r) => (
            <button
              key={r}
              onClick={() => setFilter(String(r))}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                filter === String(r)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {r === "all" ? "All" : `${r}★`}
            </button>
          ))}
        </div>
      </div>

      {/* REVIEWS */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {filteredFeedbacks.map((f, idx) => (
          <div
            key={f.id}
            className="bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                {getInitials(f.userName)}
              </div>

              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-semibold text-sm">
                    {f.userName}
                  </span>
                  <span className="text-xs text-gray-400">
                    {f.date}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  {renderStars(f.rating)}
                  {f.verified && (
                    <span className="text-xs text-green-600 font-medium">
                      Verified
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 mt-2">
                  {f.comment}
                </p>
              </div>
            </div>
          </div>
        ))}

        {filteredFeedbacks.length === 0 && (
          <div className="text-center text-sm text-gray-400 mt-10">
            No reviews for this rating
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackComponent;
