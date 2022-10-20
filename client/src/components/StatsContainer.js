import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa"
import Wrapper from "../assets/wrappers/StatsContainer"
import { useAppContext } from "../context/appContext"
import StatsItem from "./StatsItem"

const StatsContainer = () => {
    const { events, activities } = useAppContext()
    const defaultStats = [
        {
            title: 'all events',
            count: events.length || 0,
            icon: <FaSuitcaseRolling />,
            color: '#e9b949',
            bcg: '#fcefc7'
        },
        {
            title: 'all activities',
            count: activities.length || 0,
            icon: <FaCalendarCheck />,
            color: '#647acb',
            bcg: '#e0e8f9'
        },
    ]
    return (
        <Wrapper>
            {defaultStats.map((item, index) => {
                return <StatsItem key={index} {...item} />
            })}
        </Wrapper>
    )
}

export default StatsContainer