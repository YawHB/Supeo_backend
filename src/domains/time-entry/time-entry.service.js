import { updateTimeEntryStatus } from './time-entry.repository.js'

const updateStatus = async (id, status, sql) => {
  const validStatuses = ['PENDING', 'GODKENDT', 'AFVIST']
  if (!validStatuses.includes(status)) {
    throw new Error('Invalid status')
  }

  return updateTimeEntryStatus(id, status, sql)
}

export default {
  updateStatus,
}
