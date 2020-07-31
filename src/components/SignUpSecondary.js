import React, { useState, useEffect } from 'react'
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux'
import { updateProfileThunk } from '../thunks/profileThunk'
import { makeSemesterThunk } from '../thunks/semesterThunk'
import Select from 'react-select'
import { loadSchools, loadFaculties } from '../thunks/schoolsThunk'
import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import { FaBlackTie } from 'react-icons/fa';

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

var options = []

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = val => {
  const inputValue = val.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);


const SignUpSecondary = ({ dispatch, history, schools, faculties }) => {
  const [school, setSchool] = useState({})
  const [faculty, setFaculty] = useState({})
  const [major, setMajor] = useState('')
  const [gpa, setGpa] = useState('')

  const [schoolError, setSchoolError] = useState('')
  const [facultyError, setFacultyError] = useState('')
  const [gpaError, setGpaError] = useState('')

  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState({ name: 'GPA (4.0 scale)', value: 'gpa' });


  useEffect(() => {
    dispatch(loadSchools())
    dispatch(loadFaculties())
  }, [])

  const onChangeMajor = (e) => {
    setMajor(e.target.value)
  }
  const onChangeGpa = (e) => {
    if (!isNaN(e.target.value) && e.target.value < 4.3) {
      setGpa(e.target.value)
    }
  }

  const onChange = (event, { newValue }) => {
    setSchool(newValue)
  }

  const inputProps = {
    placeholder: '',
    value: school,
    onChange
  };

  const updateProfile = (e) => {
    e.preventDefault()
    var clean = true
    if (!school) {
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
    else {
      setSchoolError('')
    }

    if (!gpa) {
      setGpaError('current gpa is required')
      clean=false
    }

    else {
      setGpaError('')
    }

    if (clean) {
      history.push('/dashboard')
      dispatch(updateProfileThunk({ school: school.id, faculty: faculty.id, major, gpa }))
      dispatch(makeSemesterThunk(gpa))
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
      <label className="inpLabel" >Major</label>
      <input className="inp" onChange={onChangeMajor} value={major} />
      <label className="inpLabel">Current Gpa (out of 4.0 scale)</label>{gpaError && <span className="error">* {gpaError}</span>}

      <input className="inp" onChange={onChangeGpa} value={gpa} /> 
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