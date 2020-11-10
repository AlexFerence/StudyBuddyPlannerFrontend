import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { CirclePicker } from 'react-color'
import { addSubjectThunk } from '../../../thunks/subjectThunk'
import { IoMdClose } from 'react-icons/io'
import SuggestedFriends from '../../premiumPage/charts/SuggestedFriends'
import { getSuggestedFriends } from '../../../thunks/friendThunk';
import { useHistory } from 'react-router-dom'
import { modifyProfile } from '../../../actions/profileActions';
import ColorPicker from '../../shared/ColorPicker'
import AddSubjSmall from '../components/AddSubjSmall'

const SignupThirdContent = ({ dispatch, closeAddModal }) => {

    const history = useHistory()

    useEffect(() => {
        dispatch(getSuggestedFriends())
    }, [])

    const onSubmit = async (e) => {
        dispatch(modifyProfile({
            isAuth: true
        }))
        history.push('/subjects')
    }

    useEffect(() => {
        Modal.setAppElement('body');
    }, [])

    return (

        <div>
            <h3 style={{ padding: '16px', fontSize: '20px' }}>
                Add First Subject
            </h3>
            <AddSubjSmall />
            <SuggestedFriends />
            <button
                onClick={onSubmit}
                style={{ width: '100%' }} className="btn">Get Started</button>
        </div>
    )
}

export default connect()(SignupThirdContent)