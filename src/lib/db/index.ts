import type { EntityTable } from 'dexie';

import Dexie from 'dexie';

export type Song = {
	createdAt: Date;
	updatedAt: Date;
} & SongUpdate;

export type SongInput = {
	lyrics: string;
	title: string;
};

type Id = string;

type SongUpdate = {
	id: Id;
} & SongInput;

const db = new Dexie('app-db') as {
	songs: EntityTable<
		Song,
		'id' // primary key "id" (for the typings only)
	>;
} & Dexie;

// Schema declaration:
db.version(1).stores({
	songs: '++id, title, lyrics, createdAt, updatedAt' // primary key "id" (for the runtime!)
});

export function addSong(song: SongInput) {
	console.log('addSong', song);
	const now = new Date();
	return db.songs.add({
		...song,
		createdAt: now,
		id: crypto.randomUUID(),
		updatedAt: now
	});
}

export function deleteSong(id: Id) {
	return db.songs.delete(id);
}

export function updateSong(song: SongUpdate) {
	const now = new Date();
	return db.songs.update(song.id, { ...song, updatedAt: now });
}

export { db };
