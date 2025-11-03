<script lang="ts" module>
	import type { VariantProps } from '$lib/ui';

	import { cva } from '$lib/ui';

	export const inputGroupAddonVariants = cva({
		base: "text-muted-foreground flex h-auto cursor-text select-none items-center justify-center gap-2 py-1.5 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
		defaultVariants: {
			align: 'inline-start'
		},
		variants: {
			align: {
				'block-end':
					'[.border-t]:pt-3 order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5',
				'block-start':
					'[.border-b]:pb-3 order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5',
				'inline-end': 'order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]',
				'inline-start': 'order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]'
			}
		}
	});

	export type InputGroupAddonAlign = VariantProps<typeof inputGroupAddonVariants>['align'];
</script>

<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import type { WithElementRef } from '$lib/ui';

	let {
		align = 'inline-start',
		children,
		class: className,
		ref = $bindable(null),
		...restProps
	}: {
		align?: InputGroupAddonAlign;
	} & WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	class={inputGroupAddonVariants({ align, className })}
	data-align={align}
	data-slot="input-group-addon"
	onclick={(e) => {
		if ((e.target as HTMLElement).closest('button')) {
			return;
		}
		e.currentTarget.parentElement?.querySelector('input')?.focus();
	}}
	role="group"
	{...restProps}
>
	{@render children?.()}
</div>
