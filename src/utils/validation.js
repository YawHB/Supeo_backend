import {
  InvalidEmailFormat,
  InvalidNameLength,
  InvalidPhoneNumberFormat,
  InvalidNameValues,
  PasswordsDoNotMatchError,
} from './custom-errors.js'

export function capitalize(names) {
  const capitalizedNames = []
  for (const name of names) {
    const firstLetter = name[0].toUpperCase()
    const rest = name.slice(1).toLowerCase()
    capitalizedNames.push(firstLetter + rest)
  }

  return capitalizedNames
}

function isOnlyLetters(name) {
  const formatted = /^[A-Za-zÆØÅæøå]+$/
  if (!formatted.test(name.trim())) throw new InvalidNameValues()
}

export function validateNameParts(...names) {
  const validNames = []

  for (const name of names) {
    isOnlyLetters(name)
    if (name.length < 2 || name.length >= 20) {
      throw new InvalidNameLength()
    }
    validNames.push(name)
  }
  return validNames
}

export function validateEmailFormat(email) {
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
  if (!emailPattern.test(email)) throw new InvalidEmailFormat()
}

export function isValidPhoneNumber(phoneNumber) {
  const phoneNumberPattern = /^\d{8}$/
  if (!phoneNumberPattern.test(phoneNumber)) throw new InvalidPhoneNumberFormat()
}

export function arePasswordsEqual(password1, password2) {
  if (password1 !== password2) throw new PasswordsDoNotMatchError()
}
