import { InvalidEmailFormat, InvalidNameLength, InvalidPhoneNumberFormat } from './custom-errors.js'

export function capitalize(name) {
  const firstLetter = name[0].toUpperCase()
  const rest = name.slice(1).toLowerCase()
  return firstLetter + rest
}

export function validateNameLengths([firstName, lastName]) {
  let capitalizedFirstName, capitalizedLastName
  for (const name of [firstName, lastName]) {
    if (name.length < 2 || name.length > 20) {
      throw new InvalidNameLength()
    }

    const formattedName = capitalize(name)
    name === firstName
      ? (capitalizedFirstName = formattedName)
      : (capitalizedLastName = formattedName)
  }
  return [capitalizedFirstName, capitalizedLastName]
}

export function validateEmailFormat(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) throw new InvalidEmailFormat()
}

export function isValidPhoneNumber(phoneNumber) {
  const phoneNumberPattern = /^\d{8}$/
  if (!phoneNumberPattern.test(phoneNumber)) throw new InvalidPhoneNumberFormat()
}
