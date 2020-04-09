export default (state, action) => {
  switch(action.type) {
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
    case 'DELETE_CHECKLIST_INSTANCE':
      return {
        ...state,
        //checklistInstances: state.checklists.filter(checklist => checklist._id !== action.payload),
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
        latests: [action.payload, ...state.latests].splice(0, 10)
      }
    case 'TA_ERROR':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}