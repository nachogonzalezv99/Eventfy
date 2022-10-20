
import { GoogleMap, LoadScript, Polygon, OverlayView } from '@react-google-maps/api';
import { useAppContext } from '../context/appContext';
import Marker from './Marker';


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
const libraries = ['drawing']

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

export default function Map3() {

    const {
        eventCoordinates,
        eventZoom,
        eventPaths,
        activityCoordinates,
        activities
    } = useAppContext()


    return (
        <div className='mapa'>
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_MAPS_API_KEY}
                libraries
            >
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={{ lat: Number(eventCoordinates?.lat), lng: Number(eventCoordinates?.lng) }}
                    zoom={Number(eventZoom)}
                >
                    <Polygon
                        paths={eventPaths}
                        options={options}
                    />
                    {activities.map((activity, i) => {
                        const {lat, lng} = activity.coordinates
                        return <OverlayView
                            key={i}
                            position={{ lat, lng }}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        >
                            <Marker name={activity.name} category={activity.category}/>
                        </OverlayView>

                    })}

                    

                </GoogleMap>
            </LoadScript>
        </div>
    );
}