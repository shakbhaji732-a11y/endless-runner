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
// PART 3

window.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowLeft" || e.key==="a"){
        lane=Math.max(-1,lane-1);
    }

    if(e.key==="ArrowRight" || e.key==="d"){
        lane=Math.min(1,lane+1);
    }

    if((e.key==="ArrowUp" || e.key===" " || e.key==="w") && !jumping){
        velocityY=0.22;
        jumping=true;
    }

});

window.addEventListener("touchstart",(e)=>{

    const x=e.touches[0].clientX;
    const y=e.touches[0].clientY;

    if(y<window.innerHeight*0.4 && !jumping){
        velocityY=0.22;
        jumping=true;
        return;
    }

    if(x<window.innerWidth/3){
        lane=Math.max(-1,lane-1);
    }
    else if(x>window.innerWidth*2/3){
        lane=Math.min(1,lane+1);
    }

});

function updatePlayer(){

    targetX=lane*laneWidth;

    player.position.x += (targetX-player.position.x)*0.2;

    velocityY-=0.012;
    player.position.y+=velocityY;

    if(player.position.y<=0){
        player.position.y=0;
        velocityY=0;
        jumping=false;
    }

}
// PART 4

const obstacles=[];

function createObstacle(){

    const box=new THREE.Mesh(
        new THREE.BoxGeometry(1,2,1),
        new THREE.MeshStandardMaterial({color:0xff0000})
    );

    const lane=Math.floor(Math.random()*3)-1;

    box.position.set(lane*laneWidth,0,-100);

    box.castShadow=true;

    scene.add(box);

    obstacles.push(box);

}

setInterval(createObstacle,1000);

let score=0;

function animate(){

    requestAnimationFrame(animate);

    updatePlayer();

    for(let i=obstacles.length-1;i>=0;i--){

        obstacles[i].position.z+=0.6;

        if(obstacles[i].position.z>10){

            scene.remove(obstacles[i]);
            obstacles.splice(i,1);

            score++;

            document.getElementById("score").innerHTML="Score : "+score;

            continue;
        }

        if(
            Math.abs(obstacles[i].position.z-player.position.z)<1 &&
            Math.abs(obstacles[i].position.x-player.position.x)<0.8 &&
            player.position.y<1.5
        ){

            alert("Game Over\nScore : "+score);

            location.reload();

        }

    }

    renderer.render(scene,camera);

}

animate();

window.addEventListener("resize",()=>{

    camera.aspect=window.innerWidth/window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth,window.innerHeight);

});
