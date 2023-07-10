import moment from 'moment'

export const calcDuration = (startDate, endDate) => {
    const diff = moment(endDate).diff(moment(startDate), 'months')
    if (diff >= 12) {
        const years = Math.floor(+diff / 12)
        const months = +diff % 12
        if (months > 0) {
            return `${+years > 1 ? `${years} years` : `${years} year`}, ${
                +months > 1 ? `${months} months` : `${months} month`
            }`
        } else {
            return `${+years > 1 ? `${years} years` : `${years} year`}`
        }
    } else {
        if (diff == 1) {
            return `${diff} month`
        } else if (diff > 1) {
            return `${diff} months`
        } else {
            return null
        }
    }
}
