import gsap from 'gsap'
import * as THREE from 'three'
import { Timer } from 'three/addons/misc/Timer.js'

// Canvas
const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xFF0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
  width: 800,
  height: 600,
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)

function animate(tick: (context: { delta: number, elapsedTime: number }) => boolean | void) {
  const timer = new Timer()
  function loop(now: number) {
    timer.update(now)
    const shouldContinue = tick({ delta: timer.getDelta(), elapsedTime: timer.getElapsed() })
    if (shouldContinue !== false) requestAnimationFrame(loop)
  }
  loop(0)
}

// Animation

gsap.to(mesh.position, { x: 2, duration: 1, delay: 1 })
gsap.to(mesh.position, { x: 0, duration: 1, delay: 2 })
animate(() => {
  // mesh.rotation.y += 2 * Math.PI * delta
  // mesh.rotation.x += 2 * Math.PI * delta
  // mesh.position.y = Math.sin(elapsedTime)
  // mesh.position.x = Math.cos(elapsedTime)

  // camera.position.y = Math.sin(elapsedTime)
  // camera.position.x = Math.cos(elapsedTime)
  // camera.lookAt(mesh.position)

  renderer.render(scene, camera)
})
