<template>
  <nav class="kit-navigation">
    <ul class="kit-navigation__list">
      <li
        v-for="item in navigationList"
        :key="`kit-navigation__item-${item.routeName}`"
        class="kit-navigation__item"
      >
        <NuxtLink class="kit-navigation__link link" :to="{ name: item.routeName }">
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">

const navigationList = [
  {
    routeName: 'kit',
    label: 'Кит главная'
  },
  {
    routeName: 'kit-blocks',
    label: 'Блоки'
  },
  {
    routeName: 'kit-controls',
    label: 'Кнопки'
  },
  {
    routeName: 'kit-styles',
    label: 'Стили'
  },
]

</script>

<style lang="scss">
$b: '.kit-navigation';

#{$b} {

  // .kit-navigation__list
  &__list {
    display: flex;
    align-items: center;
    white-space: nowrap;
    gap: 12px;
    flex-wrap: wrap;
  }

  // .kit-navigation__item
  &__item {
    &::before {
      content: '/';
    }
  }

  &__link {
    &.router-link-active {
      color: $color-primary;
    }
  }
}
</style>
