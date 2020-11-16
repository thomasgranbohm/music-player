import { writable } from "svelte/store";

export const playbackId = writable(null);
export const playlists = writable([]);