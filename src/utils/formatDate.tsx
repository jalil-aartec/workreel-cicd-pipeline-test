import moment from 'moment'

export const formatDate = (date: Date, format: string) =>
    moment(date).format(format)
