
import { DELETE_TASK, ADD_TASK, FILL_TASKS  } from '../actions/taskActions'

const subjectReducer = (state = [], action) => {
    switch(action.type) {
        case ADD_TASK:
            return [...state, action.newTask]

        case DELETE_TASK:
            return state.filter((task) => task.id !== action.id)

        case FILL_TASKS: 
            return action.tasks
        
        default: 
            return state
    }
}

export default subjectReducer