/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MousePointer2, Move, Info, X } from 'lucide-react';
import { ArtworkData } from '../../types';

interface HUDProps {
  isLocked: boolean;
  selectedArtwork: ArtworkData | null;
  onCloseArtwork: () => void;
}

export const HUD: React.FC<HUDProps> = ({ isLocked, selectedArtwork, onCloseArtwork }) => {
  return (
    <div className="fixed inset-0 pointer-events-none flex flex-col justify-between p-8">
      {/* Top Left: Title */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-sans font-bold tracking-tight text-white drop-shadow-lg">
          VIRTUAL MUSEUM
        </h1>
        <p className="text-xs font-mono text-white/70">COMPUTER GRAPHICS EXHIBITION</p>
      </div>

      {/* Center: Interaction Hint */}
      {!isLocked && !selectedArtwork && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto bg-black/60 backdrop-blur-[2px]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-12 rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] flex flex-col items-center gap-8 max-w-lg text-center"
          >
            <div className="bg-indigo-50 p-6 rounded-3xl text-indigo-600">
              <MousePointer2 className="w-12 h-12" />
            </div>
            <div>
              <h2 className="text-3xl font-black font-sans tracking-tight text-gray-900">Virtual Exhibition 2026</h2>
              <p className="text-gray-500 mt-3 leading-relaxed">
                Experience the intersection of digital craft and classical curation in our newly updated multi-room virtual gallery.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 w-full">
               <button 
                onClick={() => document.querySelector('canvas')?.click()}
                className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all duration-300 shadow-lg"
               >
                Begin Exploration
               </button>
               
               <div className="grid grid-cols-2 gap-4 mt-2">
                 <div className="bg-gray-50 p-4 rounded-xl flex flex-col items-center">
                   <span className="text-[10px] text-gray-400 font-bold uppercase mb-1">Movement</span>
                   <span className="text-sm font-mono text-gray-700">WASD KEYS</span>
                 </div>
                 <div className="bg-gray-50 p-4 rounded-xl flex flex-col items-center">
                   <span className="text-[10px] text-gray-400 font-bold uppercase mb-1">Perspective</span>
                   <span className="text-sm font-mono text-gray-700">MOUSE LOOK</span>
                 </div>
               </div>
            </div>

            <div className="text-[10px] text-gray-300 uppercase tracking-[0.2em] font-black">
              Built with WebGL & Three.js
            </div>
          </motion.div>
        </div>
      )}

      {/* Center Reticle */}
      {isLocked && !selectedArtwork && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-white ring-4 ring-white/20 rounded-full" />
        </div>
      )}

      {/* Artwork Info Panel */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute right-8 top-1/2 -translate-y-1/2 w-80 bg-white shadow-2xl rounded-2xl overflow-hidden pointer-events-auto"
          >
            <div className="relative h-48 bg-gray-100 italic flex items-center justify-center">
              <img 
                src={selectedArtwork.url} 
                alt={selectedArtwork.title} 
                className="w-full h-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
              />
              <button 
                onClick={onCloseArtwork}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-xl font-bold font-sans text-gray-900">{selectedArtwork.title}</h3>
                <span className="text-xs font-mono text-gray-400">{selectedArtwork.year}</span>
              </div>
              <p className="text-sm font-medium text-indigo-600 mt-1">{selectedArtwork.artist}</p>
              <div className="h-px bg-gray-100 my-4" />
              <p className="text-sm text-gray-600 leading-relaxed">
                {selectedArtwork.description}
              </p>
              <div className="mt-6 flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest font-mono">
                <Info size={10} /> Raycasted Interaction Active
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Information Bar */}
      <div className="flex justify-between items-end">
        <div className="flex gap-4">
           {/* Navigation Controls Legend */}
           {isLocked && (
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-3 text-white/80 text-[10px] font-mono"
             >
               <div className="flex items-center gap-1 border-r border-white/20 pr-3">
                 <Move size={12} /> <span>WASD</span>
               </div>
               <span>ESC to Exit Control</span>
             </motion.div>
           )}
        </div>
        <div className="text-[10px] text-white/40 font-mono text-right">
           RENDER_MODE: WebGL_2.0 <br/>
           PROJECTION: Perspective_75deg
        </div>
      </div>
    </div>
  );
};
