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

  const [usesPercentage, setUsesPercentage] = useState(0)



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
    //get rid of this and just throw an error that changes per marking scheme
    setGpa(e.target.value)
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
      setGpa(0)
    }

    else if (isNaN(gpa)) {
      setGpaError('GPA must be a number')
      clean=false
    }

    else if (usesPercentage === 1 && (gpa > 100 || gpa < 0)) {
      setGpaError('Percentage must be above 0 and below 100')
      clean=false
    }

    else if (usesPercentage === 0 && (gpa > 4.3 || gpa <= 0)) {
      setGpaError('GPA must be below 4.3 and above 0')
      clean=false
    }

    else {
      setGpaError('')
    }

    if (clean) {
      
      await dispatch(updateProfileThunk({ school: school.id, faculty: faculty.id, major, gpa, usePercentage: usesPercentage }))
      console.log(usesPercentage)
      if (usesPercentage === 1) {
        console.log('making with percentage')
        dispatch(makeSemesterThunk(0, gpa))
        dispatch(modifyProfile({ schoolTitle: school.label, 
          facultytitle: faculty.label, 
          isAuth: true,
          subjTour: true,
          taskTour: true,
          dashTour: true
        }));
      } 

      else {
        //include different call
        console.log('making with gpa')
      
        dispatch(makeSemesterThunk(gpa, 0))
        dispatch(modifyProfile({ schoolTitle: school.label , facultytitle: faculty.label, isAuth: true }));
      }
      history.push('/subjects')
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

      <div className="radios" onChange={ (e) => {
        console.log(typeof(e.target.value))
        setUsesPercentage(parseInt(e.target.value))
      }}>
        <input className="radioSpace" type="radio" value={0} name="gradeScale" defaultChecked={true} /> GPA (4.0 / 4.3 scale) <br />
        <input className="radioSpace" type="radio" value={1} name="gradeScale" /> % Percentage
      </div>

      <input className="inp" 
      placeholder="Current Percentage/GPA ..."
      onChange={onChangeGpa} value={gpa} /> 
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