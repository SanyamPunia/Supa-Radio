import * as THREE from 'three';
import StarManager from '$lib/threejs/StarManager';
import Visualizer from '$lib/visualizer';

export default class App {
    constructor() {
        this.initScene();
        this.songPlaying = false;

        this.starManager = new StarManager(this.scene, 1000);

        this.visualizer = new Visualizer();
    }

    animation(timestamp) {
        if (!this.lastTimeStamp) {
            this.lastTimeStamp = timestamp;
            return;
        }
        const timeDelta = timestamp - this.lastTimeStamp;

        // animation enter here
        if(this.songPlaying)
        {
            let dataArray = this.visualizer.getFrequencyData();
            this.starManager.moveStars(timeDelta, dataArray);

        }

        this.renderer.render(this.scene, this.camera);
        this.lastTimeStamp = timestamp;
    }
    
    initScene() {
        const aspectRatio = window.innerWidth / window.innerHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.3, 100);
        
        const dirLight =  new THREE.DirectionalLight(0xffffff, 0.6);
        dirLight.position.set(0, 0, 200);
        this.scene.add(dirLight);

        this.renderer = new THREE.WebGL1Renderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.render(this.scene, this.camera);
        this.renderer.setAnimationLoop(this.animation.bind(this));
        document.body.appendChild(this.renderer.domElement);
    }

    playSound() {
        this.visualizer.playSound();
        this.songPlaying = true;
    }
}