import React, { useState } from 'react'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { connect } from 'react-redux'
import { resetPassword } from '../thunks/profileThunk'

const ResetPassword = ({ dispatch }) => {

    const [email, setEmail] = useState('')
    const [authError, setAuthError] = useState('')
    const [emailError, setEmailError] = useState('')

    const handleResetPassword = async (e) => {
        e.preventDefault()
        var valid = await dispatch(resetPassword(email))
        if (valid) {
            swal({
                title: "Reset Email Sent",
                text: 'check your inbox',
                icon: "success",
                buttons: true,
            })
        }
        else {
            setAuthError('invalid')
        }


    }

    return (
        <div className="container authContainer">
            <Link style={{ display: 'flex' }} to="/login"><FaArrowLeft style={{ marginRight: '5px' }} />Back</Link>
            <div style={{ height: '10px' }}></div>
            <div className="preHeader">Reset Password</div>
            <form onSubmit={handleResetPassword}>
                <div className="form-group">
                    <label className="inpLabel">Email {emailError && <span className="error">* {emailError}</span>}</label>
                    <input className="inp" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                </div>
                {authError && <span className="error">* {authError}</span>}
                <button type="submit" className="btn btn-secondary btn-block preAuth">Reset Password</button>
            </form>
        </div>

    )
}

export default connect()(ResetPassword)