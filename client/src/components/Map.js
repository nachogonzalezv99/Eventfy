import { GoogleMap, LoadScript, DrawingManager, Polygon } from '@react-google-maps/api';
import { useAppContext } from '../context/appContext';

const mapContainerStyle = {
    height: "600px"
}

const options = {
    fillColor: "black",
    fillOpacity: .3,
    strokeColor: "black",
    strokeOpacity: .9,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1
}

export default function Map() {

    const {
        handleChange,
        eventCoordinates,
        eventZoom,
        eventPaths
    } = useAppContext()

    const onPolygonComplete = poly => {
        poly.visible = false;
        const polyArray = poly.getPath().getArray();
        let paths = [];
        polyArray.forEach(function (path) {
            paths.push({ lat: path.lat(), lng: path.lng() });
        });

        handleChange({ name: 'eventPaths', value: paths })
        handleChange({ name: 'eventCoordinates', value: { lat: poly.map.center.lat(), lng: poly.map.center.lng() } })
        handleChange({ name: 'eventZoom', value: poly.map.zoom })
    }

    const onMarkerComplete = poly => {
        handleChange({ name: 'activityCoordinates', value: { lat: poly.position.lat(), lng: poly.position.lng() } })
    }



    return (
        <div className='mapa'>
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_MAPS_API_KEY}
                libraries={['drawing']}
            >
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={{ lat: Number(eventCoordinates?.lat), lng: Number(eventCoordinates?.lng) }}
                    zoom={Number(eventZoom)}
                >
                    <DrawingManager
                        onPolygonComplete={onPolygonComplete}
                        onMarkerComplete={onMarkerComplete}
                        options={{
                            drawingControlOptions: {
                                drawingModes: ['polygon']
                            }
                        }
                        }

                    />

                    <Polygon
                        paths={eventPaths}
                        options={options}
                    />
                </GoogleMap>
            </LoadScript>
        </div>
    );
}