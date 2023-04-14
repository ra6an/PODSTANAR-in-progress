//
import { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoicmE2YW4iLCJhIjoiY2w0azB4dTFiMGk2cjNjcWZlYm85em93dSJ9.Mmuhu2HBG53aO93cqV0VyA";

const Map = (props) => {
  const coordinates = props.data.address.coordinates;
  const map = useRef(null);
  const mapContainer = useRef(null);
  // const [lng, setLng] = useState(1);
  const [lng, setLng] = useState(props.data.address.coordinates[0]);
  // const [lat, setLat] = useState(1);
  const [lat, setLat] = useState(props.data.address.coordinates[1]);
  // const [zoom, setZoom] = useState(16);

  useEffect(() => {
    if (
      !props.data.address.coordinates[0] ||
      !props.data.address.coordinates[1]
    ) {
      setLng(1);
      setLat(1);
    }
  }, [props.data.address.coordinates]);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/ra6an/cl0o72plb00ax14ld0oewn026",
      center:
        !coordinates[0] || !coordinates[1] ? [18.35644, 43.84864] : [lng, lat],
      zoom: 16,
      interactive: false,
    });

    const el = document.createElement("div");
    el.className = "marker";

    new mapboxgl.Marker({ element: el, anchor: "bottom" })
      .setLngLat(
        !coordinates[0] || !coordinates[1] ? [18.35644, 43.84864] : [lng, lat]
      )
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<p>samo da vidimo radi li</p>`
        )
      )
      .addTo(map.current);

    return () => map.current.remove();
  }, [lat, lng, props.data.address, coordinates]);

  // MARKER

  // map.current.on("load", async () => {
  //   map.current.flyTo({
  //     center: [lng, lat],
  //   });
  // });

  // useEffect(() => {
  //   if (!map.current) return;
  //   map.current.on("move", () => {
  //     setLng(map.current.getCenter().lng.toFixed(4));
  //     setLat(map.current.getCenter().lat.toFixed(4));
  //     setZoom(map.current.getZoom().toFixed(2));
  //   });
  // }, [props.usersCoordinates]);

  return (
    <div className="map-container">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default Map;
