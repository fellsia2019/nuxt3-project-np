export enum NotificationStatus {
	SUCCESS = 'success',
	DANGER = 'danger',
	WARNING = 'warning',
	PRIMARY = 'primary',
}

export interface INotification {
	id?: number
	title?: string
	text?: string
	status: NotificationStatus
}

export interface INotificationCreateData extends INotification {
	timeToRemove?: number
	noRemoveByTimeout?: boolean
}
