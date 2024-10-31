import { Link } from "react-router-dom"
import SearchOrder from "../features/order/SearchOrder"
import UserName from "../features/user/UserName"

function Header() {
    return (
        <header className="px-4 sm:px-6 py-3 bg-yellow-400 uppercase border-b border-stone-200 flex items-center justify-between">
            <Link to='/' className="tracking-widest text-4xl">Fast React Pizza Co.</Link>
            <SearchOrder />

            <UserName />
        </header>
    )
}

export default Header