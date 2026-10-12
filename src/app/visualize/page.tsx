import type { Metadata } from "next";
import VisualizeMahiClient from "./VisualizeMahiClient";

export const metadata: Metadata = {
  title: "VISUALIZE MAHI | Interactive Cricket Analytics | Captain Cool: Decoded",
  description:
    "Explore MS Dhoni's international career, batting evolution, opponent records, wicketkeeping contributions, finishing ability, and captaincy through interactive visualizations built from verified cricket data.",
};

export default function VisualizePage() {
  return <VisualizeMahiClient />;
}
