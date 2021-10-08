import { writable } from "svelte/store";

export const state = writable("home");
export const userName = writable(null);
export const playlist = writable([]);
export const songIndex = writable(0);