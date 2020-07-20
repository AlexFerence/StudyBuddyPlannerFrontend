import React, {useState} from 'react'
import Select from 'react-select';

const SignUpSecondary = () => {

    const [taskType, setTaskType] = useState('')

    return (
        <div>
        <h1>Hello</h1>
            <Select
                value={taskType}
                onChange={val => setTaskType(val)}
                placeholder="Type..."
                options={[
                    { value: 'Assignment', label: 'Assignment' },
                    { value: 'Quiz', label: 'Quiz' },
                    { value: 'Test', label: 'Test' },
                    { value: 'Exam', label: 'Exam' }
                ]}
            />


        </div>
    )


}

export default SignUpSecondary