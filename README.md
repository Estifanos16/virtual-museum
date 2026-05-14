# Interactive 3D Virtual Museum
**Computer Graphics Academic Project**

## 🏛️ Project Overview
This project is an immersive 3D virtual museum application built using **WebGL** and **Three.js**. It demonstrates advanced computer graphics concepts including real-time rendering, first-person camera systems, texture mapping, and dynamic lighting.

## 🚀 Features
- **First Person Navigation**: WASD movement with mouse-look controls.
- **Interactive Exhibit**: Raycasting-based interaction for exploring artworks.
- **Dynamic Lighting**: Point lights, Spotlights, and Ambient occlusion.
- **Animated Sculptures**: Real-time object transformations (Rotation/Scaling).
- **Modern HUD**: clean React-based user interface for artwork information.

---

## 🎓 Computer Graphics Concepts Demonstrated

### 1. The Rendering Pipeline
The application utilizes a `requestAnimationFrame` loop to continuously update the scene state and re-render the 3D buffer to the HTML5 Canvas.

### 2. Geometric Transformations
- **Translation**: Camera movement throughout the 3D space.
- **Rotation**: Hierarchical rotation of sculptures and camera orientation.
- **Scaling**: Breathing effects on decorative objects.

### 3. Perspective Projection
Implementation of a `PerspectiveCamera` with a 75-degree FOV, mimicking human vision and calculating depth through Z-buffer depth testing.

### 4. Lighting & Shading
- **Phong/Standard Reflection Models**: Applied to museum walls and frames.
- **Spotlights**: Real-time shadow casting and attenuation simulation.

### 5. Texture Mapping
UV mapping techniques used to project 2D image data (artworks) onto 3D planes with proper aspect ratio handling.

### 6. Raycasting for Interaction
Converting 2D mouse coordinates into a 3D ray to perform intersection tests with scene objects for selection.

---

## 🛠️ Tech Stack
- **Library**: Three.js
- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Motion (framer-motion)
- **Icons**: Lucide-React

---

## 📖 Setup Instructions
1. **Controls**: 
   - Click the screen to start navigation.
   - Use **WASD** to move.
   - Use **Mouse** to look around.
   - Press **ESC** to release the mouse cursor.
2. **Interaction**: Point your crosshair at a painting and **Click** to view its details.

## 📝 Academic Report
Included in the project structure as `REPORT.md`.
