<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<svelte:head>
	<title>Documentation | @daniellivingston/color</title>
	<meta
		name="description"
		content="Documentation for @daniellivingston/color, a color conversion and manipulation library for JavaScript and TypeScript."
	/>
</svelte:head>

<div class="layout">
	<nav class="toc">
		<div class="toc-header">Contents</div>
		{@html data.toc}
	</nav>
	<div class="content">
		{@html data.content}
	</div>
</div>

<style>
	@import 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css';

	.layout {
		padding-inline: 1rem;
	}

	.toc :global(ol) {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.toc :global(li > ol) {
		padding-left: 1rem;
	}

	.toc :global(a) {
		color: inherit;
		text-decoration: none;
	}

	.content :global(h2) {
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	}

	.content :global(:is(pre, p)) {
		margin-top: 1rem;
	}

	@media (max-width: 991px) {
		.toc {
			border-bottom: 1px solid rgba(0, 0, 0, 0.2);
			padding-block: 1rem;
		}

		.toc-header {
			font-size: 1.25rem;
			font-weight: 700;
			margin-bottom: 1rem;
		}

		.toc :global(a) {
			display: block;
			font-size: 1.125rem;
			padding: 0.25rem;
		}

		.content {
			padding-block: 1rem;
		}

		.content :global(h1) {
			font-size: 2rem;
		}

		.content :global(h2) {
			font-size: 1.5rem;
			margin-top: 1.5rem;
		}

		.content :global(h3) {
			font-size: 1.25rem;
			margin-top: 1rem;
		}

		.content :global(h4) {
			font-size: 1.125rem;
			margin-top: 1rem;
		}
	}

	@media (min-width: 992px) {
		.layout {
			display: grid;
			grid-template-columns: auto 16rem 3rem min(100%, 48rem) 3rem auto;
			position: relative;
		}

		.toc {
			padding-top: 4rem;
			grid-column: 2;
			border-right: 1px solid rgba(0, 0, 0, 0.2);
		}

		.toc-header {
			font-size: 1.5rem;
			margin-bottom: 1.5rem;
		}

		.toc :global(li) {
			font-size: 1.125rem;
		}

		.content {
			padding-block: 3rem;
			grid-column: 4;
			max-width: 48rem;
		}

		.content :global(h1) {
			font-size: 2.5rem;
		}

		.content :global(h2) {
			font-size: 2rem;
			margin-top: 1.5rem;
		}

		.content :global(h3) {
			font-size: 1.5rem;
			margin-top: 1rem;
		}

		.content :global(h4) {
			font-size: 1.25rem;
			margin-top: 1rem;
		}
	}
</style>
