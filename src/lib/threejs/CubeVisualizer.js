import * as THREE from 'three'
import * as Utility from '$lib/utility'

export default class CubeVisualizer {
    constructor(scene) {
        this.scene = scene;
        this.cube = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1, 1, 1, 24, 24, 24),
            new THREE.MeshPhongMaterial({color: 0xff0066})
        )
        this.cube.position.set(0,0,-2);
        this.scene.add(this.cube);
    }

    animate(timeDelta, dataArray) {
        this.cube.rotateY(timeDelta * dataArray[5] * 0.00001);
    }

}
