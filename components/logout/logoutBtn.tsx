"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/button";
import { handleError, handleSuccess } from "@/utils/helper";
import { logoutAction } from "@/libs/actions/auth.actions";
import { useSocketContext } from "@/context/socketContext";
import { useAuthContext } from "@/context/authContext";
import { UserData } from "@/types/auths";

const LogoutBtn = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const { connectSocket } = useSocketContext();
  const { setCurrentUserData, setUserData } = useAuthContext();

  const handleLogout = async () => {
    try {
      setLoading(true);
      connectSocket?.disconnect();
      await logoutAction();
      localStorage.clear();
      setCurrentUserData({} as UserData);
      setUserData({ code: "", email: "", id: "" });
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
