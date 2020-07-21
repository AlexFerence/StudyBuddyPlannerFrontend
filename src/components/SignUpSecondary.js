import React, {useState} from 'react'
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux'
import { updateProfileThunk } from '../thunks/profileThunk'

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
  const [minor, setMinor] = useState('')

  const onChangeFaculty = (e) => {
    setFaculty(e.target.value)
  }
  const onChangeMajor = (e) => {
    setMajor(e.target.value)
  }
  const onChangeMinor = (e) => {
    setMinor(e.target.value)
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
    e.preventDefault()
    dispatch(updateProfileThunk({school, faculty, major, minor}))
    history.push('/dashboard')
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
        <label className="inpLabel">Minor</label>
        <input className="inp" onChange={onChangeMinor} value={minor} />
        <button id="secondarySignUp" onClick={updateProfile} className="but">Get Started</button>
    </div>
    )
  }

export default connect()(SignUpSecondary)