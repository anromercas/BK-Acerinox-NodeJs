export default (state, action) => {
  switch(action.type) {
    case 'GET_TASKS':
      return {
        ...state,
        loading: false,
        tasks: action.payload
      }
    case 'GET_OPSS':
        return {
          ...state,
          loading: false,
          opss: action.payload
        }
    case 'GET_CHECKLISTS':
      return {
        ...state,
        loading: false,
        checklists: action.payload
      }
    case 'GET_AUDITORS':
      return {
        ...state,
        loading: false,
        auditors: action.payload
      }
    case 'GET_LATESTS':
      return {
        ...state,
        loading: false,
        latests: action.payload
      }
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload)
      }
    case 'DELETE_CHECKLIST_INSTANCE':
      return {
        ...state,
        //checklistInstances: state.checklists.filter(checklist => checklist._id !== action.payload),
        latests: state.latests.filter(checklist => checklist._id !== action.payload)
      }
    case 'DELETE_OPS_INSTANCE':
      return {
        ...state,
        //opsInstances: state.opss.filter(ops => ops._id !== action.payload),
        latests: state.latests.filter(ops => ops._id !== action.payload)
      }
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [action.payload, ...state.tasks]
      }
    case 'ADD_CHECKLIST':
      return {
        ...state,
        checklists: [action.payload, ...state.checklists]
      }
    case 'ADD_OPS':
    return {
      ...state,
      opss: [action.payload, ...state.opss]
    }
    case 'TASK_ERROR':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}