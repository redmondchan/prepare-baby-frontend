const initialState = {
    log: [],
    updatedlog: [],
    user: {},
    baby: {}
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case('SET_USER_BABY_LOG'):{
      if(action.payload.jwt){
        localStorage.setItem("token", action.payload.jwt)
      }
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
    default:
    return state
  }
}

export default reducer
