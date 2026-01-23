import { Business } from "@/components/main/settings/business";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = { title: "Basic Settings" };

export default function page() {
  return <Business />;
}
