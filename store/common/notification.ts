import { defineStore } from 'pinia';

import { type INotification, type INotificationCreateData, NotificationStatus } from '~/types/common/Notification'

interface INotificationState {
  callbacks: { [key: number]: ReturnType<typeof setTimeout> };
  notifications: Array<INotification>
}

export const useNotificationStore = defineStore('notification', {
  state: (): INotificationState => ({
    callbacks: {},
    notifications: []
  }),

  getters: {
    IS_VISIBLE: (state) => state.notifications?.length,

    NOTIFICATIONS: (state) => state.notifications,
  },

  actions: {
    PUSH_NOTIFICATION({ status, title, text, timeToRemove, id, noRemoveByTimeout }: INotificationCreateData) {
      const notificationId = id || Date.now()

      if (!noRemoveByTimeout) {
        // отложенное удаление уведломление через время timeToRemove в мс
        this.callbacks[notificationId] = setTimeout(() => {
          this.notifications = this.notifications.filter(item => item.id !== notificationId)
        }, timeToRemove || 10000);
      }

      this.notifications.push({
        status: status || NotificationStatus.PRIMARY,
        title: title || '',
        text: text || '',
        id: notificationId
      })
    },


    REMOVE_NOTIFICATION(id: number) {
      clearTimeout(this.callbacks?.[id])

      this.notifications = this.notifications.filter(notification => notification.id !== id)
    }
  },
});
