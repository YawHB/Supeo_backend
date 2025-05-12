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
