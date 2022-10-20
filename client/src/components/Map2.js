
import { GoogleMap, LoadScript, DrawingManager, Polygon, Marker } from '@react-google-maps/api';
import { useEffect } from 'react';
import { useAppContext } from '../context/appContext';

const mapContainerStyle = {
    height: "600px"
}
const defaultProps = {
    center: {
        lat: 0,
        lng: 0
    },
    zoom: 17
};

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

export default function Map2() {

    const {
        handleChange,
        eventCoordinates,
        eventZoom,
        eventPaths,
        activityCoordinates,
        isEditing,
        clearValues
    } = useAppContext()

    const onMarkerComplete = poly => {
        handleChange({ name: 'activityCoordinates', value: { lat: poly.position.lat(), lng: poly.position.lng() } })
        poly.visible = false;
    }

    useEffect(() => {
        if (!isEditing) clearValues()
    }, [])

    return (
        <div className='mapa'>
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_MAPS_API_KEY}
                libraries={['drawing']}
            >
                {console.log("rendered")}
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={{ lat: Number(eventCoordinates?.lat), lng: Number(eventCoordinates?.lng) }}
                    zoom={Number(eventZoom)}
                >
                    <DrawingManager
                        onMarkerComplete={onMarkerComplete}
                        options={{
                            drawingControlOptions: {
                                drawingModes: ['marker']
                            }
                        }
                        }
                    />
                    <Polygon
                        paths={eventPaths}
                        options={options}
                    />

                    <Marker
                        position={{ lat: Number(activityCoordinates?.lat), lng: Number(activityCoordinates?.lng) }}
                    />

                </GoogleMap>
            </LoadScript>
        </div>
    );
}