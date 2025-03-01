<template>
  <div class="custom-header-burger">
    <div class="container">
      <div class="custom-header-burger__inner">
        <UserButton class="custom-header-burger__profile" />
        <nav class="custom-header-burger__nav">
          <ul class="custom-header-burger__nav-list">
            <li
              v-for="item in navigation"
              :key="`custom-header-burger__nav-item-${item.name}`"
              class="custom-header-burger__nav-item text-lg"
            >
              <NuxtLink class="custom-header-burger__nav-link link" :to="{ name: item.routeName }" @click="onClick">
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  navigation: Array<{ routeName: string; name: string }>
}

interface IEmits {
  (e: 'close'): void
}

import simpleLockPageScroll from '~/helpers/simpleLockPageScroll'

const props = defineProps<IProps>()
const emits = defineEmits<IEmits>()

function onClick() {
  emits('close')
}

onMounted(() => {
  simpleLockPageScroll(true)
})

onBeforeUnmount(() => {
  simpleLockPageScroll(false)
})

</script>

<style lang="scss">
$b: '.custom-header-burger';

#{$b} {
  position: fixed;
  left: 0;
  top: var(--header-height);
  width: 100%;
  height: calc(var(--app-height, 0px) - var(--header-height, 0px));
  overflow-y: auto;
  overflow-x: hidden;
  background-color: rgba($color-main, 0.8);
  backdrop-filter: blur(20px);
  z-index: 10;

  // .custom-header-burger__inner
  &__inner {
    padding: 24px 0;
    padding-right: var(--scroll-bar-width, 0px);
  }

  // .custom-header-burger__profile
  &__profile {
    margin-bottom: 24px;
  }

  // .custom-header-burger__nav
  &__nav {

    // .custom-header-burger__nav-list
    &-list {
    }

    // .custom-header-burger__nav-item
    &-item {
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
