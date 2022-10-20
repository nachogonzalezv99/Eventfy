import { useEffect } from "react"
import Wrapper from "../assets/wrappers/JobsContainer"
import { useAppContext } from "../context/appContext"
import Activity from "./Activity"
import Loading from "./Loading"
import PageBtnContainer from "./PageBtnContainer"

const ActivitiesContainer = () => {
    const {
        getActivities,
        activities,
        isLoading,
        page,
        total,
        numOfPages,
        clearActivity,
        activitySearchName,
        activitySort,
        activityCategories,
        getEvents
    } = useAppContext()

    useEffect(() => {
        getEvents()
        clearActivity()
        //eslint-disabled-next-line
    }, [])

    useEffect(() => {
        getActivities({pagination: true})
        //eslint-disabled-next-line
    }, [page, activitySearchName, activitySort, activityCategories])
  

    if (isLoading) {
        return <Loading center />
    }
    if (activities.length === 0) {
        return (
            <Wrapper>
                <h2>No activities to display</h2>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <h5>{total} activit{activities.length > 1 ? 'ies' : 'y'}</h5>
            <div className="jobs">
                {
                    activities.map(activity => {
                        return <Activity
                            key={activity._id}
                            {...activity}
                        />
                    })
                }

            </div>
            {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>
    )
}

export default ActivitiesContainer