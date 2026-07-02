// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 5, 10);

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Sun Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
light.castShadow = true;
scene.add(light);

// Ambient Light
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// Ground
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 200),
    new THREE.MeshStandardMaterial({
        color: 0x444444
    })
);

ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Player (Temporary Cube)
const player = new THREE.Mesh(
    new THREE.BoxGeometry(1, 2, 1),
    new THREE.MeshStandardMaterial({
        color: 0xff0000
    })
);

player.position.y = 1;
let lane = 0;

const lanes = [-2, 0, 2];

let speed = 0.25;
player.castShadow = true;
scene.add(player);

// Resize
window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

});

// Animation
function animate() {

    requestAnimationFrame(animate);

    renderer.render(scene, camera);

}

animate();
