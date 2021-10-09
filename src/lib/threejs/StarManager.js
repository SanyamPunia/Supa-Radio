import * as THREE from 'three'
import * as Utility from '$lib/utility'

export default class StarManager {
    constructor(scene, maxStars) {
        this.maximumStars = maxStars
        this.stars = [];

        this.scene = scene;
        this.starHolder = new THREE.Object3D();
        this.starHolder.position.setY(25);
        this.colors = [0xff0055, 0xff0000, 0xff0022, 0x00aaff, 0xffffff]    
        this.addStars();
    }

    addStars() {
        for (let i = 0; i < this.maximumStars; i++) {
            const starRadius = Utility.randomBetween(0.01,0.25);
            const star = new THREE.Mesh(
                new THREE.SphereGeometry(starRadius, 24, 24),
                new THREE.MeshPhongMaterial({ color: Utility.getRandomElement(this.colors, this.colors.length) })
            )
            this.spawnStar(star);
            this.stars.push(star);
            this.starHolder.add(star);
        }
        this.scene.add(this.starHolder);
    }

    animate(timeDelta, dataArray) {
        let baseSpeed = 0.000001;
        let globalMoveSpeed = dataArray[20] * baseSpeed;
        let moveSpeed = baseSpeed + (baseSpeed * dataArray[7] + globalMoveSpeed);
        // this.stars.forEach((star, index) => {
        //     let x = star.position.x;
        //     let y = star.position.y; 
        //     let z = star.position.z;


        //     star.position.set(x, y, z + moveSpeed * timeDelta);

        //     if (star.position.z > 1) {
        //         this.spawnStar(star);
        //     }
        // });
        // this.starHolder.position.setZ(this.starHolder.position.z + moveSpeed * timeDelta);
        this.starHolder.rotateX(-moveSpeed * timeDelta);
        // this.starHolder.rotateOnWorldAxis(THREE.Vector3(1,0,0), moveSpeed * timeDelta);
        // this.starHolder.updateMatrixWorld();
    }

    spawnStar(star) {
        let x = Utility.randomBetween(-50, 50);
        let y = Utility.randomBetween(-50, 50);
        let z = Utility.randomBetween(-50, 50);
        star.position.set(x, y, z);
    }
}