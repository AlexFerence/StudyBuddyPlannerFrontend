import React, { useState, useEffect } from 'react'
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux'
import { updateProfileThunk } from '../thunks/profileThunk'
import { makeSemesterThunk } from '../thunks/semesterThunk'
import Select from 'react-select'
import { loadSchools, loadFaculties } from '../thunks/schoolsThunk'

// Imagine you have a list of languages that you'd like to autosuggest.
var languages = [
  { label: 'Montreal University', id: 1 },
  { label: 'McMaster University', id: 2},
  { label: 'McGill University', id: 3}
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
  const [schoolsList, setSchools] = useState(schools)

  useEffect(() => {
    dispatch(loadSchools())
    dispatch(loadFaculties())
  }, [])

  const onChangeFaculty = (e) => {
    setFaculty(e.target.value)
  }
  const onChangeMajor = (e) => {
    setMajor(e.target.value)
  }
  const onChangeGpa = (e) => {
    if (!isNaN(e.target.value) && e.target.value < 4.3) {
      setGpa(e.target.value)
    }
  }
  
  const [suggestions, setSuggestions] = useState([])

  const onChange = (event, { newValue }) => {
    setSchool(newValue)
  }

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value))
  }
  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  };

  const inputProps = {
    placeholder: '',
    value: school,
    onChange
  };

  const updateProfile = (e) => {
    console.log(school)
    console.log(faculty)
    console.log(gpa)
    if (!school.id || !faculty.id || !gpa) {
      console.log('must enter all fields')
    }
    else {
      e.preventDefault()
      dispatch(updateProfileThunk({ school: school.id, faculty: faculty.id, major, gpa }))
      history.push('/dashboard')
      dispatch(makeSemesterThunk(gpa))
    }
  }

  return (
    <div className="container SignUpSecond">
      <label className="inpLabel">School</label>
      <Select
        options={schools}
        values={[]}
        onChange={(value) => setSchool(value)}
      />
      <label className="inpLabel">Faculty</label>
      <Select
        options={faculties}
        values={[]}
        onChange={(value) => setFaculty(value)}
      />
      <label className="inpLabel" >Major</label>
      <input className="inp" onChange={onChangeMajor} value={major} />
      <label className="inpLabel">Current Gpa (out of 4.0 scale)</label>
      <input className="inp" onChange={onChangeGpa} value={gpa} />
        <button id="secondarySignUp" onClick={updateProfile} className="but">Get Started</button>
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