"use client";

import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect } from "react";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

interface MapProps {
    centers?: number[][]; // Now supports multiple coordinates
    height?: boolean;
}

// Function to fit map bounds based on markers
const FitBounds = ({ centers }: { centers: number[][] }) => {
    const map = useMap();

    useEffect(() => {
        if (centers && centers.length > 0) {
            const bounds = L.latLngBounds(centers as L.LatLngExpression[]);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [centers, map]);

    return null;
};

const Map: React.FC<MapProps> = ({ centers = [], height }) => {
    return (
        <MapContainer
            center={centers.length > 0 ? (centers[0] as L.LatLngExpression) : [51, -0.09]}
            zoom={centers.length > 0 ? 4 : 2}
            scrollWheelZoom={true}
            className={`${height ? "h-[100vh]" : "h-[35vh]"} `}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Automatically adjust the map view */}
            <FitBounds centers={centers} />

            {/* Render multiple markers */}
            {centers.map((coord, index) => (
                <Marker key={index} position={coord as L.LatLngExpression} />
            ))}
        </MapContainer>
    );
};

export default Map;
