import type { Metadata } from "next";
import AdminClient from "./AdminClient";

export const metadata: Metadata = {
  title: "Admin Panel - FerdiNet",
  description: "FerdiNet idarəetmə paneli",
};

export default function Page() {
  return <AdminClient />;
}
