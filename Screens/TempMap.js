import MapView, { Polyline } from "react-native-maps"; // for rendering
import Geojson from "react-native-geojson"; // optional: for rendering
 // for parsing your KLM string, converting it to an XML doc
import { kml } from "@tmcw/togeojson"; // for converting KLM docs to JSON
import { DOMParser } from "xmldom";
const TempMap = () => {
    const kmlStr = "bar"; // some example KML from a file or endpoint, nab it as a string
    const parser = new DOMParser();
    const routeKml = parser.parseFromString(kmlStr);
    const routeJson = kml(routeKml);
    const routeCoords = routeJson.features[0]; // where we had a walking route line feature at this index

    return (
       <MapView>
           <Polyline
               coordinates={routeCoords}
               strokeColor={"orange"}
               strokeWidth={6}
               lineCap="round"
               lineDashPattern={[0]}
            />
            
       </MapView>
       
    )
}

export default TempMap;