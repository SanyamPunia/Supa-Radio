import * as THREE from 'three'
import * as Utility from '$lib/utility'

export default class CubeVisualizer {
    constructor(scene) {
        this.scene = scene;
        this.colors = [0xff0066, 0xd40055, 0xaa0044, 0x550022, 0x800033]    
        this.initScene();
    }

    animate(timeDelta, dataArray) {
        let base = 0.01;
        
        for(let i=0;i<32;i++) {
            let scaleAmount = Math.min(base + (base * dataArray[i]), 2.56)
            this.cubes[i].scale.setZ(scaleAmount * timeDelta);
        }
    }

    initScene() {
        // const backWall = new THREE.Mesh(
        //     new THREE.PlaneGeometry(20,10),
        //     new THREE.MeshPhongMaterial({color: 0xff0066})
        // );
        // backWall.receiveShadow = true;
        // backWall.position.setZ(-15);
        // this.scene.add(backWall);
        
        this.cubes = [];
        let gap = 0.7;
        for(let i=0;i<32;i++) {
            let cube = new THREE.Mesh(
                new THREE.BoxBufferGeometry(1,1,1,24,24,24),
                new THREE.MeshPhongMaterial({color: Utility.getRandomElement(this.colors, this.colors.length)})
            )
            let x = (i - 16)/gap;
            let y = -Utility.randomBetween(15,25)
            cube.position.setX(x);
            cube.position.setY(y);
            cube.receiveShadow = true;
            cube.castShadow = true;
            this.cubes.push(cube);
        }

        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(50,50),
            new THREE.MeshPhongMaterial({color: 0x5c7aea, side: THREE.DoubleSide})
        );
        floor.rotateX(-80)
        floor.position.setZ(-10);
        floor.position.setY(-5);
        floor.receiveShadow = true;
        for(let i=0;i<32;i++)
            floor.add(this.cubes[i]);
        this.scene.add(floor);

        
    }
}
