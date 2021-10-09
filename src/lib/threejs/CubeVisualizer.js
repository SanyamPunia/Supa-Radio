import * as THREE from 'three'
import * as Utility from '$lib/utility'

export default class CubeVisualizer {
    constructor(scene) {
        this.scene = scene;
        this.initScene();
    }

    animate(timeDelta, dataArray) {
        let base = 0.01;
        
        for(let i=0;i<32;i++) {
            let scaleAmount = base + (base * dataArray[i])
            this.cubes[i].scale.setZ(scaleAmount * timeDelta);
        }
    }

    initScene() {
        const backWall = new THREE.Mesh(
            new THREE.PlaneGeometry(20,10),
            new THREE.MeshPhongMaterial({color: 0xff0066})
        );
        backWall.receiveShadow = true;
        backWall.position.setZ(-10);
        this.scene.add(backWall);
        
        this.cubes = [];
        for(let i=0;i<32;i++) {
            let cube = new THREE.Mesh(
                new THREE.BoxBufferGeometry(0.3,0.3,0.3,24,24,24),
                new THREE.MeshPhongMaterial({color: 0x97ed75})
            )
            let x = (i - 16)/2;
            cube.position.setX(x);
            cube.receiveShadow = true;
            cube.castShadow = true;
            this.cubes.push(cube);
        }

        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(20,10),
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
