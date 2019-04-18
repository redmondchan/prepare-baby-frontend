const initialState = {
    log: [],
    updatedlog: [],
    user: {},
    baby: {},
    names: []
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case('SET_USER_BABY_LOG'):{
      let tasks = action.payload.user.logs.map(log => log.task)
      return {...state, user: action.payload.user, baby: action.payload.baby, log: tasks}
    }
    case('SET_LOG'):{
      console.log("setting log")
      return {...state, log: action.payload}
    }
    case('ADD_LOG'):{
      return {...state, log: [action.payload, ...state.log]}
    }
    case('HUNGRY_BABY'):{
      return {...state, baby: action.payload}
    }
    case('GET_NAMES'):{
      return {...state, names: action.payload}
    }
    case('LOG_OUT'):{
      localStorage.clear()
      return { log: [], updatedlog: [], user: {}, baby: {}, names: [] }
    }
    default:
    return state
  }
}

export default reducer
