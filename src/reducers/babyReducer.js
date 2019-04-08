const initialState = {
    log: [],
    updatedlog: [],
    user: {},
    baby: {}
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case('SET_USER_AND_BABY'):{
      if(action.payload.jwt){
        localStorage.setItem("token", action.payload.jwt)
      }
      return {...state, user: action.payload.user, baby: action.payload.baby}
    }
    case('SET_BABY'):{
      return {...state, baby: action.payload}
    }
    case('SET_LOG'):{
      console.log(action.payload)
      return {...state, log: action.payload}
    }
    case('ADD_LOG'):{
      return {...state, log: [action.payload, ...state.log]}
    }
    case('HUNGRY_BABY'):{
      return {...state, baby: action.payload}
    }
    case('FEED_BABY'):{
      let newHp = state.hp + 10
      let today = new Date()
      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
      let date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()
      let newLog = [...state.log, `Fed baby at ${time} on ${date}`]
      if(newHp >= 100){
        newHp = 100
      }
      return {...state, hp: newHp, feed_time: time, feed_date: date, log: newLog }
    }
    case('CHANGE_DIAPER'): {
      console.log(state)
      let newHp = state.hp + 10
      let today = new Date()
      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
      let date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()
      let newLog = [...state.log, `Changed Diaper at ${time} on ${date}`]
      if(newHp >= 100){
        newHp = 100
      }
      return {...state, hp: newHp, diaper_time: time, diaper_date: date, log: newLog }
    }
    default:
    return state
  }
}

export default reducer
