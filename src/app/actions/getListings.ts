import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export async function getListings(searchParams: Record<string, string>) {

  try {
    const {
      userId,
      roomCount,
      guestCount,
      locationValue,
      bathroomCount,
      startDate,
      endDate,
      category,
    } = searchParams;

    let query: any = {};

    if (userId) query.userId = userId;
    if (category) query.category = category;
    if (roomCount) query.roomCount = { gte: +roomCount };
    if (guestCount) query.guestCount = { gte: +guestCount };
    if (bathroomCount) query.bathroomCount = { gte: +bathroomCount };
    if (locationValue) query.locationValue = locationValue;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      query.NOT = {
        reservations: {
          some: {
            AND: [
              { startDate: { lte: end } },
              { endDate: { gte: start } },
            ],
          },
        },
      };
    }
   

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: [
        {
          locationValue: locationValue ? "asc" : undefined,
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch listings");
  }
}
