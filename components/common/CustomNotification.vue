<template>
  <div
    v-show="isVisible"
    class="custom-notification"
    :style="rootStyle"
  >
    <div class="container custom-notification__container">
      <div class="custom-notification__inner">
        <div class="custom-notification__body">
          <TransitionGroup name="notifications">
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
                  <SvgIcon icon="cross" />
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNotificationStore } from '~/store/common/notification'

const notificationStore = useNotificationStore();
const isVisible = ref(false)
const animationTime = 500 // ms
const timeoutId = ref<ReturnType<typeof setTimeout> | null>(null)

const rootStyle = computed(() => {
  return {
    '--animation-time': `${animationTime}ms`
  }
})

function close(id: number) {
  notificationStore.REMOVE_NOTIFICATION(id)
}

watch(() => notificationStore.NOTIFICATIONS.length, (newVal) => {
  if (newVal) {
    isVisible.value = true
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
    }
  } else {
    timeoutId.value = setTimeout(() => {
      isVisible.value = false
    }, animationTime);
  }
})
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
    // border: 2px solid;
    font-size: 14px;
    background-color: $color-main;
    box-shadow: 0 0 15px 3px currentColor;

    &--status-success {
      color: $color-success;
    }
    &--status-warning {
      color: $color-warning;
    }
    &--status-danger {
      color: $color-danger;
    }
    &--status-primary {
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
      @include boxsize(16px);

      @include hover {
        background-color: currentColor;
        svg {
          color: $color-dark;
        }
      }
    }
  }

  .notifications-enter-active,
  .notifications-leave-active {
    transition: all var(--animation-time) ease;
  }
  .notifications-enter-from,
  .notifications-leave-to {
    opacity: 0;
    transform: translateX(50%);
  }
}
</style>
