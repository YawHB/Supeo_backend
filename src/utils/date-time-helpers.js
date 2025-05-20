export function combineDateAndTimeToUnixTime(currentDate, time) {
  const tempDate = currentDate
  const [date] = tempDate.toISOString().split('T')
  return Date.parse(`${date} ${time}`)
}
export function unixTimeToTimestamp(unixTime) {
  return new Date(Number(unixTime)).toISOString()
}

export function convertUnixToTime(msString) {
  const date = new Date(Number(msString))
  const [_, timeWithMs] = date.toISOString().split('T')
  return timeWithMs.split('.')[0]
}

export function hasCorrectOrder(start, end) {
  if (end === null) return true
  return start <= end
}
