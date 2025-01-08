<template>
  <div class="default-layout">
    <CustomHeader />
    <div class="default-layout__main">
      <NuxtPage />
    </div>
    <LoadingSpinner />
    <CustomFooter class="default-layout__footer" />
  </div>
</template>

<style lang="scss">
$b: '.default-layout';

#{$b} {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: var(--app-height, 100vh);
  padding-top: calc(var(--header-height, 0px) + 40px);
  transition: padding 0.3s ease;

  // .default-layout__footer
  &__footer {
    margin-top: auto;
  }

  // .default-layout__main
  &__main {
    margin: 30px 0 80px 0;
  }
}
</style>
