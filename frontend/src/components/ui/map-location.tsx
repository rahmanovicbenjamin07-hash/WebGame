import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LocationPicker } from "./MapLocationPicker";
import { defaultIcon } from "./MapDefaultsIcon";
import { getLocationName } from "@/utils/LocationName";

interface LocationMapProps {
  lat: number;
  lng: number;
  onLocationSelect: (lat: number, lng: number, name: string) => void;
  className?: string;
}

const LocationMap = ({ lat, lng, onLocationSelect, className = "h-63.75" }: LocationMapProps) => {
  return (
    <MapContainer center={[44.6131, 17.9867]} zoomControl={false} zoom={7} className={`w-full rounded-[19px] z-0 ${className}`}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationPicker onLocationSelect={async (lat, lng) => {
        const name = await getLocationName(lat, lng);
        onLocationSelect(lat, lng, name);
      }} />
      {lat !== 0 && lng !== 0 && <Marker position={[lat, lng]} icon={defaultIcon} />}
    </MapContainer>
  );
};

export default LocationMap;