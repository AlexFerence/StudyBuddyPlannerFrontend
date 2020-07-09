import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import url from '../environment/url'
import SubjectButton from './SubjectButton'
import { fillSubjects } from '../actions/subjectActions'
import { deleteSubject } from '../actions/subjectActions'

import { FaTrashAlt, FaBlackTie, FaBorderNone } from 'react-icons/fa'
import SubjectModal from './SubjectModal'



const SubjectsPage = ( props ) => {
    var [openModal, setOpenModal] = useState(false)
    //var [classes, setClasses] = useState([])
    var [classSelection, setClassSelection] = useState({})

    useEffect(() => {
        const getClasses = async () => {
            try {
                const res = await axios.post(url + '/api/subjects/list',
                    {
                        UserId: props.id
                    }, {
                    headers: {
                        'Authorization': 'bearer ' + props.token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                const list = res.data
                console.log(list)

                props.dispatch(fillSubjects(list))
            }
            catch (e) {
                console.log(e)
            }
        }
        getClasses()
        console.log(props.id)
    }, [])

    const callDelete = async (id) => {
        try { 
            const res = await axios.delete(url + '/api/subjects/' + id,
                {
                    headers: {
                        'Authorization': 'bearer ' + props.token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
            if (res.data === true) {
                console.log('should delete in redux')
                props.dispatch(deleteSubject(id))
                setClassSelection({})
            }
        } catch (e) {
            console.log(e)
        }
    }

    const closeModal = () => {
        setOpenModal(false)
    }

    return (
        <div className="subjects">
            <SubjectModal isOpen={openModal} closeModal={closeModal} />           
            <div className="scroller">
                <div className="classHeader">
                    <div className="left">
                        <div className="title">Subjects</div>
                    </div>
                    <div className="right">
                        <button onClick={() => setOpenModal(true)}>+ Add Subject</button>
                    </div>
                </div>
                <div className="listClasses">{props.subjects.map((item) => {
                    return (<div onClick={() => setClassSelection(item)} key={item.id}>
                        <SubjectButton
                            className="button"
                            item={item}
                            setClassSelection={setClassSelection}
                        /></div>
                    )
                })}</div>

            </div>
            <div className="display">
                {!classSelection.name && <p>Please select a class</p>}
                <div className="innerDisplay">
                    {classSelection.name && 
                        <div className="topBar">
                            <div className="left">
                                <h4>{classSelection.name} {classSelection.classCode}</h4>
                            </div>
                            <div className="right">
                            <button 
                            className="icon"
                            onClick={() => {
                                callDelete(classSelection.id)
                            }}
                            ><FaTrashAlt /></button>
                            </div>
                        </div>
                    }
                    {classSelection.professor && 
                        <div className="mainSection">
                            Credits: <span>{classSelection.credits}</span> <br/>
                            Average Mark: B+ <br/>
                            Professor: <span>{classSelection.professor}</span> <br/>
                        </div>}
                </div>
            </div>
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
        subjects: state.subjects
    }
}

export default connect(mapStateToProps)(SubjectsPage)