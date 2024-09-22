import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Importar OrbitControls

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Piso
const floorGeometry = new THREE.PlaneGeometry(1000, 1000);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
scene.add(floor);

const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
const robot = new THREE.Group();

// Base
const baseGeometry = new THREE.CylinderGeometry(50, 50, 15, 32);
const base = new THREE.LineSegments(new THREE.WireframeGeometry(baseGeometry), material);
base.position.set(0, 9, 0); // Posicionar el cilindro
robot.add(base);

// Brazo
const brazo = new THREE.Group();

const ejeGeometry = new THREE.CylinderGeometry(20, 20, 18, 32);
const eje = new THREE.LineSegments(new THREE.WireframeGeometry(ejeGeometry), material);
eje.position.set(0, 21, 0); // Posicionar el cilindro
eje.rotation.z = Math.PI / 2;

const esparragoGeometry = new THREE.BoxGeometry(18, 120, 12);
const esparrago = new THREE.LineSegments(new THREE.WireframeGeometry(esparragoGeometry), material);
esparrago.position.set(0, 81, 0); // Posicionar el cilindro
esparrago.rotation.y = Math.PI / 2;

const rotulaGeometry = new THREE.SphereGeometry(20, 20, 20);
const rotula = new THREE.LineSegments(new THREE.WireframeGeometry(rotulaGeometry), material);
rotula.position.set(0, 140, 0); // Posicionar el cilindro

brazo.add(eje);
brazo.add(esparrago);
brazo.add(rotula);

// Antebrazo
const antebrazo = new THREE.Group();

const discoGeometry = new THREE.CylinderGeometry(22, 22, 6, 32);
const disco = new THREE.LineSegments(new THREE.WireframeGeometry(discoGeometry), material);
disco.position.set(0, 140, 0); // Posicionar el cilindro

const nerviosGeometry = new THREE.BoxGeometry(4, 80, 4);
const nervio1 = new THREE.LineSegments(new THREE.WireframeGeometry(nerviosGeometry), material);
nervio1.position.set(8, 180, 8); // Posicionar el cilindro
const nervio2 = new THREE.LineSegments(new THREE.WireframeGeometry(nerviosGeometry), material);
nervio2.position.set(-8, 180, 8); // Posicionar el cilindro
const nervio3 = new THREE.LineSegments(new THREE.WireframeGeometry(nerviosGeometry), material);
nervio3.position.set(8, 180, -8); // Posicionar el cilindro
const nervio4 = new THREE.LineSegments(new THREE.WireframeGeometry(nerviosGeometry), material);
nervio4.position.set(-8, 180, -8); // Posicionar el cilindro

const grupoMano = new THREE.Group();
const manoGeometry = new THREE.CylinderGeometry(15, 15, 40, 32);
const mano = new THREE.LineSegments(new THREE.WireframeGeometry(manoGeometry), material);
mano.position.set(0, 220, 0);
mano.rotation.z = Math.PI / 2;
grupoMano.add(mano);

const pinzaIzqSquareGeometry = new THREE.BoxGeometry(19, 20, 4);
const pinzaIzqSquare = new THREE.LineSegments(new THREE.WireframeGeometry(pinzaIzqSquareGeometry), material);
pinzaIzqSquare.position.set(10, 220, 10);
pinzaIzqSquare.rotation.y = Math.PI / 2;

const pinzaParallelipipedIzqGeometry = new THREE.BufferGeometry();
const verticesPinzaIzq = new Float32Array([
  // Lateral 1
  19, 20, 0, // Vértice 0
  0, 16, -2, // Vértice 1
  0, 4, -2, // Vértice 2
  19, 0, 0, // Vértice 3

  // Lateral 2
  19, 20, -4, // Vértice 4
  19, 0, -4, // Vértice 5
  0, 4, -4, // Vértice 6
  0, 16, -4, // Vértice 7

  // Techo
  19, 20, -4, // Vértice 8
  0, 16, -4, // Vértice 9
  0, 16, -2, // Vértice 10
  19, 20, 0, // Vértice 11

  // Base
  19, 0, 0, // Vértice 12
  0, 4, -2, // Vértice 13
  0, 4, -4, // Vértice 14
  19, 0, -4, // Vértice 15

  // Atrás
  19, 20, 0, // Vértice 16
  19, 0, 0, // Vértice 17
  19, 0, -4, // Vértice 18
  19, 20, -4, // Vértice 19

  // Frente
  0, 16, -2, // Vértice 20
  0, 16, -4, // Vértice 21
  0, 4, -4, // Vértice 22
  0, 4, -2, // Vértice 23
]);

pinzaParallelipipedIzqGeometry.setAttribute('position', new THREE.BufferAttribute(verticesPinzaIzq, 3));

const indicesPinzaIzq = new Uint32Array([
  // Lateral 1
  0, 1, 3,
  1, 2, 3,

  // Lateral 2
  4, 5, 7,
  5, 6, 7,

  // Techo
  8, 9, 10,
  8, 10, 11,

  // Base
  12, 13, 15,
  13, 14, 15,

  // Atrás
  16, 17, 19,
  17, 18, 19,

  // Frente
  20, 21, 23,
  21, 22, 23,
])

pinzaParallelipipedIzqGeometry.setIndex(new THREE.BufferAttribute(indicesPinzaIzq, 1));


const pinzaParallelipipedIzq = new THREE.LineSegments(new THREE.WireframeGeometry(pinzaParallelipipedIzqGeometry), material);
pinzaParallelipipedIzq.position.set(12, 210, 38.5); // Posicionar el triángulo
pinzaParallelipipedIzq.rotation.y = Math.PI / 2;

grupoMano.add(pinzaIzqSquare);
grupoMano.add(pinzaParallelipipedIzq);

const pinzaDerSquareGeometry = new THREE.BoxGeometry(19, 20, 4);
const pinzaDerSquare = new THREE.LineSegments(new THREE.WireframeGeometry(pinzaDerSquareGeometry), material);
pinzaDerSquare.position.set(-10, 220, 10);
pinzaDerSquare.rotation.y = Math.PI / 2;

const pinzaParallelipipedDer = pinzaParallelipipedIzq.clone();
pinzaParallelipipedDer.rotation.y = -Math.PI / 2;
pinzaParallelipipedDer.rotation.x = -Math.PI;

pinzaParallelipipedDer.position.set(-12, 230, 38.5);

grupoMano.add(pinzaDerSquare);
grupoMano.add(pinzaParallelipipedDer);

antebrazo.add(disco);
antebrazo.add(nervio1);
antebrazo.add(nervio2);
antebrazo.add(nervio3);
antebrazo.add(nervio4);
antebrazo.add(grupoMano);

robot.add(brazo);
robot.add(antebrazo);
scene.add(robot);

camera.position.set(0, 400, 280);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();