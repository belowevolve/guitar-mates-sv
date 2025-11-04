<script lang="ts" module>
	import { cva, type VariantProps } from '$lib/ui';

	export const buttonGroupVariants = cva({
		base: "flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
		defaultVariants: {
			orientation: 'horizontal'
		},
		variants: {
			orientation: {
				horizontal:
					'[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none',
				vertical:
					'flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none'
			}
		}
	});

	export type ButtonGroupOrientation = VariantProps<typeof buttonGroupVariants>['orientation'];
</script>

<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { type WithElementRef } from '$lib/ui';

	let {
		children,
		class: className,
		orientation = 'horizontal',
		ref = $bindable(null),
		...restProps
	}: {
		orientation?: ButtonGroupOrientation;
	} & WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	class={buttonGroupVariants({ className, orientation })}
	data-orientation={orientation}
	data-slot="button-group"
	role="group"
	{...restProps}
>
	{@render children?.()}
</div>
