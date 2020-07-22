import React, {useState} from 'react'
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux'
import { updateProfileThunk } from '../thunks/profileThunk'
import { makeSemesterThunk } from '../thunks/semesterThunk'

// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  { name: 'Montreal University' },
  { name: 'McMaster University' },
  { name: 'McGill University' }
];

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

const SignUpSecondary = ({ dispatch, history }) => {
  const [school, setSchool] = useState('')
  const [faculty, setFaculty] = useState('')
  const [major, setMajor] = useState('')
  const [gpa, setGpa] = useState('')

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
    if (!school) {
      console.log("please fill out school")
    }
    else {
      e.preventDefault()
      dispatch(updateProfileThunk({ school, faculty, major, gpa }))
      history.push('/dashboard')
      dispatch(makeSemesterThunk(gpa))
    }
  }

  return (
    <div className="container SignUpSecond">
        <label className="inpLabel">School</label>
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
        />
        <label className="inpLabel">Faculty</label>
        <input className="inp" onChange={onChangeFaculty} value={faculty}/>
        <label className="inpLabel" >Major</label>
        <input className="inp" onChange={onChangeMajor} value={major} />
        <label className="inpLabel">Current Gpa (out of 4.0 scale)</label>
        <input className="inp" onChange={onChangeGpa} value={gpa} />
        <button id="secondarySignUp" onClick={updateProfile} className="but">Get Started</button>
    </div>
    )
  }

export default connect()(SignUpSecondary)