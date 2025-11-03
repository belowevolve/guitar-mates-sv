export const ssr = false;
import { db } from '$lib/db';

export const load = async ({ url }) => {
	const query = url.searchParams.get('q') || '';
	const songs = await db.songs.where('title').startsWithIgnoreCase(query).toArray();
	return { query, songs };
};
