<template>
	<header
		ref="rootElement"
		class="custom-header"
	>
		<div class="custom-header__wrapper">
			<div class="container">
				<div class="custom-header__inner">
					<NuxtLink
						:to="{ name: 'index' }"
						class="custom-header__logo"
					>
						<MainLogo />
					</NuxtLink>

					<nav class="custom-header__nav">
						<ul class="custom-header__nav-list">
							<li
								v-for="item in navigation"
								:key="`custom-header__nav-item-${item.name}`"
								class="custom-header__nav-item"
							>
								<NuxtLink
									class="custom-header__nav-link link"
									:to="{ name: item.routeName }"
								>
									{{ item.name }}
								</NuxtLink>
							</li>
						</ul>
					</nav>

					<div class="custom-header__actions">
						<UserButton class="custom-header__actions-item" />
					</div>

					<CustomBurgerIcon
						class="custom-header__burger"
						:is-active="isOpenedBurgerMenu"
						@click="setStateIsOpenedBurgerMenu(!isOpenedBurgerMenu)"
					/>
				</div>
			</div>
		</div>

		<CustomHeaderBurger
			v-if="isOpenedBurgerMenu"
			class="custom-header__burger-menu"
			:navigation="navigation"
			@close="setStateIsOpenedBurgerMenu(false)"
		/>
	</header>
</template>

<script setup lang="ts">
const rootElement = ref<HTMLElement | null>(null)
const resizeObserver = ref<ResizeObserver | null>(null)

const isOpenedBurgerMenu = ref(false)

const navigation = [
	{
		routeName: 'projects',
		name: 'Проекты',
	},
	{
		routeName: 'initiatives',
		name: 'Инициативы',
	},
	{
		routeName: 'todo',
		name: 'Список дел',
	},
	{
		routeName: 'login',
		name: 'login',
	},
	{
		routeName: 'kit',
		name: 'kit',
	},
	{
		routeName: 'lk',
		name: 'Личный кабинет',
	},
]

function saveSettingInRootVars() {
	nextTick(() => {
		if (!rootElement.value) {
			return
		}

		const height = rootElement.value.clientHeight

		document.documentElement.style.setProperty('--header-height', `${height}px`)
	})
}

function setStateIsOpenedBurgerMenu(state: boolean) {
	isOpenedBurgerMenu.value = state
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

	window.addEventListener('resize', saveSettingInRootVars)
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

  // .custom-header__wrapper
  &__wrapper {
    padding: 5px 0;
    border-bottom: 1px solid $color-light;
    box-shadow: 0 0 30px 0 rgba($color-light, 0.5);
    background-color: rgba($color-main, 0.8);
    backdrop-filter: blur(20px);
    padding-right: var(--scroll-bar-width, 0px);
  }

  // .custom-header__inner
  &__inner {
    display: flex;
    align-items: center;
    gap: 40px;
  }

  // .custom-header__logo
  &__logo {
    display: inline-flex;
  }

  // .custom-header__nav
  &__nav {
    @include tablet {
      display: none;
    }

    // .custom-header__nav-list
    &-list {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    // .custom-header__nav-link
    &-link {
      &.router-link-active {
        color: $color-primary;
      }
    }
  }

  // .custom-header__actions
  &__actions {
    margin-left: auto;

    @include tablet {
      display: none;
    }
  }

  // .custom-header__burger
  &__burger {
    margin-left: auto;

    @include tablet-min {
      display: none;
    }
  }

  // .custom-header__burger-menu
  &__burger-menu {
    @include tablet-min {
      display: none;
    }
  }
}
</style>
