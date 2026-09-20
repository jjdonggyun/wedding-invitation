import { WeddingBook } from "@/components/WeddingBook";
import { getImagePlan } from "@/lib/image-config";

export default function Home() {
  return <WeddingBook images={getImagePlan()} />;
}
