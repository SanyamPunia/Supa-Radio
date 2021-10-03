import * as THREE from 'three';
import StarManager from '$lib/threejs/StarManager';
import AudioManager from '$lib/AudioManager';

export default class App {
    constructor() {
        this.initScene();
        this.songPlaying = false;

        this.starManager = new StarManager(this.scene, 1000);

        this.audioManager = new AudioManager();
    }

    animation(timestamp) {
        if (!this.lastTimeStamp) {
            this.lastTimeStamp = timestamp;
            return;
        }
        
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);

        const timeDelta = timestamp - this.lastTimeStamp;

        // animation enter here
        if (this.songPlaying) {
            let dataArray = this.audioManager.getFrequencyData();
            this.starManager.moveStars(timeDelta, dataArray);

        }

        this.renderer.render(this.scene, this.camera);
        this.lastTimeStamp = timestamp;
    }

    initScene() {
        const aspectRatio = window.innerWidth / window.innerHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.3, 100);
        this.scene.background = new THREE.Color(0x121212);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
        dirLight.position.set(0, 0, 200);
        this.scene.add(dirLight);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.render(this.scene, this.camera);
        this.renderer.setAnimationLoop(this.animation.bind(this));
        document.body.appendChild(this.renderer.domElement);
    }

    playSound() {
        this.audioManager.playSound();
        this.songPlaying = true;
    }

    muteSound() {
        this.audioManager.muteSound();
    }

    unmuteSound() {
        this.audioManager.unmuteSound();
    }

    pauseSound() {
        this.songPlaying = false;
        this.audioManager.pauseSound();
    }

    changeVolume(volume) {
        this.audioManager.changeVolume(volume)
    }

    tempFunction(event) {
        this.audioManager.tempFunction(event);
    }
}