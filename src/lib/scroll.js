export default class Scroller {
  constructor(options = this._defaultOptions) {
    this.options = {...this._defaultOptions, ...options}
    this.velocity = {
      x: 0,
      y: 0
    }
    this.scroll = {
      x: 0,
      y: 0,
    }
    this.frameId = null
    this.animating = false
    this.attachEvents()
  }

  get _defaultOptions() {
    return {
      el: document,
      frictionCoef: .95,
      multiplier: 1,
      direction: 'vertical',
    }
  }

  attachEvents() {
    this.options.el.addEventListener('wheel', this.onWheel.bind(this))
  }

  incrementVelocity(deltaX, deltaY) {
    switch(this.options.direction) {
      case 'horizontal':
        this.velocity.x = deltaX * this.options.multiplier
        break
      case 'vertical':
        this.velocity.y = (deltaY * this.options.multiplier)
        break
      case 'both':
        this.velocity.x = (deltaX * this.options.multiplier)
        this.velocity.y = (deltaY * this.options.multiplier)
        break
      default:
        throw new Error('check direction')
    }
  }

  onWheel({deltaY, deltaX}) {
    this.incrementVelocity(deltaX, deltaY)
    if(!this.animating) {
      this.animating = true
      this.frameId = window.requestAnimationFrame(this.animate.bind(this))
    }
  }
  applyScroll() {
    this.scroll.x += this.velocity.x
    this.scroll.y += this.velocity.y

    this.velocity.x *= this.options.frictionCoef
    this.velocity.y *= this.options.frictionCoef
  }

  animate() {
    if(Math.abs(this.velocity.x) <= 0.000005 && Math.abs(this.velocity.y) <= 0.000005) {
      console.log("scroll done")
      window.cancelAnimationFrame(this.frameId)
      this.animating = false
    } else {
      this.applyScroll()
      this.frameId = window.requestAnimationFrame(this.animate.bind(this))
    }

  }

  getScroll() {
    return this.scroll
  }
}