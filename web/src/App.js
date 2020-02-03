import React, { useState } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";

const urlParams = new URLSearchParams(window.location.search);
const App = () => {
  let [zoom] = useState(urlParams.get("zoom") || 19)
  let [animate] = useState(true)
  let [position, setPosition] = useState([35.664035, 139.698212])
  let [positionMe, setPositionMe] = useState([35.664035, 139.698212])

  const SUB = gql`
    subscription {
      newMarker {
        location {
          latitude
          longitude
        }
      }
    }
`

  const { error } = useSubscription(SUB, {
    onSubscriptionData: ({ subscriptionData: { data: { newMarker: { location: { latitude, longitude } } } } }) => {
      setPositionMe([latitude, longitude])
    }
  })

  const handleClick = (e) => {
    console.log(e.latlng)
    setPosition([e.latlng.lat, e.latlng.lng])
  }

  if (error) return <div>{error.message}</div>

  return (
    <div style={{ boxSizing: "border-box", height: "100vh", widht: "100vw", border: "5px solid blue" }}>
      <Map
        animate={animate}
        center={position}
        zoom={zoom}
        length={4}
        onClick={(e) => handleClick(e)}
        style={{ height: "99%", border: "5px dotted red" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={positionMe} />
      </Map>
    </div>
  );
}

export default App;
