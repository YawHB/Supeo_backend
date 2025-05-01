import { getNotificationById } from './notification.repository.js'

export async function fetchNotification(id, sql) {
  return await getNotificationById(id, sql)
}