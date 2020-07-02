import React, { useEffect } from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { setProfile, setEmail } from '../actions/profileActions'

const HomePage = (props) => {


    useEffect(() => {
        try {
            //make autenticated call to get data for home page
        } catch (e) {
            props.history.push("/login")

        }
    }, [])


    const buttonAction = () => {
        props.history.push("/signup")
    }

    return (
        <div>
            <Header />
            <h3>Home Page</h3>
            <p>
                <button onClick={buttonAction}>Go Back To Home</button>
            </p>
            <p>{props.email}</p>
            <p>{props.token}</p>
            <p>{props.id}</p>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        email: state.profile.email,
        password: state.profile.password,
        token: state.profile.token,
        id: state.profile.id,
    }
}

export default connect(mapStateToProps)(HomePage)