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
export class WorkHoursAreNegative extends GraphQLError {
  constructor(message = 'Sluttidspunkt ligger før start tidspunkt i denne vagt  ') {
    super(message, {
      extensions: {
        code: 'VAGT_OPRETTELSE_FORBUDT',
      },
    })
  }
}
