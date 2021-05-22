import * as THREE from './lib/three.module.js'
import {dimensions} from './utils/window.js'
import Scroller from './lib/scroll.js'

const getCanvas = () =>
  document.querySelector('canvas#webgl')

const createCamera = () => new THREE.PerspectiveCamera(
  75,
  dimensions().ratio,
  0.1,
  1000
)

const createRenderer = () => {
  const r = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: getCanvas()
  })
  const d = dimensions()
  r.setSize(d.width, d.height)
  return r
}

const createLight = (type = "PointLight", options = {}, {x, y, z} = {x: 0, y: 0, z: 0}) => {
  const l = new THREE[type]({
    color: new THREE.Color('0xFFFFFF'),
    ...options
  })
  l.position.set(x, y, z)
  return l
}

const createObj = ({color = 0xFFFFFF, pos = {
  x: 0,
  y: 0,
  z: -10
}}) => {
  console.log(color, pos)
  const geo = new THREE.SphereBufferGeometry(1, 64, 64)
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color)
  })
  const m = new THREE.Mesh(geo, mat)
  m.position.set(pos.x, pos.y, pos.z )
  return m
}

const initGL = () => {
  const scene = new THREE.Scene()
  const camera = createCamera()
  const renderer = createRenderer()
  return {
    scene, camera, renderer
  }
}

const attachResize = (renderer, camera) => {
  const onResize = () => {
    const {width, height, ratio} = dimensions()
    renderer.setSize(width, height)
    camera.aspect = ratio
    camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', onResize)

}

const main = () => {
  const scroller = new Scroller({
    multiplier: .005,
    direction: 'vertical'
  })
  const {renderer, scene, camera} = initGL()
  attachResize(renderer, camera)

  const o = createObj({
    color: 0x0000FF,
    pos: {x: -2.5, y: 0, z: -12}
  })
  const o2 = createObj({
    color: 0xFF0000,
    pos: {x: 2.5, y: -5, z: -10}
  })
  const l = createLight()
  scene.add(o)
  scene.add(o2)
  scene.add(l)
  // l.lookAt(o)

  const animate = () => {
    renderer.render(scene, camera)
    const {x, y} = scroller.getScroll()
    o.position.y = y
    o.position.x = x

    o2.position.y = y * .5
    o2.position.x = x * .5
    window.requestAnimationFrame(animate)
  }

  animate()

}

main()