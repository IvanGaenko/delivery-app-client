import { useState, useEffect, useMemo } from "react";
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";

import { googleMapsApiKey } from "../config";
import { useProducts, useProductsDispatch } from "../store/ProductsContext";

import CartService from "../services/cart.service";
import Markers from "./Markers";
import { getDeliveryTime } from "../utils/getDeliveryTime";

const cookingTime = 15;

const Map = ({ userMarker }) => {
  const { mapData, userLocation } = useProducts();
  const dispatch = useProductsDispatch();

  const [map, setMap] = useState(null);
  const [duration, setDuration] = useState(0);
  const [showRoute, setShowRoute] = useState(true);
  const { dealers, route } = mapData;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey,
  });

  const center = useMemo(
    () => ({
      lat: 49.99361,
      lng: 36.23276,
    }),
    []
  );

  useEffect(() => {
    setShowRoute(false);

    if (userLocation.lat) {
      if (dealers.length !== 0) {
        addMarker({
          latLng: {
            lat: () => userLocation.lat,
            lng: () => userLocation.lng,
          },
        });
      }
    }

    if (userMarker) {
      addMarker({
        latLng: {
          lat: () => userMarker.lat,
          lng: () => userMarker.lng,
        },
      });
    }
    return () => {
      if (route) {
        dispatch({
          type: "updateRoute",
          route: null,
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dealers, userMarker]);
  // eslint-enable-next-line react-hooks/exhaustive-deps

  const onLoad = (map) => {
    if (dealers.length > 0) {
      const firstLoc = dealers.length === 1 ? [{ location: center }] : [];
      const user =
        userLocation.lat === null ? [] : [{ location: userLocation }];
      const bounds = new window.google.maps.LatLngBounds();
      [...firstLoc, ...dealers, ...user].forEach(({ location }) =>
        bounds.extend({ lat: location.lat, lng: location.lng })
      );
      map.fitBounds(bounds);
    }

    setMap(map);
  };

  const getDirection = async (coords) => {
    const directionsService = new window.google.maps.DirectionsService();
    let origin = null;
    let distance = 0;
    const waypoints = [];
    let route = null;
    let durationString = "";

    if (dealers.length > 0 && coords) {
      for (let i = 0; i < dealers.length; i++) {
        const result = await directionsService.route({
          origin: dealers[i].location,
          destination: coords,
          optimizeWaypoints: true,
          travelMode: window.google.maps.TravelMode.DRIVING,
        });

        const resultDistance = result.routes[0].legs[0].distance.value;

        if (origin === null) {
          origin = dealers[i].location;
          distance = resultDistance;
        } else {
          if (resultDistance > distance) {
            waypoints.push({ location: origin, stopover: true });
            origin = dealers[i].location;
          } else {
            waypoints.push({ location: dealers[i].location, stopover: true });
          }
        }
      }

      route = await directionsService.route({
        origin,
        destination: coords,
        waypoints,
        optimizeWaypoints: true,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });

      const calculateDuration = route.routes[0].legs.reduce((sum, current) => {
        return sum + current.duration.value;
      }, 0);

      durationString = getDeliveryTime(
        calculateDuration,
        cookingTime,
        dealers.length
      );

      setDuration(durationString);
    }

    dispatch({
      type: "updateRoute",
      route,
      duration: durationString,
    });
  };

  const addMarker = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setShowRoute(true);
    const address = await CartService.getAdressFromLatLng({ lat, lng });
    await getDirection({ lat, lng });

    const userLocation = {
      street_number: address.street_number ? address.street_number : "",
      route: address.route ? address.route : "",
      locality: address.locality ? address.locality : "",
      lat,
      lng,
    };
    const calculateStreetNumber = userLocation.street_number
      ? `${userLocation.street_number}, `
      : "";
    const calculateRoute = userLocation.route ? `${userLocation.route}, ` : "";
    const calculateLocality = userLocation.locality
      ? `${userLocation.locality}`
      : "";
    userLocation.address =
      calculateRoute + calculateStreetNumber + calculateLocality;

    dispatch({
      type: "updateUserLocation",
      payload: userLocation,
    });
  };

  const removeMarker = () => {
    setShowRoute(false);

    dispatch({
      type: "updateUserLocation",
      payload: {
        street_number: "",
        route: "",
        locality: "",
        lat: null,
        lng: null,
        address: "",
      },
    });

    dispatch({
      type: "updateRoute",
      route: null,
    });
  };

  return (
    <div className="absolute w-full p-3">
      <div className="w-full min-w-full h-[240px] min-h-[240px] flex flex-col mb-1">
        {isLoaded ? (
          <>
            <GoogleMap
              mapContainerClassName="h-full w-full bg-blue-300 rounded-xl shadow-xl"
              center={center}
              zoom={10}
              onLoad={onLoad}
              onUnmount={() => setMap(null)}
              onClick={addMarker}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            >
              <Markers map={map} markers={dealers} />
              {userLocation.lat && (
                <Markers
                  map={map}
                  markers={[{ id: 1, location: userLocation }]}
                  removeMarker={removeMarker}
                />
              )}
              {showRoute && (
                <DirectionsRenderer
                  map={map}
                  directions={route ? route : undefined}
                  options={{ suppressMarkers: true }}
                />
              )}
            </GoogleMap>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <p className="px-3 text-sm">
        {showRoute && duration.length > 0 && <span>{duration}</span>}
      </p>
    </div>
  );
};

export default Map;
