import { get } from '../utils/httpweather'

export const weather_mini = p => get('/weather_mini', p)
