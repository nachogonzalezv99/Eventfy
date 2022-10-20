import { useEffect } from "react"
import Wrapper from "../assets/wrappers/JobsContainer"
import { useAppContext } from "../context/appContext"
import Event from "./Event"
import Loading from "./Loading"
import PageBtnContainer from "./PageBtnContainer"

const EventsContainer = () => {
    const {
        getEvents,
        events,
        isLoading,
        page,
        total,
        numOfPages,
        clearValues
    } = useAppContext()

    useEffect(() => {
        getEvents()
        //eslint-disabled-next-line
    }, [page])

    useEffect(() => {
        clearValues()
        //eslint-disabled-next-line
    }, [])

    if (isLoading) {
        return <Loading center />
    }
    if (events.length === 0) {
        return (
            <Wrapper>
                <h2>No events to display</h2>
            </Wrapper>
        )
    }
    return (
        <Wrapper>
            <h5>{total} event{events.length > 1 && 's'}</h5>
            <div className="jobs">
                {events.map(event => {
                    return <Event key={event._id} {...event} />
                })}
            </div>
            {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>
    )
}

export default EventsContainer