import { GraphQLError } from 'graphql'

export class OverlappingTimeEntryExist extends GraphQLError {
  constructor(message = 'Din vagt du ønsker at oprette, overlapper en eksisterende') {
    super(message, {
      extensions: {
        code: 'VAGT_OPRETTELSE_FORBUDT',
      },
    })
  }
}
export class UserGroupDoesNotExist extends GraphQLError {
  constructor(message = 'Den valgte brugergruppe er ugyldig') {
    super(message, {
      extensions: {
        code: 'UGYLDIG_BRUGERGRUPPE',
      },
    })
  }
}
export class PermissionLevelDoesNotExist extends GraphQLError {
  constructor(message = 'Den valgte brugerrettighed er ugyldig') {
    super(message, {
      extensions: {
        code: 'UGYLDIG_BRUGERRETTIGHED',
      },
    })
  }
}

export class WorkHoursAreNegative extends GraphQLError {
  constructor(message = 'Sluttidspunkt ligger før start tidspunkt i denne vagt  ') {
    super(message, {
      extensions: {
        code: 'VAGT_OPRETTELSE_FORBUDT',
      },
    })
  }
}

export class EmailAlreadyExist extends GraphQLError {
  constructor(message = 'Den indtastede email er allerede i brug ') {
    super(message, {
      extensions: {
        code: 'DUBLIKERET_EMAIL',
      },
    })
  }
}
export class InvalidEmailFormat extends GraphQLError {
  constructor(message = 'Ugyldig emailformat') {
    super(message, {
      extensions: {
        code: 'UGYLDIGT_EMAIL_FORMAT',
      },
    })
  }
}

export class InCorrectEmailOrPassword extends GraphQLError {
  constructor(message = 'Email eller password er ikke korrekt. prøv igen') {
    super(message, {
      extensions: {
        code: 'UKENDT_EMAIL_ELLER_PASSOWRD',
      },
    })
  }
}

export class InvalidPhoneNumberFormat extends GraphQLError {
  constructor(message = 'Ugyldig telefonnummer') {
    super(message, {
      extensions: {
        code: 'UGYLDIGT_TELEFONNUMMER_FORMAT',
      },
    })
  }
}
export class InvalidNameLength extends GraphQLError {
  constructor(message = 'Det indtastede navn skal være mellem 2-20 tegn ') {
    super(message, {
      extensions: {
        code: 'UGYLDIGT_NAVN',
      },
    })
  }
}
export class InvalidNameValues extends GraphQLError {
  constructor(message = 'Det indtastede navn må kun indeholde bogstaver') {
    super(message, {
      extensions: {
        code: 'UGYLDIGT_NAVN',
      },
    })
  }
}

export class MissingOrMalformedAuthHeader extends GraphQLError {
  constructor(message = 'Authorization-header mangler eller er forkert formatteret') {
    super(message, {
      extensions: {
        code: 'MANGELFULDT_AUTH_HEADER',
      },
    })
  }
}

export class InvalidOrExpiredToken extends GraphQLError {
  constructor(message = 'Token er ugyldig eller udløbet – log venligst ind igen.') {
    super(message, {
      extensions: {
        code: 'UGYLDIG_TOKEN',
      },
    })
  }
}
