import * as THREE from 'three';
import StarManager from '$lib/threejs/StarManager';
import AudioManager from '$lib/AudioManager';
import CubeVisualizer from './CubeVisualizer';

export default class App {
    constructor() {
        this.initScene();
        this.songPlaying = false;
        this.currentVisualizer = null;

        this.visualizerType = {
            STARS: 'stars',
            CUBES: 'cubes'
        }
        this.setActiveVisualizer(this.visualizerType.STARS);
        this.audioManager = new AudioManager();
    }

    setActiveVisualizer(type) {
        this.clearScene();
        this.currentVisualizer = type;
        switch(this.currentVisualizer)
        {
            case this.visualizerType.STARS:
                this.visualizer = new StarManager(this.scene, 1000);
                break;
            case this.visualizerType.CUBES:
                this.visualizer = new CubeVisualizer(this.scene);
                break;
        }
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
        if (this.songPlaying && this.visualizer!= null) {
            let dataArray = this.audioManager.getFrequencyData();
            this.visualizer.animate(timeDelta, dataArray);
        }

        this.renderer.render(this.scene, this.camera);
        this.lastTimeStamp = timestamp;
    }

    initScene() {
        const aspectRatio = window.innerWidth / window.innerHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.3, 100);
        this.scene.background = new THREE.Color(0x121212);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.render(this.scene, this.camera);
        this.renderer.setAnimationLoop(this.animation.bind(this));
        document.body.appendChild(this.renderer.domElement);
    }

    clearScene() {
        while(this.scene.children.length > 0){ 
            this.scene.remove(this.scene.children[0]); 
        }
        
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        this.scene.add(ambientLight);
    }

    playSound() {
        this.audioManager.playSound(url);
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