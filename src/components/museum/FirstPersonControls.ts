import * as THREE from 'three';

export class FirstPersonControls {
  private camera: THREE.Camera;
  private domElement: HTMLElement;
  public isLocked: boolean = false;
  public isDoorOpen: boolean = false;
  
  private velocity = new THREE.Vector3();
  private direction = new THREE.Vector3();
  private moveForward = false;
  private moveBackward = false;
  private moveLeft = false;
  private moveRight = false;

  constructor(camera: THREE.Camera, domElement: HTMLElement) {
    this.camera = camera;
    this.domElement = domElement;
    this.camera.rotation.order = 'YXZ'; // Standard for FPS

    // Start the tour outside the museum, facing the entrance
    this.camera.position.set(0, 1.7, -25);
    this.camera.rotation.y = Math.PI; 

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW': this.moveForward = true; break;
        case 'ArrowLeft':
        case 'KeyA': this.moveLeft = true; break;
        case 'ArrowDown':
        case 'KeyS': this.moveBackward = true; break;
        case 'ArrowRight':
        case 'KeyD': this.moveRight = true; break;
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW': this.moveForward = false; break;
        case 'ArrowLeft':
        case 'KeyA': this.moveLeft = false; break;
        case 'ArrowDown':
        case 'KeyS': this.moveBackward = false; break;
        case 'ArrowRight':
        case 'KeyD': this.moveRight = false; break;
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    this.domElement.addEventListener('mousemove', (event) => {
      if (!this.isLocked) return;
      const movementX = event.movementX || 0;
      const movementY = event.movementY || 0;
      this.camera.rotation.y -= movementX * 0.002;
      this.camera.rotation.x -= movementY * 0.002;
      this.camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.camera.rotation.x));
    });
  }

  private checkCollision(pos: THREE.Vector3, radius: number = 0.5): boolean {
    const colliders = [
      // Front entrance door
      { x: 0, z: -10, width: 4, depth: 1.2, excludeIfDoorOpen: true },
      
      // Room 1 side walls
      { x: -10, z: 0, width: 1.2, depth: 20 },
      { x: 10, z: 0, width: 1.2, depth: 20 },
      
      // Hallway barriers
      { x: -2, z: 15, width: 1.2, depth: 10 },
      { x: 2, z: 15, width: 1.2, depth: 10 },
      
      // Room 2 barriers
      { x: -10, z: 30, width: 1.2, depth: 20 },
      { x: 10, z: 30, width: 1.2, depth: 20 },
      { x: 0, z: 40, width: 20, depth: 1.2 },
      
      // Room 3 barriers
      { x: -10, z: 50, width: 1.2, depth: 20 },
      { x: 10, z: 50, width: 1.2, depth: 20 },
      { x: 0, z: 60, width: 20, depth: 1.2 },
      
      // Hallway 3 barriers
      { x: -2, z: 55, width: 1.2, depth: 10 },
      { x: 2, z: 55, width: 1.2, depth: 10 },
      
      // Room 4 barriers
      { x: -10, z: 70, width: 1.2, depth: 20 },
      { x: 10, z: 70, width: 1.2, depth: 20 },
      { x: 0, z: 80, width: 20, depth: 1.2 },
      
      // Perimeter fences
      { x: -30, z: 5, width: 1.2, depth: 160 },
      { x: 30, z: 5, width: 1.2, depth: 160 },
      { x: 0, z: 60, width: 60, depth: 1.2 },
    ];

    for (const collider of colliders) {
      if (collider.excludeIfDoorOpen && this.isDoorOpen) continue;
      
      const dx = Math.abs(pos.x - collider.x);
      const dz = Math.abs(pos.z - collider.z);
      
      if (dx < collider.width / 2 + radius && dz < collider.depth / 2 + radius) {
        return true;
      }
    }
    
    return false;
  }

  public update(delta: number) {
    if (!this.isLocked) return;

    const friction = 6.0;
    const speed = 25.0;
    const playerRadius = 0.5;

    this.velocity.x -= this.velocity.x * friction * delta;
    this.velocity.z -= this.velocity.z * friction * delta;

    this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
    this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
    this.direction.normalize();

    if (this.moveForward || this.moveBackward) this.velocity.z -= this.direction.z * speed * delta;
    if (this.moveLeft || this.moveRight) this.velocity.x -= this.direction.x * speed * delta;

    const prevX = this.camera.position.x;
    const prevZ = this.camera.position.z;
    
    this.camera.translateX(-this.velocity.x * delta);
    this.camera.translateZ(this.velocity.z * delta);
    this.camera.position.y = 1.7;

    if (this.checkCollision(this.camera.position, playerRadius)) {
      this.camera.position.x = prevX;
      this.camera.position.z = prevZ;
    }

    this.camera.position.x = THREE.MathUtils.clamp(this.camera.position.x, -29, 29);
    this.camera.position.z = THREE.MathUtils.clamp(this.camera.position.z, -48, 58);
  }
}