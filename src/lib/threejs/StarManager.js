import * as THREE from 'three'
import * as Utility from '$lib/utility'

export default class StarManager {
    constructor(scene, maxStars) {
        this.maximumStars = maxStars
        this.stars = [];

        this.scene = scene;

        this.colors = [0xff0055, 0xff0000, 0xff0022, 0x00aaff, 0xffffff]    
        this.addStars();
    }

    addStars() {
        for (let i = 0; i < this.maximumStars; i++) {
            const starRadius = Utility.randomBetween(0.01,0.25);
            const star = new THREE.Mesh(
                new THREE.SphereGeometry(starRadius, 24, 24),
                new THREE.MeshPhongMaterial({ emissive:0xffffff, emissiveIntensity: 0.2, color: Utility.getRandomElement(this.colors, this.colors.length) })
            )
            this.spawnStar(star);
            this.stars.push(star);
            this.scene.add(star);
        }
    }

    moveStars(timeDelta, dataArray) {
        let baseSpeed = 0.001;
        let globalMoveSpeed = dataArray[20] * 0.0001;
        this.stars.forEach((star, index) => {
            let x = star.position.x;
            let y = star.position.y; 
            let z = star.position.z;

            let moveSpeed = baseSpeed + (0.00001 * dataArray[7] + globalMoveSpeed);

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