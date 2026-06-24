import type { Metadata } from "next";
import KabinetClient from "./KabinetClient";

export const metadata: Metadata = {
  title: "Şəxsi Kabinet - FerdiNet",
  description: "FerdiNet şəxsi kabinetinə daxil olun, balansınızı və hesabınızın statusunu yoxlayın.",
};

export default function Page() {
  return <KabinetClient />;
}
