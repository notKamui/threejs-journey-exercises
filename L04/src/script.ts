import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const cubes = new THREE.Group()

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xFF0000 }),
)
cubes.add(cube1)

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00FF00 }),
)
cube2.position.x = -2
cubes.add(cube2)

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000FF }),
)
cube3.position.x = 2
cubes.add(cube3)

cubes.position.y = 1
cubes.scale.y = 2
cubes.rotation.y = Math.PI / 4

scene.add(cubes)

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.lookAt(cubes.position)
scene.add(camera)

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
