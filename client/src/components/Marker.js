import { BiCurrentLocation } from 'react-icons/bi'

const Marker = ({ name, category }) => {

    return (
        <div className="marker">
            <BiCurrentLocation className='marker-logo' />
            <div className={`marker-text category-${category}`}>
                {name}
            </div>

        </div>
    )

}

export default Marker
