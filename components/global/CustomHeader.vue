<template>
  <header ref="rootElement" class="custom-header">
    <div class="custom-header__wrapper">
      <div class="container">
        <div class="custom-header__inner">
          <NuxtLink :to="{ name: 'index' }" class="custom-header__logo">
            LOGO
          </NuxtLink>

          <nav class="custom-header__nav">
            <ul class="custom-header__nav-list">
              <li class="custom-header__nav-item">
                <NuxtLink class="custom-header__nav-link" :to="{ name: 'projects' }">
                  Проекты
                </NuxtLink>
              </li>
              <li class="custom-header__nav-item">
                <NuxtLink class="custom-header__nav-link" :to="{ name: 'todo' }">
                  Список дел
                </NuxtLink>
              </li>
              <li class="custom-header__nav-item">
                <NuxtLink class="custom-header__nav-link" :to="{ name: 'lk' }">
                  ЛК
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <div class="custom-header__actions">
            <NuxtLink :to="{ name: 'auth' }" class="custom-header__actions-item">
              Auth
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">

const rootElement = ref<HTMLElement | null>(null);
const resizeObserver = ref<ResizeObserver | null>(null)

function saveSettingInRootVars() {
  nextTick(() => {
    if (!rootElement.value) {
      return
    }

    const height = rootElement.value.scrollHeight

    document.documentElement.style.setProperty('--header-height', `${height}px`)
  })
}

onMounted(() => {
  if (import.meta.server) {
    return
  }

  resizeObserver.value = new ResizeObserver(saveSettingInRootVars)
  saveSettingInRootVars()

  if (rootElement.value) {
    resizeObserver.value.observe(rootElement.value)
  }
})

</script>

<style lang="scss">
$b: '.custom-header';

#{$b} {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 100;

  // .custom-header__inner
  &__wrapper {
    padding: 20px 0;
    border-bottom: 1px solid $color-primary;
    box-shadow: 0 0 30px 0 rgba($color-primary, 0.5);
    background-color: rgba($color-main, 0.8);
    backdrop-filter: blur(20px);
  }

  // .custom-header__inner
  &__inner {
    display: flex;
    align-items: center;
    gap: 40px;
  }

  // .custom-header__nav
  &__nav {

    // .custom-header__nav-list
    &-list {
      display: flex;
      align-items: center;
      gap: 16px;
    }
  }

  // .custom-header__actions
  &__actions {
    margin-left: auto;
  }
}
</style>
