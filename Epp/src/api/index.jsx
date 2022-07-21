import axios from 'axios'

export const route = 'https://apibrn.eduardovilhalba.me/api/'
export const eventsRoute = 'event'
export const partnersRoute = 'partners'

export const api = axios.create({
    baseURL: route,
    timeout: 2000,
  });