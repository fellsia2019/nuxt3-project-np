<template>
	<div class="user-button">
		<div
			v-if="userStore?.IS_AUTH"
			class="user-button__inner"
		>
			<SvgIcon
				class="user-button__logout-icon"
				icon="logout"
				@click="userStore.LOGOUT"
			/>
			<NuxtLink
				:to="{ name: 'lk' }"
				class=" link link--primary"
			>
				{{ userStore.user?.username }}
			</NuxtLink>
		</div>
		<NuxtLink
			v-else
			:to="{ name: 'login' }"
			class="user-button__inner"
		>
			<CustomButton
				:size="CustomButtonSizeSettings.SM"
				:mode="CustomButtonModeSettings.OUTLINE"
			>
				<SvgIcon
					class="user-button__user-icon"
					icon="user"
				/>
				<span>Вход</span>
			</CustomButton>
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
import { CustomButtonSizeSettings, CustomButtonModeSettings } from '~/types/common/CustomButton'
import { useUserStore } from '~/store/api/user'

const userStore = useUserStore()
</script>

<style lang="scss">
$b: '.user-button';

#{$b} {

  // .user-button__inner
  &__inner {
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  // .user-button__logout-icon
  &__logout-icon {
    width: 20px;
    height: 20px;
    color: $color-light;
    cursor: pointer;

    @include hover {
      color: $color-primary;

      svg {
        transform: translateX(-2px);
      }
    }

    svg {
      transition: $td;
      fill: currentColor;
    }
  }

  // .user-button__user-icon
  &__user-icon {
    width: 14px;
    height: 14px;
    margin-right: 4px;
    margin-bottom: 2px;

    svg {
      fill: currentColor;
    }
  }
}
</style>
