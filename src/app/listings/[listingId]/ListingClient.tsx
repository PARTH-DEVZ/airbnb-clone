'use client';
import { differenceInCalendarDays } from "date-fns";
import { useMemo } from "react";
import { Listing, Reservation } from "@prisma/client";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { categories } from "@/app/components/navbar/Catagories";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal"
import { useRouter } from "next/navigation";
import { eachDayOfInterval } from "date-fns";
import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { Range } from "react-date-range";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}

interface ListingClientProps {
  reservations?:SafeReservation[];
  listing: Listing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({ listing, currentUser, reservations = [] }) => {
  const loginModal = useLoginModal();
  const router = useRouter()

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success('Listing Reserved! ')
        setDateRange(initialDateRange)
        router.push('/trips')
      })
      .catch((error) => {
        toast.error('Something went Wrong')
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

  }, [currentUser, dateRange, listing?.id, loginModal, totalPrice, router]);


  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing]);



  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

return (
  <Container>
    <div className="max-w-screen-xl mx-auto px-4">
      <div className="flex flex-col gap-10">

        {/* Header */}
        <ListingHead
          title={listing.title}
          imageSrc={listing.imageSrc}
          locationValue={listing.locationValue}
          id={listing.id}
          currentUser={currentUser}
        />

        {/* Main Section */}
        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-12 mt-4">

          {/* Left Section */}
          <div className="md:col-span-4 flex flex-col gap-8">
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <ListingInfo
                user={listing.user}
                category={category}
                description={listing.description}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bathroomCount}
                locationValue={listing.locationValue}
              />
            </div>
          </div>

          {/* Right Section - Reservation Card */}
          <div className="order-first mb-10 md:order-last md:col-span-3">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl border p-6 transition hover:shadow-2xl">
                <ListingReservation
                  price={listing.price}
                  totalPrice={totalPrice}
                  onChangeDate={(value) => setDateRange(value)}
                  dateRange={dateRange}
                  onSubmit={onCreateReservation}
                  disabled={isLoading}
                  disabledDates={disabledDates}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </Container>
);
};

export default ListingClient;
