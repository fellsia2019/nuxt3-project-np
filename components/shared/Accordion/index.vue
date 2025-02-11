<template>
  <div class="accordion">
    <div class="accordion__header">
      <div class="accordion__header-name">
        <slot name="header" />

        <div class="accordion__header-btn">
          <SvgIcon icon="arr-bottom" class="accordion__header-icon" />
        </div>
      </div>
    </div>
    <div class="accordion__body">
      <div class="accordion__body-inner">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$b: '.accordion';

#{$b} {

  // .accordion__header
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;

    // .accordion__header-name
    &-name {

    }
  }
}
</style>
