import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:3000' })

// Automatically attach token to every request if logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  if (token) req.headers.Authorization = `Bearer ${token}`
  return req
})

// AUTH
export const register = (data) => API.post('/auth/register', data)
export const login = (data) => API.post('/auth/login', data)

// PLACES
export const getAllPlaces = () => API.get('/places')
export const getPlaceById = (id) => API.get(`/places/${id}`)
export const createPlace = (data) => API.post('/places', data)
export const deletePlace = (id) => API.delete(`/places/${id}`)

// WISHLIST
export const getWishlist = () => API.get('/wishlist')
export const addToWishlist = (placeId) => API.post(`/wishlist/${placeId}`)
export const removeFromWishlist = (placeId) => API.delete(`/wishlist/${placeId}`)