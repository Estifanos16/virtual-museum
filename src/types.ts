/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ArtworkData {
  id: string;
  title: string;
  artist: string;
  year: string;
  description: string;
  url: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: [number, number, number];
}

export interface MuseumState {
  isLocked: boolean;
  selectedArtwork: ArtworkData | null;
  instructionsOpen: boolean;
}
