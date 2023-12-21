<script lang="ts">
	import type { PageServerData } from './$types';
	import '@daniel-livingston/doc-bootstrap/main.css';
	import 'highlight.js/styles/default.css';

	export let data: PageServerData;
</script>

<svelte:head>
	<title>Documentation | @daniellivingston/color</title>
	<meta
		name="description"
		content="Documentation for @daniellivingston/color, a color conversion and manipulation library for JavaScript and TypeScript."
	/>
</svelte:head>

<div class="doc">
	<nav class="doc-toc">
		<div class="doc-toc-header">Contents</div>
		{@html data.toc}
	</nav>
	<div class="doc-content">
		{@html data.content}
	</div>
</div>
