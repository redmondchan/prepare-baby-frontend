export const feedBaby = () => ({type: 'FEED_BABY'})
export const changeDiaper = () => ({type: 'CHANGE_DIAPER'})
export const setUserAndBaby = (user) => ({type:'SET_USER_AND_BABY', payload: user})
const setBaby = (baby) => ({type: 'SET_BABY', payload: baby})

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

export const updateHp = (baby) => {
  return dispatch => {
    let token = localStorage.token
    return fetch(`http://localhost:3000/api/v1/babies/${baby.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({hp: (baby.hp + 10)})
    })
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp)
      dispatch(setBaby(resp))
    })
    .catch(console.error)
  }
}
