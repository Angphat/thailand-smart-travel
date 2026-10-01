import { getAllDestinations } from "@/lib/destinations";
import { getCurrentUser } from "@/lib/auth";
import ExploreClient from "./ExploreClient";

export default async function ExplorePage() {
  const destinations = await getAllDestinations();
  const user = await getCurrentUser();

  return <ExploreClient destinations={destinations} isLoggedIn={!!user} />;
}
