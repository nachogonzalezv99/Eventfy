import { useEffect } from "react";
import { Loading } from "../components";
import ActivityCard from "../components/ActivityCard";
import EventInfo from "../components/EventInfo";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/JobsContainer";
import Map3 from "../components/Map3";
import { Link, useParams } from "react-router-dom";


function SingleEvent() {
    const { id: eventId } = useParams()
    const {
        isLoading,
        getActivities,
        activities,
        selectedEvent,
        allCategories,
        getSingleEvent,
        handleChange,
        clearActivity,
        activitySearchName,
        activitySort,
        activityCategories
    } = useAppContext()

    useEffect(() => {
        clearActivity()
        getSingleEvent(eventId)
    }, [])

    useEffect(() => {
        getActivities({eventId})

    }, [selectedEvent, activitySearchName, activitySort, activityCategories])

    return (
        <div>
            <div className="main">
                <div className="container">
                    <br />
                    <br />
                    <EventInfo />


                    <section>
                        <h2 className="title">Popular Categories</h2>
                        <div className="categories-container">

                            {
                                allCategories?.map((category, i) => {
                                    return (
                                        <Link
                                            key={i}
                                            to={`/${selectedEvent}/searcher`}
                                            onClick={() => handleChange({ name: 'activityCategories', value: [].concat(category) })}
                                        >
                                            <div className="category">{category}</div>
                                        </Link>
                                    )
                                })
                            }

                        </div>

                    </section>
                    <Map3 />

                    <section>
                        <h2 className="title">Popular Activities</h2>

                        <div className="activities-container">
                            {isLoading ? (
                                <Loading center />
                            ) : (activities.length === 0) ? (
                                <Wrapper>
                                    <h2>No activities to display</h2>
                                </Wrapper>
                            ) : (
                                activities.slice(0, 6).map(item => <ActivityCard key={item._id} {...item} />)
                            )}

                        </div>

                    </section>

                </div>
            </div>
        </div>
    )
}
export default SingleEvent;