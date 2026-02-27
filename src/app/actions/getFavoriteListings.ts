import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getFavoriteListings = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) return [];

    const favorites = await prisma.listing.findMany({
        where: {
            id: {
                in: [...(currentUser.favoriteIds || [])]
            }
        }
    });

    const safeFavorites = favorites.map((favorite) => ({
        ...favorite,
        createdAt: favorite.createdAt.toISOString(),
    }));

    return safeFavorites;
};

export default getFavoriteListings;