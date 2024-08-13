import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'

const canvas = {
  size: {
    width: 800,
    height: 600,
  },
  el: document.querySelector('canvas#webgl') as HTMLCanvasElement,
} as const

const scene = new Scene()

const cube = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({ color: 0xFF0000 }))
scene.add(cube)

const camera = new PerspectiveCamera(75, canvas.size.width / canvas.size.height)
camera.position.z = 3
scene.add(camera)

const renderer = new WebGLRenderer({ canvas: canvas.el })
renderer.setSize(canvas.size.width, canvas.size.height)

renderer.render(scene, camera)
