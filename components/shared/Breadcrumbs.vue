<template>
	<nav class="breadcrumbs">
		<ul class="breadcrumbs__list">
			<!-- <li
				v-for="item in items"
				:key="`breadcrumbs__list-item-${item.ariaLabel}-${item.to}`"
				class="breadcrumbs__list-item"
				:class="{ 'breadcrumbs__list-item--is-active': item.current }"
			> -->
				<!-- // -->
				<!-- <NuxtLink
					class="breadcrumbs__list-link link"
					:to="item.to"
				>
					{{ item.ariaLabel }}
				</NuxtLink> -->
			<!-- </li> -->
		</ul>
	</nav>
</template>

<script lang="ts" setup>
// const items = useBreadcrumbItems()
</script>

<style lang="scss">
$b: '.breadcrumbs';

#{$b} {

	// .breadcrumbs__list
	&__list {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;

		// .breadcrumbs__list-item
		&-item {

			// .breadcrumbs__list-item--is-active
			&--is-active {
				opacity: 0.66;
				pointer-events: none;
				touch-action: none;
			}
		}
	}
}
</style>
