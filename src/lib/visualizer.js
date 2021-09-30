export default class Visualizer {
    constructor() {
        this.audio = new Audio('test.m4a');
    }

    playSound() {
        this.audioCtx = new AudioContext();
        this.audioSource = this.audioCtx.createMediaElementSource(this.audio);
        this.analyser = this.audioCtx.createAnalyser();
        this.audioSource.connect(this.analyser);
        this.analyser.connect(this.audioCtx.destination);
        this.analyser.fftSize = 64;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        this.audio.play();
    }

    getFrequencyData() {
        this.analyser.getByteFrequencyData(this.dataArray);
        console.log(this.dataArray);
        return this.dataArray; 
    }
}