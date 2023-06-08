import { useState } from "react";
import { MarkerF, InfoWindowF } from "@react-google-maps/api";

const Markers = ({ map, markers, removeMarker }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState({});

  const handleMarkerClick = ({ id, lat, lng, address }) => {
    map.panTo({ lat, lng });
    setInfoWindowData({ id, address });
    setIsOpen(true);
  };

  return (
    <div>
      {markers.map((marker) => {
        const { id } = marker;
        const { lat, lng, street_number, route, locality, icon } =
          marker.location;
        return (
          <MarkerF
            key={id}
            position={{ lat, lng }}
            icon={icon ? icon : ""}
            onClick={() =>
              handleMarkerClick({
                id,
                lat,
                lng,
                address: { street_number, route, locality },
              })
            }
            onRightClick={() => {
              setInfoWindowData({});
              setIsOpen(false);
              removeMarker && removeMarker(marker.id);
            }}
          >
            {isOpen && infoWindowData?.id === marker.id && (
              <InfoWindowF onCloseClick={() => setIsOpen(false)}>
                <div>
                  <p>
                    {infoWindowData.address.street_number && (
                      <span>{infoWindowData.address.street_number}, </span>
                    )}{" "}
                    {infoWindowData.address.route && (
                      <span> {infoWindowData.address.route}</span>
                    )}
                  </p>
                  <p>{infoWindowData.address.locality}</p>
                </div>
              </InfoWindowF>
            )}
          </MarkerF>
        );
      })}
    </div>
  );
};

export default Markers;
