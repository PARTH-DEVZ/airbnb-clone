
import getCurrentUser from "./actions/getCurrentUser";
import { getListings, IListingsParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import dynamic from "next/dynamic";
import useCountries from "./hooks/useCountries";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const currentUser = await getCurrentUser();
  const listings = await getListings(searchParams);
  const { getByValue } = useCountries();
  const Map = dynamic(() => import('@/app/components/Map'), {});

  const coordinates = listings
    .map((listing: any) => getByValue(listing.locationValue)?.latlng)
    .filter((coord) => coord !== undefined);

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset={true} />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div className="flex">
        {/* Listings Section - Extra space only on 2xl screens */}
        <div className="flex-1 overflow-y-auto pt-24 px-4 2xl:-[px-0] 2xl:pr-[720px]">
          <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
              {listings.map((listing: any) => (
                <ListingCard key={listing.id} data={listing} currentUser={currentUser} />
              ))}
            </div>
          </Container>
        </div>

        {/* Fixed Map (only on 2xl screens) */}
        <div className="hidden 2xl:block fixed top-0 right-0 h-screen w-[700px] p-4">
          <Map height={true} centers={coordinates} />
        </div>
      </div>
    </ClientOnly>
  );
};

export default Home;
