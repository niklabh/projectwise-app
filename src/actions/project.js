import API from '../api'

import { PROJECT as constants } from '../config/constants'

const saveRequest = (project) => {
  return {
    type: constants.SAVE_REQUEST,
    project
  }
}

const saveSuccess = (project) => {
  return {
    type: constants.SAVE_SUCCESS,
    project
  }
}

const saveError = (message) => {
  return {
    type: constants.SAVE_ERROR,
    message
  }
}

const fetchAllRequest = () => {
  return {
    type: constants.FETCH_ALL_REQUEST,
    isLoading: true
  }
}

const fetchAllSuccess = (projects) => {
  return {
    type: constants.FETCH_ALL_SUCCESS,
    isLoading: false,
    projects
  }
}

const fetchAllError = (message) => {
  return {
    type: constants.FETCH_ALL_ERROR,
    isLoading: false,
    message
  }
}

const fetchRequest = (projectId) => {
  return {
    type: constants.FETCH_REQUEST,
    isLoading: true
  }
}

const fetchSuccess = (project) => {
  return {
    type: constants.FETCH_SUCCESS,
    isLoading: false,
    project
  }
}

const fetchError = (message) => {
  return {
    type: constants.FETCH_ERROR,
    isLoading: false,
    message
  }
}

export const fetchProjects = () => {
  return (dispatch) => {
    dispatch(fetchAllRequest())

    return API.fetchAllProjects()
      .then((response) => {
        if(response.statusText !== 'OK') {
          dispatch(fetchAllError(response.data))
          return Promise.reject(response)
        } else {
          console.log(response.data)
          dispatch(fetchAllSuccess(response.data.projects))
        }
      })
  }
}

export const fetchProject = (projectId) => {
  return (dispatch) => {
    dispatch(fetchRequest(projectId))

    return API.fetchProject(projectId)
      .then((response) => {
        if(response.statusText !== 'OK') {
          dispatch(fetchError(response.data))
          return Promise.reject(response)
        } else {
          dispatch(fetchSuccess(response.data))
        }
      })
  }
}

export const saveProject = (project) => {
  return (dispatch) => {
    dispatch(saveRequest(project))

    return API.addProject(project)
      .then((response) => {
        if(response.statusText !== 'OK') {
          dispatch(saveError(response.data))
          return Promise.reject(response)
        } else {
          dispatch(saveSuccess(response.data))
        }
      })
  }
}