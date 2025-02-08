<template>
  <div class="login-block">
    <div class="container">
      <div class="login-block__inner">
        <div class="login-block__tabs">
          <div
            v-for="tab in tabs"
            :key="`login-block__tab-${tab.id}`"
            class="login-block__tab"
            :class="{ 'login-block__tab--is-active': isActiveTab(tab.id) }"
            @click="selectTab(tab.id)"
          >
            <div class="login-block__tab-link">
              {{ tab.name }}
            </div>
          </div>
        </div>

        <div class="login-block__body">
          <AuthForm v-if="currentTab === 1" class="login-block__form" />
          <RegistrationForm v-if="currentTab === 2" class="login-block__form" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const tabs = [
  {
    id: 1,
    name: 'Авторизация',
  },
  {
    id: 2,
    name: 'Регистрация'
  }
]

const currentTab = ref<number>(1)

function isActiveTab(id: number) {
  return currentTab.value === id
}

function selectTab(id: number) {
  currentTab.value = id
}

</script>


<style lang="scss">
$b: '.login-block';

#{$b} {

  // .login-block__body
  &__body {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-width: 460px;
    margin: auto;
  }

  // .login-block__tabs
  &__tabs {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    margin-bottom: 32px;
    user-select: none;
  }

  // .login-block__tab
  &__tab {
    position: relative;
    cursor: pointer;
    transition: $td;
    padding-bottom: 5px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      height: 1px;
      width: 100%;
      background-color: currentColor;
      opacity: 0;
      transition: $td;
    }

    // .login-block__tab--is-active
    &--is-active {
      color: $color-primary;

      &::after {
        opacity: 1;
      }
    }

    @include hover {
      color: $color-primary;
    }
  }
}
</style>
