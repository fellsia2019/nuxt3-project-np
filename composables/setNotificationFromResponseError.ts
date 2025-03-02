import { NotificationStatus } from '~/types/common/Notification'

import { useNotificationStore } from '~/store/common/notification'

export default function (error: string | { [key: string]: Array<string> } | Array<string>) {
	let errorMessage = ''

	if (typeof error === 'string') {
		errorMessage = error
	}
	else if (typeof error === 'object') {
		if (Array.isArray(error)) {
			error.forEach((error) => {
				errorMessage += `${error} <br>`
			})
		}
		else {
			for (const key in error) {
				const value = error[key]
				errorMessage += `<b>${key}</b>: ${value} <br>`
			}
		}
	}

	const notificationStore = useNotificationStore()
	notificationStore.PUSH_NOTIFICATION({ status: NotificationStatus.DANGER, title: 'Ошибка!', text: errorMessage })
}
