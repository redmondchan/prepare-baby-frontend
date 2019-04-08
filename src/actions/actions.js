export const feedBaby = () => ({type: 'FEED_BABY'})
export const changeDiaper = () => ({type: 'CHANGE_DIAPER'})
export const setUserAndBaby = (user) => ({type:'SET_USER_AND_BABY', payload: user})
export const hungryBaby = (baby) => ({type: 'HUNGRY_BABY', payload: baby})
const setLog = (tasks) => ({type: 'SET_LOG', payload: tasks})
const setBaby = (baby) => ({type: 'SET_BABY', payload: baby})
const addLog = (task) => ({type: 'ADD_LOG', payload: task})

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
    .then(resp => dispatch(setUserAndBaby(resp)))
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
    .then(resp => dispatch(setUserAndBaby(resp)))
    .catch(console.error)
  }
}

export const updateHp = (baby, task, num) => {
  return dispatch => {
    let token = localStorage.token
    let today = new Date()
    let time = today.getHours() + ":" + today.getMinutes()
    let date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()
    console.log(baby.hp, num, task, time)
    let newHp = 0
    let feedLog = ''
    if(task === 'hungry'){
      console.log("new hp", newHp)
      newHp = baby.hp - num
    }else if (task === "feed"){
      newHp = baby.hp + num
      feedLog = `Fed baby at ${time} on ${date}`
    }else if (task === 'diaper'){
      newHp = baby.hp + num
    }

    return fetch(`http://localhost:3000/api/v1/babies/${baby.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({hp: newHp, feed_time: time})
    })
    .then(resp => resp.json())
    .then(resp => { dispatch(hungryBaby(resp))
      // task == "feed" ? dispatch(feedBaby(resp)):dispatch(changeDiaper(resp))
      // dispatch(setBaby(resp))
    })
    .catch(console.error)
  }
}
export const decreaseHp = (baby, task) => {
  return dispatch => {
    let token = localStorage.token
    let today = new Date()
    let time = today.getHours() + ":" + today.getMinutes()
    let date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()
    return fetch(`http://localhost:3000/api/v1/babies/${baby.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({hp: (baby.hp - 1), feed_time: time, feed_date: date})
    })
    .then(resp => resp.json())
    .then(resp => {
      task == "feed" ? dispatch(feedBaby(resp)):dispatch(changeDiaper(resp))
      dispatch(setBaby(resp))
    })
    .catch(console.error)
  }
}

export const createLog = (baby, task) => {
  return dispatch => {
    let token = localStorage.token
    let today = new Date()
    let time = today.getHours() + ":" + ((today.getMinutes()<10?'0':'') + today.getMinutes())
    let date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()
    let newTask = ''
    if(task === 'hungry'){
      newTask = `Hungry baby at ${time} on ${date}`
    }else if (task === "feed"){
      newTask = `Fed baby at ${time} on ${date}`
    }else if (task === 'diaper'){
      newTask = `Changed diper at ${time} on ${date}`
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
      let filteredLogs = resp.filter(log => log.baby_id == user.id)
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
    .then(resp => dispatch(setUserAndBaby(resp)))
    .catch(console.error)
  }
}
