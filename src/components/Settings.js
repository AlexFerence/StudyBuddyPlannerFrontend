import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const Dashboard = (props) => {

    useEffect(() => {
        
    }, [])

    const onSubmit = () => {
        // make axios call

        // from response from the axios call, update 
    }

    return (
        <div className="container settings">
            <form>
                <div className="inp">
                    <label for="first">First Name</label>
                    <input type="text" name="last" value={props.firstName}></input>
                </div>
                <div className="inp">
                    <label for="last">Last Name</label>
                    <input type="text" name="last" value={props.lastName}></input>
                </div>
                <div className="inp">
                    <label for="email">Email</label>
                    <input type="email" name="email" value={props.email}></input>
                </div>
                <div className="inp">
                    <label for="email">Password</label>
                    <input type="password" name="password" value={props.password}></input>
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        firstName: state.profile.firstName,
        lastName: state.profile.lastName,
        email: state.profile.email,
        password: state.profile.password,
        token: state.profile.token,
        id: state.profile.id,
    }
}

export default connect(mapStateToProps)(Dashboard)
