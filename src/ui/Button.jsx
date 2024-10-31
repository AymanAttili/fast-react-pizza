import { Link } from "react-router-dom"

function Button({ children, disabled, to, type, onClick }) {
    const base = 'bg-yellow-400 text-sm uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-400 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:bg-yellow-300 disabled:cursor-not-allowed'

    const styles = {
        primary: base + ' px-4 py-3 md:px-6 md:py-4',
        small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
        round: base + ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
        secondary: 'inline-block uppercase font-semibold tracking-wide border-2 rounded-full transition-colors duration-400 disabled:cursor-not-allowed focus:outline-none focus:ring-offset-2 text-stone-400 focus:text-stone-800 hover:text-stone-800 hover:bg-stone-300 focus:ring focus:ring-stone-200 px-4 py-2.5 md:px-6 md:py-3.5'
    }

    if (to) {
        return (
            <Link className={styles[type]} to={to}>{children}</Link>
        )
    }

    return (
        <button className={styles[type]}
            disabled={disabled}
            onClick={onClick ? onClick : null}
        >
            {children}
        </button>
    )
}

export default Button