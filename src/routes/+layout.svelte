<script lang="ts">
	import './reset.css';
	import Nav from './Nav.svelte';
</script>

<main>
	<Nav />
	<slot />
	<Nav footer />
</main>
