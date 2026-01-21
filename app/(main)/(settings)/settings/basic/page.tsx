import { Basic } from "@/components/main/settings/basic";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = { title: "Basic Settings" };

export default function page() {
  return <Basic />;
}
