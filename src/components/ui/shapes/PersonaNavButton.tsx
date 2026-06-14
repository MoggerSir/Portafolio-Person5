import { cn } from '@/utils/cn';
import { LayeredShape } from './LayeredShape';
import { getNavButtonOffset, getNavButtonTilt } from '@/utils/shapeTransform';

interface PersonaNavButtonProps {
  number: string;
  label: string;
  isActive: boolean;
  index: number;
  onClick: () => void;
}

export function PersonaNavButton({
  number,
  label,
  isActive,
  index,
  onClick,
}: PersonaNavButtonProps) {
  const tilt = getNavButtonTilt(index);
  const verticalOffset = getNavButtonOffset(index);

  return (
    <div
      className={cn('relative', isActive && 'z-30')}
      style={{ marginTop: verticalOffset }}
    >
      <button
        type="button"
        onClick={onClick}
        className="group relative border-none bg-transparent p-0 pt-8 outline-none"
      >
        <span
          className={cn(
            'persona-nav-number absolute -top-1 left-2 font-display text-base tracking-widest transition-all duration-200 md:text-lg',
            isActive
              ? 'persona-nav-number-badge bg-persona-red px-2 py-0.5 text-persona-black persona-clip-nav'
              : 'top-0 px-1 py-0.5 font-bold text-persona-white group-hover:-translate-y-0.5',
          )}
        >
          {number}
        </span>

        <LayeredShape
          variant="nav"
          interactive
          selected={isActive}
          tilt={tilt}
          layers={
            isActive
              ? [
                  { color: 'bg-persona-red', offsetX: -4, offsetY: 4 },
                  { color: 'bg-persona-black', offsetX: -2, offsetY: 2 },
                ]
              : [{ color: 'bg-persona-white', offsetX: -3, offsetY: 3 }]
          }
          contentClassName={cn(
            'px-5 py-2.5 text-sm font-semibold tracking-[0.15em] uppercase transition-colors',
            isActive
              ? 'mt-1 bg-persona-white pt-3 text-persona-black'
              : 'border-2 border-persona-white bg-persona-black text-persona-white group-hover:bg-persona-white group-hover:text-persona-black',
          )}
        >
          {label}
        </LayeredShape>

        {isActive && (
          <span
            aria-hidden="true"
            className="absolute top-[1.85rem] left-1/2 z-30 h-2 w-10 -translate-x-1/2 bg-persona-white persona-clip-nav transition-transform duration-200 group-hover:-translate-y-0.5"
          />
        )}
      </button>
    </div>
  );
}
