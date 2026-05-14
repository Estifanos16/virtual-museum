# Academic Report: Interactive 3D Virtual Museum

## 1. Introduction
The Digital Museum project aims to bridge the gap between physical exhibitions and digital accessibility. Using standard WebGL technologies, we provide a performant, browser-native 3D experience that requires no external plugins.

## 2. Objectives
- Implement a fluid First-Person Perspective (FPP) system.
- Showcase hierarchical scene graph management.
- Demonstrate realistic indoor lighting and material properties.
- Provide interactive feedback through ray-intersection logic.

## 3. Technologies Used
- **Three.js (WebGL)**: Core rendering engine and scene management.
- **TypeScript**: Ensures type safety for complex 3D vector calculations.
- **React & Tailwind**: Manages the application state and responsive UI overlays.
- **HTML5 Canvas**: The target surface for GPU-accelerated rendering.

## 4. Implementation Details
### 4.1 Camera Geometry
The camera is placed at 1.7 meters (standard eye level). Movement is calculated using world-space translation based on the camera's local forward and right vectors.

### 4.2 Material Properties
Walls use `MeshStandardMaterial` with high roughness to simulate matte museum surfaces, while frames use moderate metalness to catch highlights from spotlights.

### 4.3 Interactive Raycaster
Upon clicking, a ray is projected from the center of the viewport (0,0,0 in normalized device coordinates). The system traverses the scene graph to find the nearest object intersecting this ray, extracting the `userData` for display.

## 5. Challenges & Solutions
- **Performance**: High-resolution textures were optimized by using linear filtering and proper disposal of WebGL contexts on unmount.
- **Collision**: Implemented simple bounding box checks to keep the user within the museum walls.

## 6. Conclusion
The project successfully demonstrates the power of modern WebGL for educational and cultural preservation tools. The modular architecture allows for easy expansion into larger, multi-room exhibitions.
