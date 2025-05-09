import { fetchNotification } from './notification.service.js'

export const notificationResolver = {
  Query: {
    notification: async (_, { id }, { sql }) => {
      return await fetchNotification(id, sql)
    },
  },
}
