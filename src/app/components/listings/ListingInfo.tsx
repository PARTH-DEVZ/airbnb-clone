import { SafeUser } from "@/app/types";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IconType } from "react-icons";
import { IoPeopleOutline } from "react-icons/io5";
import { MdOutlineBedroomParent, MdOutlineBathroom } from "react-icons/md";
import Avatar from "../Avatar";
import useCountries from "@/app/hooks/useCountries";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import Image from "next/image";

interface ListingInfoProps {
    user: SafeUser;
    description: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    category?: {
        icon: IconType;
        label: string;
        description: string;
    };
    locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    category,
    locationValue,
}) => {
    const { getByValue } = useCountries();
    const coordinates = getByValue(locationValue)?.latlng;
    const centers = coordinates ? [coordinates] : [];

    const Map = dynamic(() => import('../Map'), {
        ssr: false,
    });

    return (
        <div className="col-span-4 flex flex-col gap-6">

            {/* Amenities Section */}
            <div className="flex flex-col gap-4">
                <hr />
                <div className="flex items-center gap-3 py-2">
                    <AiOutlineCheckCircle className="w-6 h-6 text-rose-400" />
                    <h2 className="text-xl font-semibold">Amenities</h2>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center justify-center bg-neutral-50 border border-neutral-200 rounded-xl py-4 gap-2 hover:shadow-sm transition">
                        <IoPeopleOutline className="w-6 h-6 text-neutral-600" />
                        <span className="text-sm font-medium text-neutral-700">{guestCount} Guests</span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-neutral-50 border border-neutral-200 rounded-xl py-4 gap-2 hover:shadow-sm transition">
                        <MdOutlineBedroomParent className="w-6 h-6 text-neutral-600" />
                        <span className="text-sm font-medium text-neutral-700">{roomCount} Rooms</span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-neutral-50 border border-neutral-200 rounded-xl py-4 gap-2 hover:shadow-sm transition">
                        <MdOutlineBathroom className="w-6 h-6 text-neutral-600" />
                        <span className="text-sm font-medium text-neutral-700">{bathroomCount} Bathrooms</span>
                    </div>
                </div>
                <hr />
            </div>

            {/* Category Section */}
            {category && (
                <div className="flex flex-col gap-4">
                    <ListingCategory
                        icon={category.icon}
                        label={category.label}
                        description={category.description}
                    />
                    <hr />
                </div>
            )}

            {/* Description Section */}
            <div className="flex flex-col gap-3">
                <h2 className="text-xl font-semibold">About this place</h2>
                <p className="text-base font-light text-neutral-500 leading-relaxed">
                    {description}
                </p>
                <hr />
            </div>

            {/* Map Section */}
            <div className="flex flex-col gap-3">
                <h2 className="text-xl font-semibold">Where you&apos;ll be</h2>
                <div className="rounded-xl overflow-hidden border border-neutral-200 shadow-sm">
                    <Map centers={centers} />
                </div>
                <hr />
            </div>

            {/* Host Section */}
            <div className="flex items-center gap-4 py-2">
                <div className="relative">
                    <Image
                        src={user?.image}
                        alt="User Icon"
                        width={56}
                        height={56}
                        className="rounded-full object-cover ring-2 ring-rose-100"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-lg font-semibold">Hosted by {user?.name}</span>
                    <span className="text-sm font-light text-neutral-400">Airbnb Account since 2025</span>
                </div>
            </div>

            <hr />
        </div>
    );
};

export default ListingInfo;