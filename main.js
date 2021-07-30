import "./style.css"
import * as THREE from "three";
//esto nos permite orbitar con el mouse
//import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


//--------------------------------------------------------------------------------------------

//BASIC RENDER
// we need a scene, a camera, and a render

// the scene will contain all obj, cameras, and lights
const scene = new THREE.Scene()

// PerspectiveCamera() mimics what the human eye can see
//                                        fov       ,        aspect  ratio*  , 2 last parameters = view frustum*
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1.5, 1000)

// *aspect ratio: depends on the user´s window/browser/monitor/etc. can be calculated by dividing window inner height by inner width
//view frustum: to control which objets are visible relative to the camera. this specific parameters lets us view everythring from the camera itself


const renderer = new THREE.WebGLRenderer({
  // here we specify to the renderer which DOM element to use:
  canvas: document.querySelector("#bg")

})

//self explanatory
renderer.setPixelRatio(window.devicePixelRatio)

//make the canvas fullscreen:
renderer.setSize(window.innerWidth, window.innerHeight)

//set camera position:
//COMENTAR ESTO CUANDO TERMINE
/* camera.position.setZ(5.5); */

//call the renderer to draw on screen
renderer.render(scene, camera)

//--------------------------------------------------------------------------------------------

//GEOMETRY
// now, we get to the good stuff. we add an object. for that, we need:
// geometry and/or a set of vectors that define the object (three.js has a lot of predefined geometries)
const geometry = new THREE.SphereGeometry( 5 , 20, 10 );
// material: color, texture, etc. 
// MeshBasicMaterial() does not require light source
// MeshStandardMaterial() requires light source 
const material = new THREE.MeshBasicMaterial({ color: 0x000000 ,  wireframe: false    });
// mesh: geometry + material
const sphere = new THREE.Mesh(geometry, material)

const sphWireGeo = new THREE.SphereGeometry( 5.3 , 20, 10 )
const wireframe = new THREE.WireframeGeometry( sphWireGeo );
const sphLine = new THREE.LineSegments( wireframe );
sphLine.material.depthTest = true;
sphLine.material.transparent = 0;



const torusGeo = new THREE.TorusGeometry( 8, 0.5, 5, 20 );
const torusMat = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: false } );
const torus = new THREE.Mesh( torusGeo, torusMat );

const TrsWireGeo = new THREE.TorusGeometry( 8, 0.6, 5, 20 );
const torusWF = new THREE.WireframeGeometry( TrsWireGeo );
const torusLine = new THREE.LineSegments( torusWF );
torusLine.material.depthTest = true;
torusLine.material.transparent = false;

torusLine.rotation.x = 1.6
torusLine.rotation.y = 0.3
torus.rotation.x = 1.6
torus.rotation.y = 0.3

//we add the obj to the scene
scene.add(sphere, sphLine)
sphere.add(camera)

//--------------------------------------------------------------------------------------------

//LIGHTNING
/* //we can now add light
// pointLight() adds light in all directions like a lightbulb

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 0);

// AmbientLight() illuminates the whole scene
const ambientLight = new THREE.AmbientLight(0xffffff)

//we add the lightsource to the scene
scene.add(pointLight, ambientLight) */

//--------------------------------------------------------------------------------------------

//DEV TOOLS
// we can add some helpers that make our life easier:
/* const gridHelper = new THREE.GridHelper(200, 50)
scene.add(gridHelper) */
//this lets us orbit with our mouse
//const controls = new OrbitControls(camera, renderer.domElement)
//--------------------------------------------------------------------------------------------

//ANIMATION AND FINAL RENDERING
// to animate on scroll:
//DESCOMENTAR
let angle = 5
let radius = 10
function moveCamera()
{
 // to calculate where the user is scrolling to :
  const t = document.body.getBoundingClientRect().top;


  camera.position.z = t * -0.0018

  /* camera.position.x = radius * Math.cos( angle );  
  camera.position.z = radius * Math.sin( angle );
  angle += 0.01; */
  
}

document.body.onscroll = moveCamera;
moveCamera();


//now we rerender the scene. to avoid rerendering a scene constantly, we can use a recursive function that gives us an infinite loop:

function animate(){
// we tell the browser that we will perform an animation
  requestAnimationFrame(animate)

  //animation parameters:

  sphere.rotation.y += 0.001
  sphLine.rotation.y += 0.001




  /* controls.update() */

  renderer.render(scene, camera)
}
// now, the browser will always call the render method while animating (i think)

animate()

//--------------------------------------------------------------------------------------------


