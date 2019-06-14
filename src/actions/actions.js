export const setUserBabyLog = (user) => ({type:'SET_USER_BABY_LOG', payload: user})
export const hungryBaby = (baby) => ({type: 'HUNGRY_BABY', payload: baby})
export const logOut = () => ({type:'LOG_OUT'})
export const setStreak = (days) => ({type: 'GET_STREAK', payload: days})
const setLog = (tasks) => ({type: 'SET_LOG', payload: tasks})
const addLog = (task) => ({type: 'ADD_LOG', payload: task})
const getNames = (names) => ({type: 'GET_NAMES', payload: names})

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
    return fetch('http://localhost:3000/api/v1/signup', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(resp => resp.json())
    .then(resp => {
      if(resp.jwt){
        localStorage.setItem("token", resp.jwt)
        dispatch(setUserBabyLog(resp))
      }
    })
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
    .then(resp => {
      if(resp.jwt){
        localStorage.setItem("token", resp.jwt)
        dispatch(setUserBabyLog(resp))
    }})
    .catch(console.error)
  }
}

export const updateHp = (baby, task, num) => {
  return dispatch => {
    let token = localStorage.token
    let today = new Date()
    let currentTime = today.getTime()
    let newHp, newFeed, newFeedMissed, newDiaperMissed, newDiaper, newForceFeed, newForceDiaper = 0
    let jsonBody = {}
    if(task === 'hungry'){
      newHp = baby.hp - (10 * num)
      newFeedMissed = baby.feedMissed + 1
      if(newHp <= 0){
       newHp = 0
       jsonBody = {hp: newHp, hungry_time: today, feedMissed: newFeedMissed, feedMoney: baby.feedMoney + 1, birthdate: today}
     } else {
       jsonBody = {hp: newHp, hungry_time: today, feedMissed: newFeedMissed, feedMoney: baby.feedMoney + 1}
     }
    } else if (task === "dirty") {
      newHp = baby.hp - (10 * num)
      newDiaperMissed = baby.diaperMissed + 1
      if(newHp <= 0){
         newHp = 0
         jsonBody = {hp: newHp, dirty_time: today, diaperMissed: newDiaperMissed, diaperMoney: baby.diaperMoney + 1, birthdate: today}
      }else {
        jsonBody = {hp: newHp, dirty_time: today, diaperMissed: newDiaperMissed, diaperMoney: baby.diaperMoney + 1}
      }
    }else if (task === "feed"){
      if(baby.initialFeed === false){
        newHp = baby.hp + 10
        newFeed = baby.feed + 1
        if(baby.hp === 0){
          jsonBody = {hp: newHp, feed_time: today, hungry_time: today, initialFeed: true, feed: newFeed, feedMoney: baby.feedMoney + 1, birthdate: today}
        }else {
          jsonBody = {hp: newHp, feed_time: today, hungry_time: today, initialFeed: true, feed: newFeed, feedMoney: baby.feedMoney + 1}
        }
      } else if (baby.initialFeed){
        let feedTime = new Date(baby.feed_time).getTime()
        let differenceMins = (currentTime - feedTime)/60000
        if(differenceMins >= 180){
          newHp = baby.hp + 10
          newFeed = baby.feed + 1
          if(newHp > 100){
             newHp = 100
          }
          if(baby.hp === 0){
            jsonBody = {hp: newHp, feed_time: today, hungry_time: today, feed: newFeed, feedMoney: baby.feedMoney + 1, birthdate: today}
          }else {
            jsonBody = {hp: newHp, feed_time: today, hungry_time: today, feed: newFeed, feedMoney: baby.feedMoney + 1}
          }
        }else if (differenceMins < 180){
          newHp = baby.hp - 10
          newForceFeed = baby.forceFeed + 1
          if(newHp <= 0){
             newHp = 0
             jsonBody = {hp: newHp, forceFeed: newForceFeed, birthdate: today}
          }else {
            jsonBody = {hp: newHp, forceFeed: newForceFeed}
          }
        }
      }
    }else if (task === 'diaper'){
      if(baby.initialDiaper === false){
        newHp = baby.hp + 10
        newDiaper = baby.diaper + 1
        if(baby.hp === 0){
          jsonBody = {hp: newHp, diaper_time: today, dirty_time: today, initialDiaper: true, diaper: newDiaper, diaperMoney: baby.diaperMoney + 1, birthdate: today }
        }else {
          jsonBody = {hp: newHp, diaper_time: today, dirty_time: today, initialDiaper: true, diaper: newDiaper, diaperMoney: baby.diaperMoney + 1 }
        }
      }else if (baby.initialDiaper){
        let diaperTime = new Date(baby.diaper_time).getTime()
        let differenceMins = (currentTime - diaperTime)/60000
        if(differenceMins >= 150){
          newHp = baby.hp + 10
          newDiaper = baby.diaper + 1
          if(newHp > 100){
             newHp = 100
          }
          if(baby.hp === 0){
            jsonBody = {hp: newHp, diaper_time: today, dirty_time: today, diaper: newDiaper, diaperMoney: baby.diaperMoney + 1, birthdate: today}
          } else {
            jsonBody = {hp: newHp, diaper_time: today, dirty_time: today, diaper: newDiaper, diaperMoney: baby.diaperMoney + 1}
          }
        }else if(differenceMins < 150){
          newHp = baby.hp - 10
          newForceDiaper = baby.forceDiaper + 1
          if(newHp <= 0){
            newHp = 0
            jsonBody = {hp: newHp, forceDiaper: newForceDiaper, birthdate: today}
          }else {
            jsonBody = {hp: newHp, forceDiaper: newForceDiaper}
          }
        }
      }
    }
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
        if(differenceMins >= 5){
          newTask = `Fed baby at ${time} on ${date}`
        }else if (differenceMins < 1){
          newTask = `Forced baby to eat at ${time} on ${date}`
        }
      }
    }else if (task === 'diaper'){
      if(baby.initialDiaper === false){
        newTask = `Changed diaper at ${time} on ${date}`
      }else if (baby.initialDiaper){
        let diaperTime = new Date(baby.diaper_time).getTime()
        let differenceMins = (currentTime - diaperTime)/60000
        if(differenceMins >= 1){
          newTask = `Changed diaper at ${time} on ${date}`
        }else if(differenceMins < 1){
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

export const getStreak = (birthdate) => {
  return dispatch => {
    if (birthdate !== undefined){
      let birth = new Date(birthdate).getTime()
      let today = new Date().getTime()
      let difference = today - birth
      let oneDay = 1000*60*60*24
      let days = difference/oneDay
      return Math.round(days)
    }
  }
}

export const controlInterval = (baby) => {
  return dispatch => {
    let updatingHp = () => {
        let currentDate = Math.floor(new Date().getTime()/60000)
        let hungryOldDate = Math.floor((new Date(baby.hungry_time).getTime())/60000)
        let dirtyOldDate = Math.floor(new Date(baby.dirty_time).getTime()/60000)
        // converting milliseconds to minutes
        let hungryDifference = (currentDate - hungryOldDate)
        let dirtyDifference = (currentDate - dirtyOldDate)
        if(hungryDifference >= 5){
          let x = Math.floor(hungryDifference/1)
          dispatch(updateHp(baby, "hungry", x))
          dispatch(createLog(baby, "hungry"))
        }
        if(dirtyDifference >= 1){
          let x = Math.floor(dirtyDifference/1)
          dispatch(updateHp(baby, "dirty", x))
          dispatch(createLog(baby, "dirty"))
        }
      };

    let y

    if(baby.hasOwnProperty('hp')){
      let y = setInterval(updatingHp, 10000)
      return y
    }
  }
}
