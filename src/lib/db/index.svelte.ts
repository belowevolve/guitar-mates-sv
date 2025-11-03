import { liveQuery } from 'dexie';

type queryResult<T> = {
	current?: T;
	isPending: boolean;
	isError: boolean;
};

export function liveQ<T>(
	querier: () => T | Promise<T>,
	dependencies: () => unknown[]
): queryResult<T> {
	const query = $state<queryResult<T>>({
		current: undefined,
		isPending: false,
		isError: false
	});
	$effect(() => {
		dependencies?.();
		if (!query.current) {
			query.isPending = true;
		}
		return liveQuery(querier).subscribe((result) => {
			if (result !== undefined) {
				query.current = result;
				query.isError = false;
			} else {
				query.isError = true;
			}
			query.isPending = false;
		}).unsubscribe;
	});
	return query;
}
