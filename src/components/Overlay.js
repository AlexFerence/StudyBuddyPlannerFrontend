import React from 'react'
import { Link } from 'react-router-dom'

const Overlay = ({ special }) => {
    return (
        <div className={special ? "overlay overlay-special" : "overlay"}>
            <div>
                <div className="overlay__main"><Link className="overlay__main__link" to="/settings">Premium</Link> Feature</div>
                <Link to="/settings" className="overlay__main__link overlay__sub">Unlock now</Link>
            </div>
        </div>
    )
}

export default Overlay