import axios from "axios";
import { getToken } from "./index";

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

// instance of axios
const http = axios.create({
  baseURL: BASE_API_URL,
  responseType: 'json',
  timeout: 10000,
  timeoutErrorMessage: 'Request Timeout Error'
});

const getHeaders = (isSecure) => {
  let options = {
    'Content-Type': 'application/json'
  }

  if (isSecure) {
    options['Authorization'] = `Bearer ${localStorage.getItem('token')}`
  }
  return options;
}

const GET = (url, isSecure = false, params = {}) => {
  return http.get(url, {
    headers: getHeaders(isSecure),
    params
  })
}


const POST = (url, data, isSecure = false, params = {}) => {
  return http.post(url, data, {
    headers: getHeaders(isSecure),
    params
  })
}


const PUT = (url, data, isSecure = false, params = {}) => {
  return http.put(url, data, {
    headers: getHeaders(isSecure),
    params
  })
}


const DELETE = (url, isSecure = false, params = {}) => {
  return http.delete(url, {
    headers: getHeaders(isSecure),
    params
  })
}

const UPLOAD = (method, url, data, files = []) => {
  return new Promise((resolve, reject) => {
    // todo return promise
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    // append textual data in formadata
    for (let key in data) {
      formData.append(key, data[key])
    }

    // append files in formdata
    files.forEach((item, index) => {
      formData.append('images', item, item.name)
    })
    xhr.onreadystatechange = () => {
      console.log('xhr.ready state >>', xhr.readyState);
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response)
        } else {
          reject(xhr.response)
        }
      }
    }
    xhr.open(method, `${BASE_API_URL}${url}?token=${getToken()}`, true);
    xhr.send(formData)
  })
}

export const httpClient = {
  GET,
  POST,
  PUT,
  DELETE,
  UPLOAD
}



