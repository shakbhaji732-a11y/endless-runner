// PART 1

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
60,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap.enabled=true;
document.body.appendChild(renderer.domElement);

camera.position.set(0,6,12);

const light=new THREE.DirectionalLight(0xffffff,1);
light.position.set(5,10,5);
light.castShadow=true;
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff,0.5));

const ground=new THREE.Mesh(
new THREE.BoxGeometry(20,1,300),
new THREE.MeshStandardMaterial({color:0x228B22})
);

ground.position.y=-1;
ground.position.z=-140;
ground.receiveShadow=true;
scene.add(ground);

const road=new THREE.Mesh(
new THREE.BoxGeometry(6,0.05,300),
new THREE.MeshStandardMaterial({color:0x444444})
);

road.position.y=-0.45;
road.position.z=-140;
scene.add(road);
// PART 2

const player = new THREE.Group();

const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.8,1.5,0.5),
    new THREE.MeshStandardMaterial({color:0x1565C0})
);
body.position.y=1.5;
player.add(body);

const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.35,32,32),
    new THREE.MeshStandardMaterial({color:0xffd7b5})
);
head.position.y=2.6;
player.add(head);

const leftLeg = new THREE.Mesh(
    new THREE.BoxGeometry(0.25,1,0.25),
    new THREE.MeshStandardMaterial({color:0x222222})
);
leftLeg.position.set(-0.18,0.5,0);
player.add(leftLeg);

const rightLeg = leftLeg.clone();
rightLeg.position.x=0.18;
player.add(rightLeg);

scene.add(player);

player.position.set(0,0,5);

let lane=0;
let targetX=0;

let velocityY=0;
let jumping=false;

const laneWidth=2;
