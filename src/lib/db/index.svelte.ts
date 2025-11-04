import { liveQuery } from 'dexie';

type QueryResult<T> = {
	current?: T;
	isError: boolean;
	isPending: boolean;
};

export function liveQ<T>(
	querier: () => Promise<T> | T,
	dependencies: () => unknown[],
	options?: {
		initialValue?: T;
	}
): QueryResult<T> {
	const query = $state<QueryResult<T>>({
		current: options?.initialValue,
		isError: false,
		isPending: true
	});
	$effect(() => {
		dependencies?.();
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
