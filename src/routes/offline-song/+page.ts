export const ssr = false;
import { db } from '$lib/db';
import { redirect } from '@sveltejs/kit';

export const load = async ({ url }) => {
	const id = url.searchParams.get('id');
	if (!id) {
		throw redirect(302, '/');
	}
	const song = await db.songs.get(id);
	if (!song) {
		throw redirect(302, '/');
	}
	return { song };
};
