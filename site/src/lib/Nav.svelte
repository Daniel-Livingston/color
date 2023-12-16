<script lang="ts">
	import Icon from '@iconify/svelte';

	export let footer = false;
</script>

<div class="layout" class:footer>
	<nav>
		<a href="https://github.com/Daniel-Livingston/color" aria-label="Github">
			<Icon icon="mdi:github" width="2rem" height="2rem" />
		</a>
		<a href="https://www.npmjs.com/package/@daniel-livingston/color" aria-label="npm">
			<Icon icon="mdi:npm" width="2rem" height="2rem" />
		</a>
	</nav>
</div>

<style>
	.layout {
		padding-inline: 1rem;
	}

	.layout:not(.footer) {
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	}

	.footer {
		border-top: 1px solid rgba(0, 0, 0, 0.2);
	}

	nav {
		display: flex;
		justify-content: flex-end;
		width: 100%;
		gap: 0.5rem;
		padding-block: 1rem;
	}

	a {
		color: #000;
	}

	@media (min-width: 992px) {
		.layout {
			display: grid;
			grid-template-columns: auto 16rem 3rem min(100%, 48rem) 3rem auto;
		}

		nav {
			grid-column: 2 / span 3;
		}
	}
</style>
