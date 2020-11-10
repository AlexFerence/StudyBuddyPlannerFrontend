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

const AddSubjSmall = ({ dispatch, closeAddModal }) => {
    const [subTitle, setSubTitle] = useState('')
    const [classCode, setClassCode] = useState('')
    const [professor, setProfessor] = useState('')
    const [credits, setCredits] = useState(3)
    const [description, setDescription] = useState('')
    const [color, setColor] = useState({ hex: '#bcbcbc' })

    const history = useHistory()

    const handleClose = () => {
        closeAddModal()
    }

    useEffect(() => {
        dispatch(getSuggestedFriends())
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault()
        dispatch(addSubjectThunk({ subTitle, classCode, description, professor, credits, color }))
        setProfessor('')
        setSubTitle('')
        setClassCode('')
        setDescription('')
        setCredits(3)
    }

    useEffect(() => {
        Modal.setAppElement('body');
    }, [])

    return (

        <div className="add-subj-sm">
            <div>
                <Row>
                    <Col>
                        <label className="inpLabel">Subject Title (eg. PHYS)</label>
                        <input
                            className="inp"
                            required
                            type="text"
                            value={subTitle}
                            onChange={(e) => {
                                if (e.target.value.length < 5) {
                                    setSubTitle(e.target.value)
                                }
                            }}
                        ></input>
                    </Col>
                    <div style={{ width: '20px' }} />
                    <Col>
                        <label className="inpLabel">Class Code (ex: 202, 141)</label>
                        <input
                            required
                            className="inp"
                            type="text"
                            value={classCode}
                            onChange={(e) => {
                                if (e.target.value.length < 7) {
                                    setClassCode(e.target.value)
                                }
                            }}
                        ></input>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className="inpLabel">Class Summary eg: Intro to chem</label>
                        <input
                            required
                            className="inp"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></input>
                    </Col>
                </Row>
            </div>



        </div>
    )
}

export default connect()(AddSubjSmall)