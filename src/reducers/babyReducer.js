const initialState = {
    log: [],
    updatedlog: [],
    user: {},
    baby: {},
    names: [],
    days: 0
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
      return {...state, log: [...state.log, action.payload]}
    }
    case('HUNGRY_BABY'):{
      return {...state, baby: action.payload}
    }
    case('GET_NAMES'):{
      return {...state, names: action.payload}
    }
    case('LOG_OUT'):{
      localStorage.clear()
      return {
          log: [],
          updatedlog: [],
          user: {},
          baby: {},
          names: [],
          days: 0
      }
    }
    case('SET_STREAK'):{
      return {...state, days: action.payload}
    }
    default:
    return state
  }
}

export default reducer
