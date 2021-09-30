import * as THREE from 'three'
import * as Utility from '$lib/utility'

export default class StarManager {
    constructor(scene, maxStars) {
        this.maxStars = maxStars;
        this.stars = [];

        this.scene = scene;

        this.colors = [0xff0066, 0x660066, 0xaa0066, 0xffffff]
        this.addStars();
    }

    addStars() {
        for (let i = 0; i < this.maxStars; i++) {
            const star = new THREE.Mesh(
                new THREE.SphereBufferGeometry(Utility.randomBetween(0.01,0.25), 24, 24),
                new THREE.MeshPhongMaterial({ emissive:0xffffff, emissiveIntensity: 0.2, color: Utility.getRandomElement(this.colors, this.colors.length) })
            )
            this.spawnStar(star);
            this.stars.push(star);
            this.scene.add(star);
        }
    }

    moveStars(timeDelta, dataArray) {
        let globalMoveSpeed = dataArray[20] * 0.0001;
        this.stars.forEach((star, index) => {
            let x = star.position.x;
            let y = star.position.y; 
            let z = star.position.z;

            let moveSpeed = 0.00001 * dataArray[7] + globalMoveSpeed;

            star.position.set(x, y, z + moveSpeed * timeDelta);

            if (star.position.z > 1) {
                this.spawnStar(star);
            }
        });
    }

    spawnStar(star) {
        let x = Utility.randomBetween(-50, 50);
        let y = Utility.randomBetween(-50, 50);
        let z = Utility.randomBetween(-25, -50);
        star.position.set(x, y, z);
    }
}