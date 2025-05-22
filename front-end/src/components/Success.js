import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Always show alert for testing (you can add back sessionStorage later)
    alert("🎉 Payment Successful! Thanks for trusting us.");

    const timer = setTimeout(() => {
      navigate("/customer-profile");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="text-center py-24 text-xl text-green-600 font-semibold">
      Redirecting to your profile...
    </div>
  );
};

export default Success;
