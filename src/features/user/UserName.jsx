import { useSelector } from "react-redux"

function UserName() {
    const userName = useSelector(state => state.user.username)
    return (
        <p className="text-sm font-semibold hidden md:block">
            {userName}
        </p>
    )
}

export default UserName