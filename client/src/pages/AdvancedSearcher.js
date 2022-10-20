import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../assets/wrappers/JobsContainer";
import { Loading } from "../components";
import ActivityCard from "../components/ActivityCard";
import AdvancedFilter from "../components/AdvancedFilter";
import PageBtnContainer from "../components/PageBtnContainer";
import { useAppContext } from "../context/appContext";

function AdvancedSearcher() {
    const { id: eventId } = useParams()
    const {
        activities,
        isLoading,
        activitySearchName,
        getActivities,
        activitySort,
        numOfPages,
        page,
        activityCategories,
        selectedEvent,
        getSingleEvent
    } = useAppContext()

    useEffect(() => {
        getSingleEvent(eventId)

    }, [])

    useEffect(() => {
        getActivities({eventId, pagination: true})
        //eslint-disabled-next-line
    }, [selectedEvent, activitySearchName, activitySort, page, activityCategories])

    return ( 
        <div >

            <div className="full-width">
                <div className="top">
                    <h1>Find Activities</h1>
                </div>
                <div className="aside">
                    <AdvancedFilter />
                </div>
                <div className="content">
                    <div className="activities-container">
                        {isLoading ? (
                            <Loading center />
                        ) : (activities.length === 0) ? (
                            <Wrapper>
                                <h2>No activities to display</h2>
                            </Wrapper>
                        ) : (
                            activities.map(item => <ActivityCard key={item._id} {...item} />)
                        )}

                    </div>
                    {numOfPages > 1 && <PageBtnContainer />}
                </div>
            </div>
        </div>

    )
}

export default AdvancedSearcher