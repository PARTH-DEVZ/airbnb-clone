import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";
import axios from "axios";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isUpdating, setIsUpdating] = useState(false); // Prevent multiple fast clicks

  // Dynamically derive `hasFavorited` from `currentUser.favoriteIds`
  const hasFavorited = useMemo(() => {
    return currentUser?.favoriteIds?.includes(listingId) ?? false;
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        console.log("Opening login modal because currentUser is undefined");
        return loginModal.onOpen();
      }

      if (isUpdating) return; // Prevent spam clicks
      setIsUpdating(true);

      try {
        if (hasFavorited) {
          await axios.delete(`/api/favourites/${listingId}`);
        } else {
          await axios.post(`/api/favourites/${listingId}`);
        }

        router.refresh(); // Ensure updated user data is fetched
      } catch (error) {
        console.error("Error toggling favorite:", error);
      } finally {
        setIsUpdating(false);
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router, isUpdating]
  );

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
