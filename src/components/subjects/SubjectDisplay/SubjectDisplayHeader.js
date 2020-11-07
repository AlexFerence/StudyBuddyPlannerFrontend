import React from 'react'
import { connect } from 'react-redux'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import swal from 'sweetalert'
import axios from 'axios'
import url from '../../../environment/url'
import { deleteSubject } from '../../../actions/subjectActions'

const SubjectDisplay = ({ subject, currentSubject, turnOnEditing, token, dispatch, setDisplayMode }) => {

    const handleTurnOnEditing = () => {
        turnOnEditing()
    }

    const callDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, all data for this subject will be lost!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                actullayCallDelete(id)
            }
        }).then((idk) => {
            console.log(idk)
        }).catch((e) => {
            console.log(e)
        })
    }

    const actullayCallDelete = async (id) => {
        try {
            const res = await axios.delete(url + '/api/subjects/' + id,
                {
                    headers: {
                        'Authorization': 'bearer ' + token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
            if (res.data === true) {
                console.log('should delete in redux')
                dispatch(deleteSubject(id))
                setDisplayMode('')
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="topBar" style={{ backgroundColor: subject.color }} >
            <div className="idTitle">{subject.name} {subject.classCode}</div>
            <div>
                <button
                    className="icon"
                    id="edit-hover"
                    onClick={() => handleTurnOnEditing()}
                ><FaEdit /></button>
                <button
                    className="icon"
                    id="trash"
                    onClick={() => callDelete(subject.id)}
                ><FaTrashAlt /></button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentSubject: state.currentSubject,
        token: state.profile.token
    }
}

export default connect(mapStateToProps)(SubjectDisplay)