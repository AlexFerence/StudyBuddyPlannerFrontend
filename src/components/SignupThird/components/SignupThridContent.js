import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import { connect } from 'react-redux'
import SuggestedFriends from '../../premiumPage/charts/SuggestedFriends'
import { getSuggestedFriends } from '../../../thunks/friendThunk';
import { useHistory } from 'react-router-dom'
import { modifyProfile } from '../../../actions/profileActions';
import AddSubjSmall from '../components/AddSubjSmall'
import { AnimatedList } from 'react-animated-list';
import { submitFirstClasses } from '../../../thunks/subjectThunk'

const SignupThirdContent = ({ dispatch, closeAddModal }) => {

    const history = useHistory()

    const [addSubjList, setAddSubjList] = useState([<AddSubjSmall index={0} key={0} />])

    useEffect(() => {
        dispatch(getSuggestedFriends())
    }, [])

    const onSubmit = async (e) => {
        dispatch(modifyProfile({
            isAuth: true
        }))
        dispatch(submitFirstClasses())

        history.push('/subjects')
    }

    useEffect(() => {
        Modal.setAppElement('body');
    }, [])

    const addSubject = () => {
        setAddSubjList([...addSubjList, <AddSubjSmall
            key={addSubjList.length} index={addSubjList.length} />
        ])
    }

    return (
        <div>
            <h3 style={{ padding: '16px', fontSize: '20px' }}>
                Add First Subject
            </h3>
            <AnimatedList animation={"fade"}>
                {addSubjList}
            </AnimatedList>
            <div className="add-another-subj__container">
                <button
                    className="add-another-subj__button"
                    onClick={addSubject}>+ Add Another Subject</button>
            </div>
            <button
                onClick={onSubmit}
                style={{ width: '100%', border: '1px solid grey' }}
                className="btn">Get Started</button>
        </div>
    )
}

export default connect()(SignupThirdContent)