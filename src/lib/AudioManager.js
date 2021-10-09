import supabase from "$lib/supabase";
import * as Utility from "$lib/utility";

export default class AudioManager {
    constructor() {
        this.audio = new Audio();
        this.audio.crossOrigin = "anonymous";
        this.initialized = false;
        this.audioGain = true;
    }

    changeSound(url) {
        
        this.audio.src = url;
    }

    playSound() {
        if (!this.initialized) {
            this.audioCtx = new AudioContext();
            this.gainNode = this.audioCtx.createGain()
            this.audioSource = this.audioCtx.createMediaElementSource(this.audio);
            this.analyser = this.audioCtx.createAnalyser();
            this.audioSource.connect(this.analyser);
            this.analyser.connect(this.gainNode);
            this.gainNode.connect(this.audioCtx.destination);
            this.analyser.fftSize = 64;
            this.bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(this.bufferLength);
            this.gainNode.gain.value = 0.2;
            this.initialized = true;
        }
        this.audio.play();
    }

    muteSound() {
        this.gainNode.gain.value = 0;
    }

    unmuteSound() {
        this.gainNode.gain.value = 1;
    }

    pauseSound() {
        this.audio.pause();
    }

    changeVolume(volume)
    {
        this.gainNode.gain.value = volume/100;
    }

    getFrequencyData() {
        this.analyser.getByteFrequencyData(this.dataArray);
        return this.dataArray;
    }

    addProgressEvent(progressBar) {
        this.audio.addEventListener("timeupdate", () => {
            let percent = (this.audio.currentTime/this.audio.duration) * 100;
            progressBar.style.width = percent + '%';
        });
    }
}