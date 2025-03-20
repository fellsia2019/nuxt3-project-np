<template>
	<div class="custom-checkbox">
		<div class="custom-checkbox__inner">
			<input
				:id="id"
				type="checkbox"
				class="custom-checkbox__input"
				:checked="modelValue"
			>
			<label
				:for="id"
				class="custom-checkbox__label"
			>
				<slot />
			</label>
		</div>
	</div>
</template>

<script lang="ts" setup>
interface IProps {
	modelValue: boolean
	disabled?: boolean
	isError?: boolean
}

defineProps<IProps>()

const id = useId()
</script>

<style lang="scss">
$b: '.custom-checkbox';
$size-icon: 24px;

#{$b} {

	&__inner {
		min-height: $size-icon;
		display: inline-flex;
		align-items: center;
	}

	// .custom-checkbox__label
	&__label {
		position: relative;
		padding-left: calc($size-icon + 8px);
		cursor: pointer;

		@include hover {
			&::after {
				opacity: 0.25;
			}
		}

		&::before,
		&::after {
			content: '';
			position: absolute;
			top: 50%;
			left: 0;
			transition: $td;
			transform: translateY(-50%);
		}

		&::before {
			border: 1px solid $color-primary;
			@include boxsize($size-icon);
		}

		&::after {
			width: calc($size-icon - 12px);
			height: calc($size-icon - 12px);
			left: 6px;
			opacity: 0;
			background-color: $color-primary;
		}
	}

	// .custom-checkbox__input
	&__input {
		display: none;

		&:checked ~ #{$b}__label {
			&::after {
				opacity: 1;
			}
		}
	}
}
</style>
