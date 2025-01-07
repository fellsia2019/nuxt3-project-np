<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/api/user'

const userStore = useUserStore();

const resizeObserver = ref<ResizeObserver | null>(null)

function saveSettingInRootVars() {
  nextTick(() => {
    const height = window.innerHeight

    document.documentElement.style.setProperty('--app-height', `${height}px`)
  })
}

onMounted(() => {
  if (import.meta.server) {
    return
  }

  resizeObserver.value = new ResizeObserver(saveSettingInRootVars)
  saveSettingInRootVars()
  resizeObserver.value.observe(document.documentElement)
})

await useAsyncData('user-data', () => userStore.GET_USER_DATA().then(() => true))

</script>
