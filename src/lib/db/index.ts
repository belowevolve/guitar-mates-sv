import type { EntityTable } from 'dexie';
import Dexie from 'dexie';

type Id = string;

export type SongInput = {
	title: string;
	lyrics: string;
};

type SongUpdate = SongInput & {
	id: Id;
};

export type Song = SongUpdate & {
	createdAt: Date;
	updatedAt: Date;
};

const db = new Dexie('app-db') as Dexie & {
	songs: EntityTable<
		Song,
		'id' // primary key "id" (for the typings only)
	>;
};

// Schema declaration:
db.version(1).stores({
	songs: '++id, title, lyrics, createdAt, updatedAt' // primary key "id" (for the runtime!)
});

export function addSong(song: SongInput) {
	console.log('addSong', song);
	const now = new Date();
	return db.songs.add({
		...song,
		id: crypto.randomUUID(),
		createdAt: now,
		updatedAt: now
	});
}

export function updateSong(song: SongUpdate) {
	const now = new Date();
	return db.songs.update(song.id, { ...song, updatedAt: now });
}

export function deleteSong(id: Id) {
	return db.songs.delete(id);
}

export { db };
