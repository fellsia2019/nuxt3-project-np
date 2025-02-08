<template>
  <div
    v-if="notificationStore?.IS_VISIBLE"
    class="custom-notification"
  >
    <div class="container custom-notification__container">
      <div class="custom-notification__inner">
        <div class="custom-notification__body">
          <div
            v-for="notification in notificationStore?.NOTIFICATIONS"
            :key="`custom-notification__item-${notification.id}`"
            class="custom-notification__item"
            :class="`custom-notification__item--status-${notification.status}`"
          >
            <div class="custom-notification__item-inner">
              <div
                v-if="notification.title"
                v-html="notification.title"
                class="custom-notification__item-title fw-600"
              />
              <div
                v-if="notification.text"
                v-html="notification.text"
                class="custom-notification__item-text"
              />
              <div
                v-if="notification.id"
                class="custom-notification__item-close"
                @click="close(notification.id)"
              >
                X
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNotificationStore } from '~/store/common/notification'

const notificationStore = useNotificationStore();

function close(id: number) {
  notificationStore.REMOVE_NOTIFICATION(id)
}
</script>

<style lang="scss">
$b: '.custom-notification';

#{$b} {
  --gap: 20px;
  position: fixed;
  left: 0;
  top: calc(var(--header-height, 0px) + var(--gap));
  width: 100%;
  transform: translateX(-200vw);
  z-index: 10;
  user-select: none;

  // .custom-notification__container
  &__container {
    display: flex;
  }

  // .custom-notification__inner
  &__inner {
    display: inline-flex;
    justify-content: flex-end;
    margin-left: auto;
    transform: translateX(200vw);
  }

  // .custom-notification__body
  &__body {
    width: 300px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  // .custom-notification__item
  &__item {
    position: relative;
    border-radius: 12px;
    padding: 12px;
    border: 2px solid;
    font-size: 14px;
    background-color: $color-main;

    &--status-success {
      border-color: $color-success;
      color: $color-success;
    }
    &--status-warning {
      border-color: $color-warning;
      color: $color-warning;
    }
    &--status-danger {
      border-color: $color-danger;
      color: $color-danger;
    }
    &--status-primary {
      border-color: $color-primary;
      color: $color-primary;
    }

    // .custom-notification__item-inner
    &-inner {
      padding-right: 15px;
    }

    // .custom-notification__item-title
    &-title {
      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }

    // .custom-notification__item-text
    &-text {
      color: $color-light;
    }

    // .custom-notification__item-close
    &-close {
      position: absolute;
      right: 8px;
      top: 8px;
      border-radius: 50px;
      border: 1px solid currentColor;
      padding: 3px;
      cursor: pointer;
      transition: all 0.3s ease;
      will-change: color, background, transform;
      @include boxsize(15px);

      @include hover {
        background-color: currentColor;
      }
    }
  }
}

</style>
