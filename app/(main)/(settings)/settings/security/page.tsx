import { Security } from "@/components/main/settings/security";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = { title: "Security Settings" };

export default function page() {
  return <Security />;
}
