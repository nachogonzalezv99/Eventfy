import { useAppContext } from "../context/appContext"
import Wrapper from "../assets/wrappers/EventCard"

const EventInfo = () => {
    const {
        eventName,
        eventDescription,
        eventImg
    } = useAppContext()
    return (
        <Wrapper>
            <div className="card">
                <div className="card-image__container">
                    <img className="card__img" src={eventImg} alt={eventImg} />
                </div>
                <div className="card__content">
                    <h2 >{eventName}</h2>
                    <p>{eventDescription}</p>
                </div>
            </div>
        </Wrapper>
    )
}
export default EventInfo