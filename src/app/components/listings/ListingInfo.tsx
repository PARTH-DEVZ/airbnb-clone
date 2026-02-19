import { SafeUser } from "@/app/types";
import { AiOutlineCheckCircle } from "react-icons/ai"; // Importing icon
import { IconType } from "react-icons";
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
    const Map = dynamic(() => import('../Map'), {
        ssr: false,
    })
    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <hr />

                

                <div className="text-xl font-semibold flex items-center gap-4 py-4">
                    <AiOutlineCheckCircle className="w-10 h-10 text-gray-600" />
                    <div>Amenities</div>
                </div>
                <div className="flex flex-row items-center gap-4  font-light text-neutral-500">
                    <div>{guestCount} guests</div>
                    <div>{roomCount} rooms</div>
                    <div>{bathroomCount} bathrooms</div>
                </div>
                <hr />
                {category && (
                    <ListingCategory
                        icon={category.icon}
                        label={category.label}
                        description={category.description}
                    />

                )}
                <hr />

                <div className="text-lg font-light text-neutral-500 py-4 ">
                    {description}
                </div>
                <hr />
                <div className="py-4">
                    <Map center={coordinates} />
                </div>
                <hr />
                

                <div className="text-xl font-semibold flex items-center gap-4 py-4">
                    <Image
                        src={user?.image}
                        alt="User Icon"
                        width={40} // Adjust size as needed
                        height={40}
                        className="rounded-full object-cover"
                    />
                    <div>
                        <div>Hosted by {user?.name}</div>
                        <div className="text-sm font-normal text-neutral-500">Airbnb Account since 2025</div>
                    </div>
                </div>

                <hr />
            </div>
        </div>
    );
};

export default ListingInfo;
