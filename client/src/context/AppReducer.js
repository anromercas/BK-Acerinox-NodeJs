export default (state, action) => {
  switch(action.type) {
    case 'GET_CHECKLISTS':
      return {
        ...state,
        loading: false,
        checklists: action.payload
      }
    case 'GET_CHECKLIST_INSTANCES':
      return {
        ...state,
        loading: false,
        checklistInstances: action.payload
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
    case 'DELETE_CHECKLIST_INSTANCE':
      return {
        ...state,
        checklistInstances: state.checklistInstances.filter(checklist => checklist._id !== action.payload),
        latests: state.latests.filter(checklist => checklist._id !== action.payload)
      }
    case 'ADD_CHECKLIST':
      return {
        ...state,
        checklists: [action.payload, ...state.checklists]
      }
    case 'ADD_CHECKLIST_INSTANCE':
      return {
        ...state,
        checklistInstances: [action.payload, ...state.checklistInstances],
        latests: [action.payload, ...state.latests].splice(0, 10)
      }
    case 'UPDATE_CHECKLIST_INSTANCE': //you only can update status and comments for now
      const checklistInstances = state.checklistInstances.filter(checklist => checklist._id !== action.payload._id);
      const latests = state.latests.filter(checklist => checklist._id !== action.payload._id);
      return {
        ...state,
        checklistInstances: [...checklistInstances, action.payload],
        //latests: [action.payload, ...latests].splice(0, 10)
      }
    case 'TA_ERROR':
      return {
        ...state,
        error: action.payload
      }
    case 'TA_VALIDATION_ERROR':
      return {
        ...state,
        validationError: action.payload
      }
    case 'TA_SUCCESS_MESSAGE':
      return {
        ...state,
        successMessage: action.payload
      }
    default:
      return state;
  }
}