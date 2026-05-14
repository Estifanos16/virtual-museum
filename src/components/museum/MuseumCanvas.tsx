/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FirstPersonControls } from './FirstPersonControls';
import { MuseumScene } from './MuseumScene';
import { HUD } from '../ui/HUD';
import { ArtworkData, MuseumState } from '../../types';

export const MuseumCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [state, setState] = useState<MuseumState>({
    isLocked: false,
    selectedArtwork: null,
    instructionsOpen: true
  });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#e5e7eb');
    scene.fog = new THREE.FogExp2('#e5e7eb', 0.02);

    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 1.7, 5); // Eyes height at 1.7m

    // Initialize Museum Logic
    const museum = new MuseumScene(scene);
    const controls = new FirstPersonControls(camera, canvasRef.current);

    // Pointer lock change handler
    const onPointerLockChange = () => {
      const locked = document.pointerLockElement === canvasRef.current;
      setState(prev => ({ ...prev, isLocked: locked }));
      controls.isLocked = locked;
    };

    document.addEventListener('pointerlockchange', onPointerLockChange);

    // Raycasting for Interactivity
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(0, 0); // Center of screen

    const handleInteract = () => {
      if (!controls.isLocked) return;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(museum.getInteractables(), true);

      if (intersects.length > 0) {
        let current: THREE.Object3D | null = intersects[0].object;
        
        // Check for Door interaction
        if (current.userData.isDoor || (current.parent && current.parent.userData.isDoor)) {
          museum.toggleDoor();
          return;
        }

        while (current && !current.userData.id) {
          current = current.parent;
        }
        
        if (current && current.userData.id) {
          const artwork = current.userData as ArtworkData;
          setState(prev => ({ ...prev, selectedArtwork: artwork }));
          museum.highlightArtwork(artwork.id);
        }
      } else {
        setState(prev => ({ ...prev, selectedArtwork: null }));
        museum.highlightArtwork(null);
      }
    };

    window.addEventListener('mousedown', handleInteract);

    // Animation Loop
    let animationId: number;
    const timer = new (THREE as any).Timer();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      timer.update();
      const delta = timer.getDelta();
      const time = timer.getElapsed();

      controls.isDoorOpen = museum.isDoorOpen;
      controls.update(delta);
      museum.update(time);
      
      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Function to enter the experience
    const startExperience = () => {
      if (!document.pointerLockElement && canvasRef.current) {
        canvasRef.current.requestPointerLock();
      }
    };

    canvasRef.current?.addEventListener('click', startExperience);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', handleInteract);
      document.removeEventListener('pointerlockchange', onPointerLockChange);
      canvasRef.current?.removeEventListener('click', startExperience);
      renderer.dispose();
      if (document.pointerLockElement === canvasRef.current) {
        document.exitPointerLock();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-screen bg-gray-200 overflow-hidden relative">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="crosshair" />
      <HUD 
        isLocked={state.isLocked} 
        selectedArtwork={state.selectedArtwork} 
        onCloseArtwork={() => setState(prev => ({ ...prev, selectedArtwork: null }))}
      />
    </div>
  );
};
