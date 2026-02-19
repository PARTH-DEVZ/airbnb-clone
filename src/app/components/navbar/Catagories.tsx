'use client'
import { usePathname, useSearchParams } from "next/navigation";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { GiBarn, GiBoatFishing, GiCactus, GiCampingTent, GiCastle, GiCaveEntrance, GiFarmTractor, GiForestCamp, GiGreekTemple, GiIsland, GiJungle, GiPalmTree, GiSailboat, GiTreehouse, GiUndergroundCave, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

import Container from "../Container";
import CategoryBox from "../CategoryBox";


export const categories = [
    {
        label: "Beach",
        icon: TbBeach,
        description: "This property is close to the beach!"
    },
    {
        label: "Windmills",
        icon: GiWindmill,
        description: "This property has Windmills!"
    },
    {
        label: "Modern",
        icon: MdOutlineVilla,
        description: "This property is Modern!"
    },
    {
        label: "Countryside",
        icon: TbMountain,
        description: "This property is in the Countryside!"
    },
    {
        label: "Pools",
        icon: TbPool,
        description: "This property has a Pool!"
    },
    {
        label: "Islands",
        icon: GiIsland,
        description: "This property is on an Island!"
    },
    {
        label: "Lake",
        icon: GiBoatFishing,
        description: "This property is close to a Lake!"
    },
    {
        label: "Skiing",
        icon: FaSkiing,
        description: "This property has Skiing Activities!"
    },
    {
        label: "Castles",
        icon: GiCastle,
        description: "This property is in a Castle!"
    },
    {
        label: "Arctic",
        icon: BsSnow,
        description: "This property is in a Snowy Region!"
    },
    {
        label: "Cave",
        icon: GiCaveEntrance,
        description: "This property is in a Cave!"
    },
    {
        label: "Desert",
        icon: GiCactus,
        description: "This property is in the Desert!"
    },
    {
        label: "Barns",
        icon: GiBarn,
        description: "This property is in a Barn!"
    },
    {
        label: "Treehouse",
        icon: GiTreehouse,
        description: "This property is in a Treehouse!"
    },
    {
        label: "Tropical",
        icon: GiPalmTree,
        description: "This property is in a Tropical Area!"
    },
    {
        label: "Boats",
        icon: GiSailboat,
        description: "This property is a Boat Stay!"
    },
    {
        label: "Campers",
        icon: GiCampingTent,
        description: "This property is a Camper or Tent!"
    },
    {
        label: "Historical",
        icon: GiGreekTemple,
        description: "This property is a Historical Site!"
    },
    {
        label: "Jungle",
        icon: GiJungle,
        description: "This property is in a Jungle!"
    },
    {
        label: "Farm",
        icon: GiFarmTractor,
        description: "This property is on a Farm!"
    },
    {
        label: "Mansions",
        icon: MdOutlineVilla,
        description: "This property is a Mansion!"
    },
    
    {
        label: "Underground",
        icon: GiUndergroundCave,
        description: "This property is Underground!"
    },
    {
        label: "Luxury",
        icon: IoDiamond,
        description: "This property is Luxurious!"
    }
];


const Categories = () => {
    const params = useSearchParams();
    const category= params?.get('Category');
    const pathname = usePathname();

    const isMainPage = pathname==='/';

    if(!isMainPage){
        return null;
    }



    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item) => (
                    <CategoryBox 
                    key={item.label}
                    label={item.label}
                    selected={category===item.label}
                    icon={item.icon}
                    />
                ))}

            </div>
        </Container>
    );
};

export default Categories;
