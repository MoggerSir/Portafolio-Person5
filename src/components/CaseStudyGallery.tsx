import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type WheelEvent } from 'react';
import { createPortal } from 'react-dom';

interface Point {
  readonly x: number;
  readonly y: number;
}

export function CaseStudyGallery({ images, projectName }: { images: readonly string[]; projectName: string }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const dragOrigin = useRef<Point | null>(null);
  const offsetOrigin = useRef<Point>({ x: 0, y: 0 });

  const close = () => {
    setSelectedIndex(null);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const changeZoom = (nextZoom: number) => {
    const value = Math.min(4, Math.max(1, nextZoom));
    setZoom(value);
    if (value === 1) setOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === '+' || event.key === '=') changeZoom(zoom + 0.35);
      if (event.key === '-') changeZoom(zoom - 0.35);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, zoom]);

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    changeZoom(zoom + (event.deltaY < 0 ? 0.25 : -0.25));
  };

  const startDrag = (event: ReactPointerEvent) => {
    if (zoom === 1) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragOrigin.current = { x: event.clientX, y: event.clientY };
    offsetOrigin.current = offset;
  };

  const moveDrag = (event: ReactPointerEvent) => {
    if (!dragOrigin.current) return;
    setOffset({
      x: offsetOrigin.current.x + event.clientX - dragOrigin.current.x,
      y: offsetOrigin.current.y + event.clientY - dragOrigin.current.y,
    });
  };

  const stopDrag = () => {
    dragOrigin.current = null;
  };

  return (
    <>
      <div className={`case-gallery case-gallery-${Math.min(images.length, 4)}`}>
        {images.map((image, index) => (
          <button
            className={index === 0 ? 'case-gallery-main' : ''}
            key={image}
            onClick={() => setSelectedIndex(index)}
            aria-label={`Ampliar vista ${index + 1} de ${projectName}`}
          >
            <img src={image} alt={`Vista ${index + 1} de ${projectName}`} loading={index ? 'lazy' : 'eager'} />
            <span>Ampliar <b>↗</b></span>
          </button>
        ))}
      </div>

      {selectedIndex !== null && createPortal(
        <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={`Visor de ${projectName}`} onClick={close}>
          <div
            className={`image-lightbox-stage ${zoom > 1 ? 'is-zoomed' : ''}`}
            onClick={(event) => event.stopPropagation()}
            onWheel={handleWheel}
            onPointerDown={startDrag}
            onPointerMove={moveDrag}
            onPointerUp={stopDrag}
            onPointerCancel={stopDrag}
          >
            <img
              src={images[selectedIndex]}
              alt={`Vista ampliada ${selectedIndex + 1} de ${projectName}`}
              draggable="false"
              style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${zoom})` }}
            />
          </div>
          <div className="image-lightbox-toolbar" onClick={(event) => event.stopPropagation()}>
            <button onClick={() => changeZoom(zoom - 0.35)} aria-label="Alejar imagen">−</button>
            <span>{Math.round(zoom * 100)}%</span>
            <button onClick={() => changeZoom(zoom + 0.35)} aria-label="Acercar imagen">+</button>
            <button onClick={() => changeZoom(1)}>Restablecer</button>
            <button onClick={close} aria-label="Cerrar imagen">×</button>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
