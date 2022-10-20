import { useEffect } from "react"
import Wrapper from "../assets/wrappers/EventsPage"
import { Loading } from "../components"
import EventCard from "../components/EventCard"
import { useAppContext } from "../context/appContext"

function Events() {

    const {
        getEvents,
        events,
        isLoading,
        page
    } = useAppContext()

    useEffect(() => {
        getEvents()
        //eslint-disabled-next-line
    }, [page])


    return (
        <Wrapper>
            <div className="hero">
                <div className="container">
                    <div className="hero-container">
                        <h1 className="hero__title">¡No te pierdas nada!</h1>
                        <p className="hero__text">Encuentra las actividades, tiendas y servicios en los eventos a los que asistas</p>
                    </div>
                </div>
            </div>
            <section className={"main"}>

                <div className="container">

                    <h2 className="title">Latest Events</h2>
                    {isLoading ? (
                        <Loading center />
                    ) : (events.length === 0) ? (
                        <Wrapper>
                            <h2>No events to display</h2>
                        </Wrapper>
                    ) : (
                        events.map(item => <EventCard key={item._id} {...item} />)
                    )

                    }
                </div>
            </section>
        </Wrapper>
    )
}

export default Events