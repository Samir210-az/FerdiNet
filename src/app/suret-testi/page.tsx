import type { Metadata } from "next";
import SuretTestiClient from "./SuretTestiClient";

export const metadata: Metadata = {
  title: "Sürət Testi - FerdiNet",
  description: "FerdiNet real internet sürət testi — ping, endirmə və yükləmə sürətini real ölçün.",
};

export default function Page() {
  return <SuretTestiClient />;
}
