export const feedBaby = () => ({type: 'FEED_BABY'})
export const changeDiaper = () => ({type: 'CHANGE_DIAPER'})
export const setUserBabyLog = (user) => ({type:'SET_USER_BABY_LOG', payload: user})
export const hungryBaby = (baby) => ({type: 'HUNGRY_BABY', payload: baby})
const setLog = (tasks) => ({type: 'SET_LOG', payload: tasks})
const addLog = (task) => ({type: 'ADD_LOG', payload: task})
const getNames = (names) => ({type: 'GET_NAMES', payload: names})
export const logOut = () => ({type:'LOG_OUT'})

export const fetchNames = () => {
  return dispatch => {
    return fetch('https://data.cityofnewyork.us/resource/25th-nujf.json')
    .then(resp => resp.json())
    .then(resp => {
      let names = []
      resp.map(object => names.push(object.nm))
      dispatch(getNames(names))
    })
  }
}

export const createUser = (user) => {
  return dispatch => {
    console.log("Creating User")
    return fetch('http://localhost:3000/api/v1/signup', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(resp => resp.json())
    // .then(console.log)
    .then(resp => dispatch(setUserBabyLog(resp)))
    .catch(console.error)
  }
}


export const findUser = (user) => {
  return dispatch => {
    return fetch('http://localhost:3000/api/v1/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(resp => resp.json())
    .then(resp => dispatch(setUserBabyLog(resp)))
    .catch(console.error)
  }
}

export const updateHp = (baby, task, num) => {
  return dispatch => {
    let token = localStorage.token
    let today = new Date()
    let currentTime = today.getTime()
    let time = today.getHours() + ":" + today.getMinutes()
    let date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()
    let newHp, newFeed, newFeedMissed, newDiaperMissed, newDiaper, newForceFeed, newForceDiaper, feedMoney, diaperMoney = 0
    // let newFeed = 0
    // let newFeedMissed = 0
    // let newDiaperMissed = 0
    // let newDiaper = 0
    // let newForceFeed = 0
    // let newForceDiaper = 0
    let jsonBody = {}
    if(task === 'hungry'){
      newHp = baby.hp - num
      newFeedMissed = baby.feedMissed + 1
      if(newHp < 0){
       newHp = 0
      }
      jsonBody = {hp: newHp, hungry_time: today, feedMissed: newFeedMissed, feedMoney: baby.feedMoney + 1}
    } else if (task === "dirty") {
      newHp = baby.hp - num
      newDiaperMissed = baby.diaperMissed + 1
      if(newHp < 0){
         newHp = 0
      }
      jsonBody = {hp: newHp, dirty_time: today, diaperMissed: newDiaperMissed, diaperMoney: baby.diaperMoney + 1 }
    }else if (task === "feed"){
      if(baby.initialFeed === false){
        newHp = baby.hp + num
        newFeed = baby.feed + 1
        if(newHp > 100){
           newHp = 100
        }
        jsonBody = {hp: newHp, feed_time: today, hungry_time: today, initialFeed: true, feed: newFeed, feedMoney: baby.feedMoney + 1}
      } else if (baby.initialFeed){
        let feedTime = new Date(baby.feed_time).getTime()
        let differenceMins = (currentTime - feedTime)/60000

        if(differenceMins >= 5){
          newHp = baby.hp + num
          newFeed = baby.feed + 1
          if(newHp > 100){
             newHp = 100
          }
          jsonBody = {hp: newHp, feed_time: today, hungry_time: today, feed: newFeed, feedMoney: baby.feedMoney + 1}
        }else if (differenceMins < 5){
          newHp = baby.hp - num
          newForceFeed = baby.forceFeed + 1
          if(newHp < 0){
             newHp = 0
          }
          jsonBody = {hp: newHp, forceFeed: newForceFeed}
        }
      }
    }else if (task === 'diaper'){
      if(baby.initialDiaper === false){
        newHp = baby.hp + num
        newDiaper = baby.diaper + 1
        if(newHp > 100){
           newHp = 100
        }
        jsonBody = {hp: newHp, diaper_time: today, dirty_time: today, initialDiaper: true, diaper: newDiaper, diaperMoney: baby.diaperMoney + 1 }
      }else if (baby.initialDiaper){
        let diaperTime = new Date(baby.diaper_time).getTime()
        let differenceMins = (currentTime - diaperTime)/60000
        if(differenceMins >= 60){
          newHp = baby.hp + num
          newDiaper = baby.diaper + 1
          if(newHp > 100){
             newHp = 100
          }
          jsonBody = {hp: newHp, diaper_time: today, dirty_time: today, diaper: newDiaper, diaperMoney: baby.diaperMoney + 1}
        }else if(differenceMins < 60){
          newHp = baby.hp - num
          newForceDiaper = baby.forceiaper + 1
          if(newHp < 0){
            newHp = 0
          }
          jsonBody = {hp: newHp, forceDiaper: newForceDiaper}
        }
      }
    }
    console.log(today.getTime())
    return fetch(`http://localhost:3000/api/v1/babies/${baby.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(jsonBody)
    })
    .then(resp => resp.json())
    .then(resp => { dispatch(hungryBaby(resp))
    })
    .catch(console.error)
  }
}

export const createLog = (baby, task) => {
  return dispatch => {
    let token = localStorage.token
    let today = new Date()
    let currentTime = today.getTime()
    let time = today.getHours() + ":" + ((today.getMinutes()<10?'0':'') + today.getMinutes())
    let date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()
    let newTask = ''
    if(task === 'hungry'){
      newTask = `Hungry baby at ${time} on ${date}`
    }else if (task === "dirty"){
      newTask = `Baby pooped at ${time} on ${date}`
    }else if (task === "feed"){
      if (baby.initialFeed === false){
        newTask = `Fed baby at ${time} on ${date}`
      }else if (baby.initialFeed){
        let feedTime = new Date(baby.feed_time).getTime()
        let differenceMins = (currentTime - feedTime)/60000
        if(differenceMins >= 60){
          newTask = `Fed baby at ${time} on ${date}`
        }else if (differenceMins < 60){
          newTask = `Forced baby to eat at ${time} on ${date}`
        }
      }
    }else if (task === 'diaper'){
      if(baby.initialDiaper === false){
        newTask = `Changed diaper at ${time} on ${date}`
      }else if (baby.initialDiaper){
        let diaperTime = new Date(baby.diaper_time).getTime()
        let differenceMins = (currentTime - diaperTime)/60000
        if(differenceMins >= 60){
          newTask = `Changed diaper at ${time} on ${date}`
        }else if(differenceMins < 60){
          newTask = `Wasted baby's time by changing diaper too early at ${time} on ${date}`
        }
      }
    }
    return fetch('http://localhost:3000/api/v1/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ baby_id: baby.id, task: newTask})
    })
    .then(resp => resp.json())
    .then(resp => dispatch(addLog(resp.task)))
    .catch(console.error)
  }
}

export const getLogs = (user) => {
  return dispatch => {
    let token = localStorage.token
    return fetch('http://localhost:3000/api/v1/logs', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(resp => {
      let filteredLogs = resp.filter(log => log.baby_id === user.id)
      let tasks = filteredLogs.map(log => log.task)
      dispatch(setLog(tasks))
    })
  }
}

export const getUser = (token) => {
  console.log(token)
  return dispatch => {
    return fetch('http://localhost:3000/api/v1/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(resp => dispatch(setUserBabyLog(resp)))
    .catch(console.error)
  }
}

export const postAnswers = (user, value) => {
  return dispatch => {
    let token = localStorage.token
    let answerBody = {}
    if(value === "selffish"){
      answerBody = {selffish: user.selffish + 1}
    }else if (value === "selfless"){
      answerBody = {selfless: user.selfless + 1}
    }
    return fetch(`http://localhost:3000/api/v1/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(answerBody)
    })
  }
}
