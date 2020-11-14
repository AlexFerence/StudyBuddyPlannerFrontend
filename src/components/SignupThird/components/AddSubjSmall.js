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
import { setSubjToAdd } from '../../../actions/signupThirdActions'

const AddSubjSmall = ({ dispatch, closeAddModal, index = 0 }) => {
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

    useEffect(() => {
        dispatch(setSubjToAdd(
            {
                subTitle,
                classCode,
                description,
                color
            }, index)
        )
        //console.log(index)
    }, [subTitle, description, classCode, color])

    useEffect(() => {
        //console.log(subTitle)
    }, [subTitle])

    return (

        <div className="add-subj-sm" style={{ border: '1px solid ' + color.hex }}>
            <div className="add-subj-sm__L">
                <div className="add-subj-sm__L__top">
                    <div>
                        <label className="inpLabel">Class Summary <span className="grey-hint">(eg: Intro to Biology)</span></label>
                        <input
                            required
                            className="inp"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div className="add-subj-sm__L__bottom">
                    <div>
                        <label className="inpLabel">Class Code <span className="grey-hint">(eg. BIOL)</span></label>
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
                    </div>
                    <div style={{ width: '20px' }} />
                    <div>
                        <label className="inpLabel">Class Number <span className="grey-hint">(ex: 202, 141)</span></label>
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
                    </div>
                </div>
            </div>
            <div className="add-subj-sm__R">
                <ColorPicker color={color} setColor={setColor} />
            </div>
        </div>
    )
}

export default connect()(AddSubjSmall)

// <div>
//                 <Row>
//                     <Col>
//                         <label className="inpLabel">Subject Title (eg. PHYS)</label>
//                         <input
//                             className="inp"
//                             required
//                             type="text"
//                             value={subTitle}
//                             onChange={(e) => {
//                                 if (e.target.value.length < 5) {
//                                     setSubTitle(e.target.value)
//                                 }
//                             }}
//                         ></input>
//                     </Col>
//                     <div style={{ width: '20px' }} />
//                     <Col>
//                         <label className="inpLabel">Class Code (ex: 202, 141)</label>
//                         <input
//                             required
//                             className="inp"
//                             type="text"
//                             value={classCode}
//                             onChange={(e) => {
//                                 if (e.target.value.length < 7) {
//                                     setClassCode(e.target.value)
//                                 }
//                             }}
//                         ></input>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col>
//                         <label className="inpLabel">Class Summary eg: Intro to chem</label>
//                         <input
//                             required
//                             className="inp"
//                             type="text"
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                         ></input>
//                     </Col>
//                 </Row>
//             </div>