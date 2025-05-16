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
