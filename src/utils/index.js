export const getToken = () => {
  return `Bearer ${localStorage.getItem('token')}`
}

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
}