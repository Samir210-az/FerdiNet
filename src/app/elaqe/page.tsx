import type { Metadata } from "next";
import ElaqeClient from "./ElaqeClient";

export const metadata: Metadata = {
  title: "Əlaqə - FerdiNet",
  description: "FerdiNet ilə əlaqə saxlayın — telefon, email, ünvan və əlaqə forması.",
};

export default function Page() {
  return <ElaqeClient />;
}
