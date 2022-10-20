
import { GoLocation } from "react-icons/go"
import { BiTimeFive } from "react-icons/bi"
import { NavLink } from "react-router-dom"
import Wrapper from "../assets/wrappers/EventCard"
import moment from 'moment'

function EventCard({ _id, name, img, company, description, location, date }) {

    let dateDisplay = moment(date)
    let monthDisplay = dateDisplay.format('MMM')
    let dayDisplay = dateDisplay.format('D')
    dateDisplay = dateDisplay.format('MMM Do, YYYY')

    return (
        <Wrapper>
            <NavLink
                to={"/" + _id}
            >
                <div className="card card-btn">
                    <div className="card-image__container">
                        <img className="card__img" src={img} alt={name} />
                    </div>

                    <div className="card__content">
                        <div className="card__top">
                            <div className="card__left">
                                <h3 className="card__title">{name}</h3>
                                <p className="card__company">by {company}</p>
                            </div>
                            <div className="card__right">
                                <p>{dayDisplay} </p>
                                <p className="bold">{monthDisplay}</p>
                            </div>
                        </div>
                        <p className="card__text">{description.substring(0, 100)} ...</p>
                        <div className="card__bottom">
                            <p>{location} <GoLocation className="icon" /> </p>
                            <p>{dateDisplay}  <BiTimeFive className="icon" /></p>
                        </div>
                    </div>
                </div>
            </NavLink>
        </Wrapper>

    )
}

export default EventCard