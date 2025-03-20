<template>
	<component
		:is="resultTag"
		class="custom-button"
		:class="rootClass"
		:href="href"
	>
		<slot />
	</component>
</template>

<script setup lang="ts">
import { CustomButtonSizeSettings, CustomButtonModeSettings } from '~/types/common/CustomButton'
import { AllBaseColors } from '~/types/common/Themes'

interface ICustomButtonProps {
	tag?: string
	href?: string
	size?: CustomButtonSizeSettings
	theme?: AllBaseColors
	disabled?: boolean
	mode?: CustomButtonModeSettings
}

const props = withDefaults(defineProps<ICustomButtonProps>(), {
	tag: 'button',
	href: '',
	size: CustomButtonSizeSettings.MD,
	theme: AllBaseColors.PRIMARY,
	mode: CustomButtonModeSettings.FILL,
	disabled: false,
})

const resultTag = computed(() => props.href ? 'a' : props.tag)

const rootClass = computed(() => {
	const prefix = 'custom-button'
	const classes = []

	if (props.disabled) {
		classes.push(`${prefix}--disabled`)
	}

	classes.push(`${prefix}--mode-${props.mode}`)
	classes.push(`${prefix}--size-${props.size}`)
	classes.push(`${prefix}--theme-${props.theme}`)

	return classes.join(' ')
})
</script>

<style lang="scss">
$b: '.custom-button';

#{$b} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
  user-select: none;
  transition: $td;
  border: 1px solid transparent;
  cursor: pointer;
  font-weight: 500;

	--theme-color: transparent;
	--text-color: #{$color-light};

	&--mode-fill {
		background-color: var(--theme-color);
    color: var(--text-color);
    border-color: var(--theme-color);
    box-shadow: 0 0 15px rgba(var(--theme-color), 0.5);

    &:hover {
      background-color: transparent;
      color: var(--theme-color);
      box-shadow: 0 0 15px rgba(var(--theme-color), 1);
    }
    &:active {
      background-color: var(--theme-color);
      color: var(--text-color);
      box-shadow: 0 0 15px rgba(var(--theme-color), 0.5);
    }
	}

	&--mode-outline {
		background-color: transparent;
    color: var(--theme-color);
    border-color: var(--theme-color);
    box-shadow: 0 0 15px rgba(var(--theme-color), 0.5);

    &:hover {
      background-color: var(--theme-color);
      color: var(--text-color);
      box-shadow: 0 0 15px rgba(var(--theme-color), 1);
    }
    &:active {
      background-color: transparent;
      color: var(--theme-color);
      border-color: var(--theme-color);
      box-shadow: 0 0 15px rgba(var(--theme-color), 0.5);
    }
	}

  // themes
	// .custom-button--theme-light
	&--theme-light {
		--theme-color: #{$color-light};
		--text-color: #{$color-main};
  }

	// .custom-button--theme-light-2
	&--theme-light-2 {
		--theme-color: #{$color-light-2};
		--text-color: #{$color-main};
  }

	// .custom-button--theme-secondary
	&--theme-secondary {
		--theme-color: #{$color-secondary};
		--text-color: #{$color-main};
  }

	// .custom-button--theme-secondary-2
	&--theme-secondary-2 {
		--theme-color: #{$color-secondary-2};
		--text-color: #{$color-main};
  }

	// .custom-button--theme-secondary-3
	&--theme-secondary-3 {
		--theme-color: #{$color-secondary-3};
		--text-color: #{$color-main};
  }

	// .custom-button--theme-main
	&--theme-main {
		--theme-color: #{$color-main};
  }

	// .custom-button--theme-main-light
	&--theme-main-light {
		--theme-color: #{$color-main-light};
  }

	// .custom-button--theme-dark
	&--theme-dark {
		--theme-color: #{$color-dark};
  }

  // .custom-button--theme-danger
  &--theme-danger {
		--theme-color: #{$color-danger};
  }

	// .custom-button--theme-warning
	&--theme-warning {
		--theme-color: #{$color-warning};
  }

	// .custom-button--theme-success
	&--theme-success {
		--theme-color: #{$color-success};
  }

	// .custom-button--theme-darksuccess
	&--theme-dark-success {
		--theme-color: #{$color-dark-success};
  }

  // .custom-button--theme-primary
  &--theme-primary {
		--theme-color: #{$color-primary};
  }

  // .custom-button--theme-primary-accent
  &--theme-primary-accent {
		--theme-color: #{$color-primary-accent};
  }

  // sizes
  // .custom-button--size-sm
  &--size-sm {
    padding: 10px 20px;
    border-radius: 20px;

    @include mobile {
      padding: 8px 16px;
    }
  }

  // .custom-button--size-md
  &--size-md {
    padding: 14px 40px;
    border-radius: 30px;

    @include mobile {
      padding: 12px 26px;
    }
  }

  // .custom-button--size-lg
  &--size-lg {
    padding: 22px 30px;
    border-radius: 25px;
    font-size: 18px;

    @include mobile {
      padding: 12px 22px;
    }
  }
}
</style>
