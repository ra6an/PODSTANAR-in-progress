//
import React, { useEffect, useRef, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import classes from "./GeocoderBox.module.css";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

const GeocoderBox = (props) => {
  const map = useRef(null);
  const mapContainerRef = useRef(null);

  console.log(navigator.geolocation.getCurrentPosition(getLatLon));

  function getLatLon(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log("Latitude is " + latitude);
    console.log("Longitude is " + longitude);
  }

  mapboxgl.accessToken =
    "pk.eyJ1IjoicmE2YW4iLCJhIjoiY2w0azB4dTFiMGk2cjNjcWZlYm85em93dSJ9.Mmuhu2HBG53aO93cqV0VyA";

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/ra6an/cl0o74qh8002515npk13b3n7l",
      zoom: 16,
      center: [18.386687, 43.851977],
    });

    // clean up on unmount
    return () => map.current.remove();
  }, []);

  // GEOCODING PART

  const fetchData = useCallback(() => {
    const geocodingClient = mbxGeocoding({
      accessToken: mapboxgl.accessToken,
    });

    // geocoding with countries
    return geocodingClient
      .forwardGeocode({
        query: "46 envera sehovica",
        countries: ["ba"],
        limit: 2,
      })
      .send()
      .then((response) => {
        console.log(response);
        const match = response.body;
        const coordinates = match.features[0].geometry.coordinates;
        const placeName = match.features[0].place_name;
        const center = match.features[0].center;

        return {
          type: "Feature",
          center: center,
          geometry: {
            type: "Point",
            coordinates: coordinates,
          },
          properties: {
            description: placeName,
          },
        };
      });
  }, []);

  // TRANSLATE STREET INTO LAT LNG

  useEffect(() => {
    if (!map.current) return; // Waits for the map to initialise

    const results = fetchData();

    results.then((marker) => {
      // create a HTML element for each feature
      const el = document.createElement("div");
      el.className = "marker";

      // make a marker for each feature and add it to the map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML("<p>" + marker.properties.description + "</p>")
        )
        .addTo(map.current);

      map.current.on("load", async () => {
        map.current.flyTo({
          center: marker.center,
        });
      });
    });
  }, [fetchData]);

  // GET COORDINATES ON CLICK
  useEffect(() => {
    if (!map.current) return;
    map.current.on("click", (e) => {
      console.log(e.lngLat);
    });
  }, []);

  return (
    <div className={classes["geocoder-container"]}>
      <div ref={mapContainerRef} className="map-container-geocoder" />
    </div>
  );
};

export default GeocoderBox;
