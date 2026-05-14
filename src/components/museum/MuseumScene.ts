/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as THREE from 'three';
import { ARTWORKS, MUSEUM_CONFIG } from '../../constants';
import { ArtworkData } from '../../types';

export class MuseumScene {
  private scene: THREE.Scene;
  private textureLoader: THREE.TextureLoader;
  private artworkMeshes: THREE.Group[] = [];
  private doorGroup: THREE.Group | null = null;
  private doorOpenStatus = false;
  
  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.textureLoader = new THREE.TextureLoader();
    this.init();
  }

  private init() {
    this.createEnvironment();
    this.createArchitecture();
    this.createArtworks();
    this.createLighting();
    this.createSculpture();
    this.createDoor();
    this.createFamousArtworks();
    this.createArchitectureExhibits();
  }

  private createEnvironment() {
    // Sky
    const skyGeo = new THREE.SphereGeometry(100, 32, 32);
    const skyMat = new THREE.MeshBasicMaterial({ 
      color: '#87ceeb', // Sky blue
      side: THREE.BackSide
    });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    this.scene.add(sky);

    // Fog for depth
    this.scene.fog = new THREE.FogExp2('#87ceeb', 0.01);

    // Ground outside (Grass)
    const groundGeo = new THREE.PlaneGeometry(120, 200);
    const groundMat = new THREE.MeshStandardMaterial({ 
      color: '#2d5a27', 
      roughness: 0.8,
      metalness: 0.0
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, -0.01, 40); // Centered to cover entire museum surroundings
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Compound Path (Stone/Gravel)
    const pathGeo = new THREE.PlaneGeometry(6, 80);
    const pathMat = new THREE.MeshStandardMaterial({ 
      color: '#555555', 
      roughness: 0.9,
      metalness: 0.0
    });
    const path = new THREE.Mesh(pathGeo, pathMat);
    path.rotation.x = -Math.PI / 2;
    path.position.set(0, 0, 0); 
    path.receiveShadow = true;
    this.scene.add(path);

    // Fence / Wall for Compound
    const createFence = (width: number, height: number, x: number, z: number, rotationY: number) => {
      const group = new THREE.Group();
      const fenceThickness = 0.6;
      
      // Main wall/fence body
      const bodyGeo = new THREE.BoxGeometry(width, height, fenceThickness);
      const bodyMat = new THREE.MeshStandardMaterial({ color: '#1a1a1a', roughness: 0.7 });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = height / 2;
      group.add(body);

      // Top rail
      const railGeo = new THREE.BoxGeometry(width + 0.1, 0.15, fenceThickness + 0.2);
      const railMat = new THREE.MeshStandardMaterial({ color: '#333333' });
      const rail = new THREE.Mesh(railGeo, railMat);
      rail.position.y = height;
      group.add(rail);

      group.position.set(x, 0, z);
      group.rotation.y = rotationY;
      this.scene.add(group);
    };

    // Perimeter Walls (Compound) - Wrap around the whole museum
    const COMP_W = 60;
    const COMP_D = 160;
    const COMP_Z_START = -20;
    const COMP_HEIGHT = 2;

    // Front walls with Gate opening
    createFence(25, COMP_HEIGHT, -17.5, -50, 0);
    createFence(25, COMP_HEIGHT, 17.5, -50, 0);

    // Left wall
    createFence(COMP_D, COMP_HEIGHT, -30, 5, Math.PI / 2);
    // Right wall
    createFence(COMP_D, COMP_HEIGHT, 30, 5, -Math.PI / 2);

    // Back wall (behind the museum)
    createFence(60, COMP_HEIGHT, 0, 60, 0);

    // Add some trees
    const createTree = (x: number, z: number) => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(x, 0, z);

      // Trunk
      const trunkGeo = new THREE.CylinderGeometry(0.2, 0.3, 2, 8);
      const trunkMat = new THREE.MeshStandardMaterial({ color: '#4b3621' });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 1;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      // Leaves
      const leavesGeo = new THREE.ConeGeometry(1.5, 3, 8);
      const leavesMat = new THREE.MeshStandardMaterial({ color: '#1a4a1a' });
      const leaves = new THREE.Mesh(leavesGeo, leavesMat);
      leaves.position.y = 3;
      leaves.castShadow = true;
      treeGroup.add(leaves);

      // Smaller cone on top
      const leavesTop = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 8), leavesMat);
      leavesTop.position.y = 4.5;
      leavesTop.castShadow = true;
      treeGroup.add(leavesTop);

      this.scene.add(treeGroup);
    };

    // Place trees inside the compound
    for (let i = 0; i < 35; i++) {
        const x = (Math.random() - 0.5) * 55;
        const z = (Math.random() - 0.5) * 100 - 5; // Scatter across the whole range
        
        // Don't place on the path or inside the museum footprint
        const isNearPath = Math.abs(x) < 4 && z < -10;
        const isInsideMuseum = Math.abs(x) < 12 && z > -12 && z < 42;
        
        if (!isNearPath && !isInsideMuseum) {
            createTree(x, z);
        }
    }

    // Add some outdoor path lights
    const createPathLight = (x: number, z: number) => {
      const group = new THREE.Group();
      
      const poleGeo = new THREE.CylinderGeometry(0.05, 0.05, 1, 8);
      const poleMat = new THREE.MeshStandardMaterial({ color: '#222222' });
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.y = 0.5;
      group.add(pole);

      const lightGeo = new THREE.SphereGeometry(0.1, 8, 8);
      const lightMat = new THREE.MeshBasicMaterial({ color: '#fffacd' });
      const lightMesh = new THREE.Mesh(lightGeo, lightMat);
      lightMesh.position.y = 1.1;
      group.add(lightMesh);

      const light = new THREE.PointLight('#fffacd', 0.5, 5);
      light.position.y = 1.1;
      group.add(light);

      group.position.set(x, 0, z);
      this.scene.add(group);
    };

    for (let z = -15; z > -50; z -= 10) {
      createPathLight(-3.5, z);
      createPathLight(3.5, z);
    }
  }

  private createArchitecture() {
    const { WALL_HEIGHT, FLOOR_COLOR, WALL_COLOR, CEILING_COLOR } = MUSEUM_CONFIG;

    // Advanced Materials
    const floorMat = new THREE.MeshStandardMaterial({ 
      color: FLOOR_COLOR, 
      roughness: 0.15, // Shiny polished stone
      metalness: 0.1,
      envMapIntensity: 1
    });

    const createWallMat = (color: string) => new THREE.MeshStandardMaterial({ 
      color: color,
      roughness: 0.95, // Extremely matte gallery paint
      metalness: 0.0,
      side: THREE.DoubleSide
    });

    const defaultWallMat = createWallMat('#f5f5dc'); // Warm cream, like aged parchment
    const room2WallMat = createWallMat('#ede0d4'); // Soft peach
    const hallwayWallMat = createWallMat('#e6ccb2'); // Warm beige
    const room3WallMat = createWallMat('#d4c4a8'); // Antique gold
    const room4WallMat = createWallMat('#c4b7a6'); // Muted taupe

    // Room 1 Floor
    const floor1Geo = new THREE.PlaneGeometry(20, 20);
    const floor1 = new THREE.Mesh(floor1Geo, floorMat);
    floor1.rotation.x = -Math.PI / 2;
    floor1.receiveShadow = true;
    this.scene.add(floor1);

    // Hallway Floor (The "Middle Way")
    const hallwayFloorGeo = new THREE.PlaneGeometry(4, 10);
    const hallwayFloor = new THREE.Mesh(hallwayFloorGeo, floorMat);
    hallwayFloor.rotation.x = -Math.PI / 2;
    hallwayFloor.position.z = 15;
    hallwayFloor.receiveShadow = true;
    this.scene.add(hallwayFloor);

    // Room 2 Floor
    const floor2Geo = new THREE.PlaneGeometry(20, 20);
    const floor2 = new THREE.Mesh(floor2Geo, floorMat);
    floor2.rotation.x = -Math.PI / 2;
    floor2.position.z = 30;
    floor2.receiveShadow = true;
    this.scene.add(floor2);

    // Room 3 Floor
    const floor3Geo = new THREE.PlaneGeometry(20, 20);
    const floor3 = new THREE.Mesh(floor3Geo, floorMat);
    floor3.rotation.x = -Math.PI / 2;
    floor3.position.z = 50;
    floor3.receiveShadow = true;
    this.scene.add(floor3);

    // Room 4 Floor
    const floor4Geo = new THREE.PlaneGeometry(20, 20);
    const floor4 = new THREE.Mesh(floor4Geo, floorMat);
    floor4.rotation.x = -Math.PI / 2;
    floor4.position.z = 70;
    floor4.receiveShadow = true;
    this.scene.add(floor4);

    // Ceiling
    const ceilingMat = new THREE.MeshStandardMaterial({ 
      color: CEILING_COLOR, 
      roughness: 1,
      metalness: 0 
    });
    
    const ceiling1 = new THREE.Mesh(floor1Geo, ceilingMat);
    ceiling1.rotation.x = Math.PI / 2;
    ceiling1.position.y = WALL_HEIGHT;
    this.scene.add(ceiling1);

    const ceilingHall = new THREE.Mesh(hallwayFloorGeo, ceilingMat);
    ceilingHall.rotation.x = Math.PI / 2;
    ceilingHall.position.set(0, WALL_HEIGHT, 15);
    this.scene.add(ceilingHall);

    const ceiling2 = new THREE.Mesh(floor2Geo, ceilingMat);
    ceiling2.rotation.x = Math.PI / 2;
    ceiling2.position.set(0, WALL_HEIGHT, 30);
    this.scene.add(ceiling2);

    const ceiling3 = new THREE.Mesh(floor3Geo, ceilingMat);
    ceiling3.rotation.x = Math.PI / 2;
    ceiling3.position.set(0, WALL_HEIGHT, 50);
    this.scene.add(ceiling3);

    const ceiling4 = new THREE.Mesh(floor4Geo, ceilingMat);
    ceiling4.rotation.x = Math.PI / 2;
    ceiling4.position.set(0, WALL_HEIGHT, 70);
    this.scene.add(ceiling4);

    // Walls
    const createWall = (width: number, height: number, x: number, y: number, z: number, rotationY: number, material: THREE.MeshStandardMaterial = defaultWallMat) => {
      const wallThickness = 0.8; // Substantial thickness for solid architectural feel
      const wallGeo = new THREE.BoxGeometry(width, height, wallThickness);
      const wall = new THREE.Mesh(wallGeo, material);
      wall.position.set(x, y, z);
      wall.rotation.y = rotationY;
      wall.castShadow = true;
      wall.receiveShadow = true;
      this.scene.add(wall);
    };

    // Assuming the door height remains 4 units (from createDoor method)
    const DOOR_HEIGHT = 4; // Height of the doorway opening
    const HEADER_WALL_HEIGHT = WALL_HEIGHT - DOOR_HEIGHT; // Height of the wall section above the door
    const HEADER_WALL_Y_POS = DOOR_HEIGHT + (HEADER_WALL_HEIGHT / 2); // Center Y position for the header wall

    // Room 1 Walls (Warm Cream)
    createWall(8, WALL_HEIGHT, -6, WALL_HEIGHT / 2, -10, 0); // Front Left
    createWall(8, WALL_HEIGHT, 6, WALL_HEIGHT / 2, -10, 0); // Front Right
    // Header above the main entrance door
    createWall(4, HEADER_WALL_HEIGHT, 0, HEADER_WALL_Y_POS, -10, 0);

    createWall(8, WALL_HEIGHT, -6, WALL_HEIGHT / 2, 10, Math.PI); // Connection Left
    createWall(8, WALL_HEIGHT, 6, WALL_HEIGHT / 2, 10, Math.PI); // Connection Right
    // Header above the opening to the hallway
    createWall(4, HEADER_WALL_HEIGHT, 0, HEADER_WALL_Y_POS, 10, Math.PI);
    
    createWall(20, WALL_HEIGHT, -10, WALL_HEIGHT / 2, 0, Math.PI / 2);
    createWall(20, WALL_HEIGHT, 10, WALL_HEIGHT / 2, 0, -Math.PI / 2);

    // Hallway Walls (Warm Beige)
    // These are full walls forming the hallway, no headers needed here based on current layout
    createWall(10, WALL_HEIGHT, -2, WALL_HEIGHT / 2, 15, Math.PI / 2, hallwayWallMat); 
    createWall(10, WALL_HEIGHT, 2, WALL_HEIGHT / 2, 15, -Math.PI / 2, hallwayWallMat); 

    // Room 2 Walls (Soft Peach)
    createWall(8, WALL_HEIGHT, -6, WALL_HEIGHT / 2, 20, 0, room2WallMat); 
    createWall(8, WALL_HEIGHT, 6, WALL_HEIGHT / 2, 20, 0, room2WallMat); 
    // Header above Room 2 entrance
    createWall(4, HEADER_WALL_HEIGHT, 0, HEADER_WALL_Y_POS, 20, 0, room2WallMat); 
    
    // Back wall in Room 2 (Maybe a slightly darker accent wall?)
    const accentMat = createWallMat('#d4c4a8'); // Antique gold for accent
    createWall(20, WALL_HEIGHT, 0, WALL_HEIGHT / 2, 40, Math.PI, accentMat);
    // Full side walls for Room 2

    createWall(20, WALL_HEIGHT, -10, WALL_HEIGHT / 2, 30, Math.PI / 2, room2WallMat); 
    createWall(20, WALL_HEIGHT, 10, WALL_HEIGHT / 2, 30, -Math.PI / 2, room2WallMat); 

    // Room 3 Walls (Antique Gold)
    createWall(8, WALL_HEIGHT, -6, WALL_HEIGHT / 2, 40, 0, room3WallMat); 
    createWall(8, WALL_HEIGHT, 6, WALL_HEIGHT / 2, 40, 0, room3WallMat);
    // Header above Room 3 entrance
    createWall(4, HEADER_WALL_HEIGHT, 0, HEADER_WALL_Y_POS, 40, 0, room3WallMat);
    
    createWall(20, WALL_HEIGHT, 0, WALL_HEIGHT / 2, 60, Math.PI, room3WallMat);
    createWall(20, WALL_HEIGHT, -10, WALL_HEIGHT / 2, 50, Math.PI / 2, room3WallMat); 
    createWall(20, WALL_HEIGHT, 10, WALL_HEIGHT / 2, 50, -Math.PI / 2, room3WallMat); 

    // Hallway walls, no headers needed here
    // Hallway 3 Walls
    createWall(10, WALL_HEIGHT, -2, WALL_HEIGHT / 2, 55, Math.PI / 2, hallwayWallMat);
    createWall(10, WALL_HEIGHT, 2, WALL_HEIGHT / 2, 55, -Math.PI / 2, hallwayWallMat);

    // Room 4 Walls (Muted Taupe)
    createWall(8, WALL_HEIGHT, -6, WALL_HEIGHT / 2, 60, 0, room4WallMat); 
    createWall(8, WALL_HEIGHT, 6, WALL_HEIGHT / 2, 60, 0, room4WallMat); 
    // Header above Room 4 entrance
    createWall(4, HEADER_WALL_HEIGHT, 0, HEADER_WALL_Y_POS, 60, 0, room4WallMat); 
    
    createWall(20, WALL_HEIGHT, 0, WALL_HEIGHT / 2, 80, Math.PI, room4WallMat);
    createWall(20, WALL_HEIGHT, -10, WALL_HEIGHT / 2, 70, Math.PI / 2, room4WallMat); 
    createWall(20, WALL_HEIGHT, 10, WALL_HEIGHT / 2, 70, -Math.PI / 2, room4WallMat); 
  }

  private createDoor() {
    this.doorGroup = new THREE.Group();
    this.doorGroup.position.set(2, 0, -10); 
    
    const doorGeo = new THREE.BoxGeometry(4, 4, 0.2);
    const doorMat = new THREE.MeshStandardMaterial({ 
      color: '#8d6e63', 
      roughness: 0.6,
      metalness: 0.0
    });
    const doorMesh = new THREE.Mesh(doorGeo, doorMat);
    doorMesh.position.set(-2, 2, 0); 
    doorMesh.userData.isDoor = true;
    
    // Door Detail (Trim)
    const trimGeo = new THREE.BoxGeometry(3.6, 3.6, 0.05);
    const trimMat = new THREE.MeshStandardMaterial({ color: '#5d4037', roughness: 0.8 });
    const trim = new THREE.Mesh(trimGeo, trimMat);
    trim.position.z = 0.11;
    doorMesh.add(trim);
    
    // Handle (Interaction Button) - White sphere on the left side
    const handleGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const handleMat = new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: '#ffffff', emissiveIntensity: 0.2 });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    // Relative to doorMesh (which is centered at -2), left is at -1.8
    handle.position.set(-1.8, 0, 0.15); 
    doorMesh.add(handle);

    this.doorGroup.add(doorMesh);
    this.scene.add(this.doorGroup);
  }

  private createFamousArtworks() {
    const FAMOUS_WORKS: ArtworkData[] = [
      {
        id: 'mona-lisa',
        title: 'Mona Lisa',
        artist: 'Leonardo da Vinci',
        year: '1503',
        description: 'The most famous portrait in the world.',
        url: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800',
        position: [-9.55, 2.5, -4],
        rotation: [0, Math.PI / 2, 0]
      },
      {
        id: 'starry-night',
        title: 'The Starry Night',
        artist: 'Vincent van Gogh',
        year: '1889',
        description: 'A masterpiece of Post-Impressionism.',
        url: 'https://images.unsplash.com/photo-1541119638723-c51cbe2262aa?auto=format&fit=crop&q=80&w=800',
        position: [9.55, 2.5, -4],
        rotation: [0, -Math.PI / 2, 0]
      },
      {
        id: 'the-scream',
        title: 'The Scream',
        artist: 'Edvard Munch',
        year: '1893',
        description: 'An iconic expression of human anxiety.',
        url: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&q=80&w=800',
        position: [-9.55, 2.5, 4],
        rotation: [0, Math.PI / 2, 0]
      },
      {
        id: 'pearl-earring',
        title: 'Girl with a Pearl Earring',
        artist: 'Johannes Vermeer',
        year: '1665',
        description: 'Often referred to as the "Mona Lisa of the North".',
        url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800',
        position: [9.55, 2.5, 4],
        rotation: [0, -Math.PI / 2, 0]
      }
    ];

    this.addArtworksToScene(FAMOUS_WORKS);
  }

  private createArchitectureExhibits() {
    const pedestalMat = new THREE.MeshStandardMaterial({ color: '#444444', roughness: 0.8 });
    const modelMat = new THREE.MeshStandardMaterial({ color: '#e0e0e0', metalness: 0.5, roughness: 0.2 });

    const createExhibit = (x: number, z: number, name: string, description: string, builder: (group: THREE.Group) => void) => {
      const group = new THREE.Group();
      group.position.set(x, 0, z);
      group.userData = { id: name.toLowerCase().replace(' ', '-'), title: name, description };

      // Pedestal
      const pedestal = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1, 1.2), pedestalMat);
      pedestal.position.y = 0.5;
      pedestal.castShadow = true;
      pedestal.receiveShadow = true;
      group.add(pedestal);

      // Model Container
      const modelGroup = new THREE.Group();
      modelGroup.position.y = 1;
      builder(modelGroup);
      group.add(modelGroup);

      // Local Spotlight for the model
      const light = new THREE.SpotLight(0xffffff, 5);
      light.position.set(0, 3, 0);
      light.target = pedestal;
      group.add(light);

      this.artworkMeshes.push(group);
      this.scene.add(group);
    };

    // 1. The Great Pyramid
    createExhibit(-5, 25, 'The Great Pyramid', 'Miniature of Giza, representing ancient geometry.', (g) => {
      const geo = new THREE.ConeGeometry(0.5, 0.7, 4);
      const mesh = new THREE.Mesh(geo, modelMat);
      mesh.position.y = 0.35;
      g.add(mesh);
    });

    // 2. Eiffel Tower (Simplified)
    createExhibit(5, 25, 'Eiffel Tower', 'A symbol of industrial revolution and French culture.', (g) => {
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 0.2, 4), modelMat);
      const mid = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 0.4, 4), modelMat);
      const top = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.1, 0.4, 4), modelMat);
      base.position.y = 0.1;
      mid.position.y = 0.4;
      top.position.y = 0.8;
      g.add(base, mid, top);
    });

    // 3. The Parthenon (Simplified)
    createExhibit(-5, 35, 'The Parthenon', 'Classic Greek architecture featuring Doric columns.', (g) => {
      const roof = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.1, 0.5), modelMat);
      roof.position.y = 0.5;
      const base = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.1, 0.5), modelMat);
      base.position.y = 0.05;
      g.add(roof, base);
      for(let i = 0; i < 4; i++) {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.4), modelMat);
        col.position.set(i % 2 === 0 ? -0.3 : 0.3, 0.3, i < 2 ? -0.15 : 0.15);
        g.add(col);
      }
    });

    // 4. Burj Khalifa (Modern Skyscraper)
    createExhibit(5, 35, 'Burj Khalifa', 'Representing modern vertical architecture.', (g) => {
      for(let i = 0; i < 5; i++) {
        const segment = new THREE.Mesh(new THREE.CylinderGeometry(0.2 - (i * 0.04), 0.25 - (i * 0.04), 0.3), modelMat);
        segment.position.y = 0.15 + (i * 0.25);
        g.add(segment);
      }
    });
  }

  private addArtworksToScene(artworks: ArtworkData[]) {
    artworks.forEach((artwork) => {
      const group = new THREE.Group();
      group.userData = artwork;

      this.textureLoader.load(artwork.url, (texture) => {
        const aspectRatio = texture.image.width / texture.image.height;
        const height = 3;
        const width = height * aspectRatio;

        const framePadding = 0.2;
        const frameGeo = new THREE.BoxGeometry(width + framePadding, height + framePadding, 0.15);
        const frameMat = new THREE.MeshStandardMaterial({ 
          color: '#d4af37', 
          metalness: 0.7, 
          roughness: 0.3,
          emissive: '#221100',
          emissiveIntensity: 0.2
        });
        const frame = new THREE.Mesh(frameGeo, frameMat);
        group.add(frame);

        const paintingGeo = new THREE.PlaneGeometry(width, height);
        const paintingMat = new THREE.MeshBasicMaterial({ map: texture });
        const painting = new THREE.Mesh(paintingGeo, paintingMat);
        painting.position.z = 0.08;
        group.add(painting);

        const spotLight = new THREE.SpotLight(0xffffff, 10);
        spotLight.position.set(0, 2, 3);
        spotLight.target = frame;
        spotLight.angle = Math.PI / 6;
        spotLight.penumbra = 0.5;
        spotLight.decay = 2;
        spotLight.distance = 10;
        spotLight.castShadow = true;
        group.add(spotLight);
      });

      group.position.set(...artwork.position as [number, number, number]);
      if (artwork.rotation) {
        group.rotation.set(...artwork.rotation as [number, number, number]);
      }
      
      this.artworkMeshes.push(group);
      this.scene.add(group);
    });
  }

  public toggleDoor() {
    this.doorOpenStatus = !this.doorOpenStatus;
  }

  public get isDoorOpen() {
    return this.doorOpenStatus;
  }

  private createArtworks() {
    ARTWORKS.forEach((artwork) => {
      const group = new THREE.Group();
      group.userData = artwork;

      this.textureLoader.load(artwork.url, (texture) => {
        const aspectRatio = texture.image.width / texture.image.height;
        const height = 3;
        const width = height * aspectRatio;

        // Enhanced Frame (Classical Gold)
        const framePadding = 0.2;
        const frameGeo = new THREE.BoxGeometry(width + framePadding, height + framePadding, 0.15);
        const frameMat = new THREE.MeshStandardMaterial({ 
          color: '#d4af37', // Gold
          metalness: 0.7, 
          roughness: 0.3,
          emissive: '#221100',
          emissiveIntensity: 0.2
        });
        const frame = new THREE.Mesh(frameGeo, frameMat);
        group.add(frame);

        // Painting
        const paintingGeo = new THREE.PlaneGeometry(width, height);
        const paintingMat = new THREE.MeshBasicMaterial({ map: texture });
        const painting = new THREE.Mesh(paintingGeo, paintingMat);
        painting.position.z = 0.051;
        group.add(painting);

        // Spot Light
        const spotLight = new THREE.SpotLight(0xffffff, 10);
        spotLight.position.set(0, 2, 3);
        spotLight.target = frame;
        spotLight.angle = Math.PI / 6;
        spotLight.penumbra = 0.5;
        spotLight.decay = 2;
        spotLight.distance = 10;
        spotLight.castShadow = true;
        group.add(spotLight);
      });

      group.position.set(...artwork.position);
      group.rotation.set(...artwork.rotation);
      
      this.artworkMeshes.push(group);
      this.scene.add(group);
    });
  }

  private createLighting() {
    // Ambient Light
    const ambient = new THREE.AmbientLight(0xffffff, 0.2);
    this.scene.add(ambient);

    // Subtle Hemisphere Light for natural bounce
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.3);
    this.scene.add(hemiLight);

    // Create Ceiling Light Grid
    const { WALL_HEIGHT } = MUSEUM_CONFIG;
    
    const createLightFixture = (x: number, z: number) => {
      const group = new THREE.Group();
      
      // The physical "Can" light on the ceiling
      const fixtureGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 16);
      const fixtureMat = new THREE.MeshStandardMaterial({ color: '#333333' });
      const fixture = new THREE.Mesh(fixtureGeo, fixtureMat);
      
      // The glowing part of the bulb
      const bulbGeo = new THREE.SphereGeometry(0.15, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
      const bulbMat = new THREE.MeshBasicMaterial({ color: '#fffacd' });
      const bulb = new THREE.Mesh(bulbGeo, bulbMat);
      bulb.rotation.x = Math.PI;
      bulb.position.y = -0.05;
      
      const light = new THREE.PointLight('#fffacd', 8, 12);
      light.position.y = -0.5;
      light.decay = 2;

      group.add(fixture, bulb, light);
      group.position.set(x, WALL_HEIGHT - 0.05, z);
      this.scene.add(group);
    };

    // Room 1 Lights (3x3 Grid)
    for (let x = -7; x <= 7; x += 7) {
      for (let z = -7; z <= 7; z += 7) {
        createLightFixture(x, z);
      }
    }

    // Room 2 Lights (3x3 Grid)
    for (let x = -7; x <= 7; x += 7) {
      for (let z = 23; z <= 37; z += 7) {
        createLightFixture(x, z);
      }
    }

    // Hallway Lights
    for (let z = 12; z <= 18; z += 3) {
      createLightFixture(0, z);
    }

    // Dynamic Atmospheric Light for Room 2
    const centerPoint = new THREE.PointLight(0x4f46e5, 0, 15);
    centerPoint.position.set(0, 4, 30);
    centerPoint.name = 'PulsingLight';
    this.scene.add(centerPoint);
  }

  private createSculpture() {
    // Animated Sculpture in the center
    const group = new THREE.Group();
    group.position.set(0, 1.5, 0);

    const baseGeo = new THREE.CylinderGeometry(0.8, 1, 0.5, 32);
    const baseMat = new THREE.MeshStandardMaterial({ color: '#333333' });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = -1;
    group.add(base);

    // Abstract geometry
    const geometry = new THREE.TorusKnotGeometry(0.6, 0.2, 100, 16);
    const material = new THREE.MeshPhysicalMaterial({
      color: '#4f46e5',
      metalness: 0.9,
      roughness: 0.1,
      transmission: 0.5,
      thickness: 1
    });
    const sculpture = new THREE.Mesh(geometry, material);
    sculpture.name = 'AnimatedSculpture';
    sculpture.castShadow = true;
    group.add(sculpture);

    this.scene.add(group);
  }

  public update(time: number) {
    const sculpture = this.scene.getObjectByName('AnimatedSculpture');
    if (sculpture) {
      sculpture.rotation.y = time * 0.5;
      sculpture.rotation.x = time * 0.3;
      // Oscillating scale
      const s = 1 + Math.sin(time) * 0.1;
      sculpture.scale.set(s, s, s);
    }

    const pulsingLight = this.scene.getObjectByName('PulsingLight') as THREE.PointLight;
    if (pulsingLight) {
      pulsingLight.intensity = (Math.sin(time * 2) + 1) * 2;
    }

    // Animate Door
    if (this.doorGroup) {
      const targetRotation = this.doorOpenStatus ? -Math.PI / 2 : 0;
      this.doorGroup.rotation.y = THREE.MathUtils.lerp(this.doorGroup.rotation.y, targetRotation, 0.1);
    }
  }

  public highlightArtwork(id: string | null) {
    this.artworkMeshes.forEach((group) => {
      const frame = group.children.find(c => c.type === 'Mesh') as THREE.Mesh;
      if (frame && frame.material instanceof THREE.MeshStandardMaterial) {
        if (group.userData.id === id) {
          frame.material.emissive.set('#4f46e5');
          frame.material.emissiveIntensity = 0.5;
        } else {
          frame.material.emissive.set('#000000');
          frame.material.emissiveIntensity = 0;
        }
      }
    });
  }

  public getInteractables() {
    const interactables = [...this.artworkMeshes];
    if (this.doorGroup) {
      interactables.push(this.doorGroup);
    }
    return interactables;
  }
}
