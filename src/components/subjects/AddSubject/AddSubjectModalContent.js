import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { CirclePicker } from 'react-color'
import { addSubjectThunk } from '../../../thunks/subjectThunk'
import { IoMdClose } from 'react-icons/io'
import Select from 'react-select';

const semestersReduce = (list, semester) => {
    list.push({ value: semester.id, label: semester.title })
    return list
}

const AddSubjectModalContent = ({ dispatch, closeAddModal, semesters }) => {

    const activeSemester = semesters.find((semester) => semester.title === 'Winter 2021')

    const [subTitle, setSubTitle] = useState('')
    const [classCode, setClassCode] = useState('')
    const [professor, setProfessor] = useState('')
    const [credits, setCredits] = useState(3)
    const [description, setDescription] = useState('')
    const [color, setColor] = useState({ hex: '#bcbcbc' })
    const [semester, setSemester] = useState({
        value: activeSemester.id,
        label: activeSemester.title
    })

    const handleClose = () => {
        closeAddModal()
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        dispatch(addSubjectThunk({ semesterId: semester.value, subTitle, classCode, description, professor, credits, color }))
        closeAddModal()
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

        <div>
            <div className="modal-header" style={{
                backgroundColor: color.hex,
                cursor: 'pointer'
            }}><h3>Add Subject</h3>
                <IoMdClose onClick={handleClose} style={{ fontSize: '18px' }} />
            </div>
            <div className="modal-main">
                <form onSubmit={onSubmit}>
                    <div>
                        <label className="inpLabel">Subject Title (eg. BIOL, MATH, PHYS)</label>
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
                    <Row>
                        <Col>
                            <label className="inpLabel">Class Code (ex: 202, 141)</label>
                            <input
                                className="inp"
                                required
                                type="text"
                                value={classCode}
                                onChange={(e) => {
                                    if (e.target.value.length < 7) {
                                        setClassCode(e.target.value)
                                    }
                                }}
                            ></input>

                            <input
                                required
                                className="inp"
                                type="text"
                                value={credits}
                                onChange={(e) => {
                                    if (!isNaN(e.target.value) && e.target.value < 10) {
                                        setCredits(e.target.value)
                                    }
                                }
                                }
                            ></input>
                            <label className="inpLabel">Semester</label>
                            <Select
                                value={semester}
                                onChange={val => setSemester(val)}
                                placeholder="Select Term"
                                options={semesters.reduce(semestersReduce, [])}
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        text: 'black',
                                        primary25: '#bcbcbc',
                                        primary50: '#bcbcbc',
                                        primary: '#bcbcbc',
                                    },
                                })}
                            />

                        </Col>
                        <Col className="circle">
                            <CirclePicker
                                width="210px"
                                height="30px"
                                color={color}
                                onChangeComplete={(c) => setColor(c)}
                                circleSpacing={14}
                            />
                        </Col>
                    </Row>

                    <div>
                        <label className="inpLabel">Description</label>
                        <textarea className="inpArea"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <button className="but">Submit</button>
                </form>
            </div>
        </div>


    )
}

const mapStateToProps = (state) => {
    return {
        semesters: state.profile.semesters
    }
}

export default connect(mapStateToProps)(AddSubjectModalContent)