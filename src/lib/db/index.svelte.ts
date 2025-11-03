import { liveQuery } from 'dexie';

type QueryResult<T> = {
	current?: T;
	isPending: boolean;
	isError: boolean;
};

export function liveQ<T>(
	querier: () => T | Promise<T>,
	dependencies: () => unknown[],
	options?: {
		initialValue?: T;
	}
): QueryResult<T> {
	const query = $state<QueryResult<T>>({
		current: options?.initialValue,
		isPending: true,
		isError: false
	});
	$effect(() => {
		dependencies?.();
		console.log('dependencies', dependencies());
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
