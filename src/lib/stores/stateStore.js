import supabase from "../supabase";
import { writable } from "svelte/store";

export const state = writable("home");
export const userName = writable(null);
export const playlist = writable([]);
export const songIndex = writable(0);
export const loading = writable(true);
export const formFocus = writable(false);

const setPlaylist = async () => {
    let tempPlaylist = [];
    const { data, error } = await supabase.storage.from('music-files').list();
    data.map((element) => {
        tempPlaylist.push({
            songName: element.name,
            url: null
        });
    });
    playlist.set(tempPlaylist);
}
setPlaylist();