<template>
	<ClientOnly>
		<main class="login-page">
			<LoginBlock />
		</main>
	</ClientOnly>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: ['guest-only'],
	ssr: false,
})

useHead({
	title: 'Вход',
})
</script>
