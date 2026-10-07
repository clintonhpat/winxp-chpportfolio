import React from 'react';
import './SelectionRectangle.css';

/**
 * SelectionRectangle Component
 * The blue "rubber band" selection box when dragging on desktop
 */
function SelectionRectangle({ startX, startY, endX, endY }) {
  const left = Math.min(startX, endX);
  const top = Math.min(startY, endY);
  const width = Math.abs(endX - startX);
  const height = Math.abs(endY - startY);

  // Don't render if too small (prevents accidental tiny rectangles)
  if (width < 5 && height < 5) return null;

  return (
    <div
      className="selection-rectangle"
      style={{
        left,
        top,
        width,
        height,
      }}
    />
  );
}

export default SelectionRectangle;