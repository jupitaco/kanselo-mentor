"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/button";
import { handleError, handleSuccess } from "@/utils/helper";

const LogoutBtn = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      // await logoutAction();
      localStorage.clear();
      handleSuccess("Logout Successfull", push, "/");
    } catch (error) {
      console.log(error);
      handleError("Error while logging out");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      className="pry-btn"
      type="button"
      onClick={handleLogout}
      loading={loading}
    >
      Logout
    </Button>
  );
};

export default LogoutBtn;
