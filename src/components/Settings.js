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
        <div className="container">
            <form onSubmit={true}>
                <h3>Settings</h3>
                <div className="form-group">
                    <label>Email</label>
                    <input value={props.email} onChange={(e) => true} type="email" 
                    className="form-control" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input value={props.password} onChange={(e) => true}
                        type="password"
                        className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit Changes</button>
                <p className="forgot-password text-right">
                    
                </p>
            </form>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        firstName: state.profile.firstName,
        email: state.profile.email,
        password: state.profile.password,
        token: state.profile.token,
        id: state.profile.id,
    }
}

export default connect(mapStateToProps)(Dashboard)
