<script lang="ts" module>
	import { cva, type VariantProps } from '$lib/ui';

	export const fieldVariants = cva({
		base: 'group/field data-[invalid=true]:text-destructive flex w-full gap-3',
		defaultVariants: {
			orientation: 'vertical'
		},
		variants: {
			orientation: {
				horizontal: [
					'flex-row items-center',
					'[&>[data-slot=field-label]]:flex-auto',
					'has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px has-[>[data-slot=field-content]]:items-start'
				],
				responsive: [
					'@md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto flex-col [&>*]:w-full [&>.sr-only]:w-auto',
					'@md/field-group:[&>[data-slot=field-label]]:flex-auto',
					'@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px'
				],
				vertical: 'flex-col [&>*]:w-full [&>.sr-only]:w-auto'
			}
		}
	});

	export type FieldOrientation = VariantProps<typeof fieldVariants>['orientation'];
</script>

<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { type WithElementRef } from '$lib/ui';

	let {
		children,
		class: className,
		orientation = 'vertical',
		ref = $bindable(null),
		...restProps
	}: {
		orientation?: FieldOrientation;
	} & WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	class={fieldVariants({ className, orientation })}
	data-orientation={orientation}
	data-slot="field"
	role="group"
	{...restProps}
>
	{@render children?.()}
</div>
