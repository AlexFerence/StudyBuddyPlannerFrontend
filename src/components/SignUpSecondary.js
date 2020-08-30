import React, { useState, useEffect } from 'react'
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux'
import { updateProfileThunk } from '../thunks/profileThunk'
import { makeSemesterThunk } from '../thunks/semesterThunk'
import Select from 'react-select'
import { loadSchools, loadFaculties } from '../thunks/schoolsThunk'
import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import { FaBlackTie } from 'react-icons/fa';
//import { modify } from '../actions/chartActions';
import { modifyProfile } from '../actions/profileActions'


// Imagine you have a list of languages that you'd like to autosuggest.
var languages = [
  { label: 'Montreal University', id: 1 },
  { label: 'McMaster University', id: 2 },
  { label: 'McGill University', id: 3 }
];

const style = {
  option: (base, state) => ({
    ...base,
    color: 'black',
    backgroundColor: 'white',
    borderColor: '1px solid grey'
  })
};

const radios = [
  { name: 'GPA (4.0 scale)', value: 'gpa' },
  { name: '% Percentage', value: 'percentage' },
];

var options = [
  { label: 'Year 1', value: 1 },
  { label: 'Year 2', value: 2 },
  { label: 'Year 3', value: 3 },
  { label: 'Year 4', value: 4 },
  { label: 'Year 5', value: 5 },
  { label: 'Other', value: 0 },
]

const SignUpSecondary = ({ dispatch, history, schools, faculties }) => {
  const [school, setSchool] = useState({})
  const [faculty, setFaculty] = useState({})
  const [major, setMajor] = useState('')
  const [gpa, setGpa] = useState('')
  const [year, setYear] = useState({ label: 'Year 1', value: 1 })

  const [schoolError, setSchoolError] = useState('')
  const [facultyError, setFacultyError] = useState('')

  const [usesPercentage, setUsesPercentage] = useState(0)

  useEffect(() => {
    dispatch(loadSchools())
    dispatch(loadFaculties())
  }, [])

  const onChangeMajor = (e) => {
    setMajor(e.target.value)
  }

  const onChange = (event, { newValue }) => {
    setSchool(newValue)
  }

  const inputProps = {
    placeholder: '',
    value: school,
    onChange
  };

  const updateProfile = async (e) => {
    e.preventDefault()
    var clean = true

    //validating data
    if (!school) {
      setSchoolError('School is required')
      clean = false
    }
    else if (!school.id) {
      setSchoolError('School is required')
      clean = false
    }
    else {
      setSchoolError('')
    }
    if (!faculty) {
      setFacultyError('Faculty is required')
      clean = false
    }
    else if (!faculty.id) {
      setFacultyError('Faculty is Required')
      clean = false
    }
    else {
      setFacultyError('')
    }
    console.log(clean);

    if (clean === true) {
      await dispatch(updateProfileThunk({
        school: school.id,
        faculty: faculty.id,
        year: year.value,
        major,
      }))

      dispatch(makeSemesterThunk(0, gpa || 0))
      dispatch(modifyProfile({
        schoolTitle: school.label,
        facultytitle: faculty.label,
        isAuth: true,
      }));
      history.push('/subjects')

      // else {
      //   dispatch(makeSemesterThunk(gpa || 0, 0))
      //   dispatch(modifyProfile({ schoolTitle: school.label, facultytitle: faculty.label, isAuth: true }));
      //   history.push('/subjects')
      // }
    }
  }

  return (
    <div className="container SignUpSecond">
      <label className="inpLabel">School {schoolError && <span className="error">* {schoolError}</span>}</label>
      <Select
        isClearable={true}
        onSelectResetsInput={false}
        placeholder="school ..."
        className="selectedInp"
        options={schools}
        values={[]}
        onChange={(value) => setSchool(value)}
        components={{ DropdownIndicator: () => null }}
        styles={style}
      />
      <label className="inpLabel">Faculty {facultyError && <span className="error">* {facultyError}</span>} </label>
      <Select
        isClearable={true}
        placeholder="faculty ..."
        className="selectedInp"
        options={faculties}
        values={[]}
        onChange={(value) => setFaculty(value)}
        components={{ DropdownIndicator: () => null }}
        styles={style}
      />
      <label className="inpLabel">Year</label>
      <Select
        isClearable={true}
        placeholder="Year ..."
        className="selectedInp"
        options={options}
        values={[]}
        onChange={(value) => setYear(value)}
        components={{ DropdownIndicator: () => null }}
        styles={style}
      />
      <label className="inpLabel" >Major <span style={{ color: 'grey' }}>(optional)</span></label>
      <input className="inp" onChange={onChangeMajor} value={major} />

      <button className="btn btn-secondary btn-block preAuth" onClick={updateProfile}>Get Started</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    token: state.profile.token,
    id: state.profile.id,
    subjects: state.subjects,
    schools: state.schools,
    faculties: state.faculties
  }
}


export default connect(mapStateToProps)(SignUpSecondary)

// <ButtonGroup toggle>
// {radios.map((radio, idx) => (
//   <ToggleButton
//     key={idx}
//     type="radio"
//     variant="secondary"
//     name="radio"
//     value={radio.value}
//     checked={radioValue === radio.value}
//     onChange={(e) => setRadioValue(e.currentTarget.value)}
//   >
//     {radio.name}
//   </ToggleButton>
// ))}
// </ButtonGroup>


// <div className="radioDiv">
//         <input type="radio" value={0} name="gradeScale" defaultChecked={true} /> GPA 4.0 Scale
//       </div>
//       <div className="radioDiv">
//         <input type="radio" value={1} name="gradeScale" /> % Percentage
//       </div>

//       <div className="radios" onChange={(e) => {
//         console.log(typeof (e.target.value))
//         setUsesPercentage(parseInt(e.target.value))
//       }}>

//       </div>
//       {gpaError && <span className="error">* {gpaError}</span>}
//       <input className="inp"
//         placeholder="(optional) Current Percentage/GPA ..."
//         onChange={onChangeGpa} value={gpa} />