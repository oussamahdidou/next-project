import {
  MapContainer,
  TileLayer,
  Marker,
  CircleMarker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
    location: number[];
    warehouseName: string;
  }
  
const Map: React.FC<MapProps> = ({ location, warehouseName }) => {
  return (
    <main className="d w-[50%] h-[250px] z-1">
      <div>
        <MapContainer center={location} zoom={12}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <CircleMarker
            className="n w-[150px] h-[150px]"
            center={location}
            radius={10}
            color="transparent"
            fillColor="#ea580c"
            fillOpacity={1}
          >
            <Popup>
              <p className="text-[12px]">{warehouseName} Your Ways Waherhouse</p>
            </Popup>
          </CircleMarker>
        </MapContainer>
      </div>
    </main>
  );
}

export default Map;
