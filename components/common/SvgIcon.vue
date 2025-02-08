<template>
  <div
    class="svg-icon"
    v-html="iconContent"
    :class="[$attrs.class, iconClass]"
  />
</template>

<script setup lang="ts">
interface IProps {
  icon: string;
}

const props = defineProps<IProps>()

const icons = import.meta.glob('~/assets/icons/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default'
})

const iconName = computed(() => `${props.icon}.svg`)
const iconContent = computed(() => icons[`/assets/icons/${iconName.value}`] as string)

const iconClass = computed(() => `icon--${props.icon}`)
</script>

<style lang="scss">
$b: '.svg-icon';

#{$b} {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
