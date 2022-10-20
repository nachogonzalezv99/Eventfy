import { useEffect } from "react"
import Wrapper from "../assets/wrappers/JobsContainer"
import { useAppContext } from "../context/appContext"
import Loading from "./Loading"
import PageBtnContainer from "./PageBtnContainer"
import User from "./User"

const UsersContainer = () => {
    const {
        isLoading,
        getUsers,
        numOfPages,
        total,
        users,
        page,
        clearValues
    } = useAppContext()

    useEffect(() => {
        getUsers()
        //eslint-disabled-next-line
    }, [page])

    useEffect(() => {
        clearValues()
        //eslint-disabled-next-line
    }, [])

    if (isLoading) {
        return <Loading center />
    }
    if (users.length === 0) {
        return (
            <Wrapper>
                <h2>No users to display</h2>
            </Wrapper>
        )
    }
    return (
        <Wrapper>
            <h5>{total} user{users.length > 1 && 's'}</h5>
            <div className="jobs">
                {users.map(user => {
                    return <User key={user._id} {...user} />
                })}
            </div>
            {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>
    )
}

export default UsersContainer