import { cn } from '@/utils/cn';
import { LayeredShape } from './LayeredShape';
import { getNavButtonOffset, getNavButtonTilt } from '@/utils/shapeTransform';

interface PersonaNavButtonProps {
  number: string;
  label: string;
  isActive: boolean;
  index: number;
  onClick: () => void;
  layout?: 'header' | 'dock';
}

export function PersonaNavButton({
  number,
  label,
  isActive,
  index,
  onClick,
  layout = 'header',
}: PersonaNavButtonProps) {
  const tilt = getNavButtonTilt(index);
  const verticalOffset = layout === 'header' ? getNavButtonOffset(index) : 0;
  const isDock = layout === 'dock';

  return (
    <div
      className={cn('relative w-full', isActive && 'z-30')}
      style={{ marginTop: verticalOffset }}
    >
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'group relative w-full border-none bg-transparent p-0 outline-none',
          isDock ? 'pt-6' : 'pt-8',
        )}
      >
        <span
          className={cn(
            'persona-nav-number absolute left-2 font-display tracking-widest transition-all duration-200',
            isDock ? '-top-0.5 text-sm' : '-top-1 text-base md:text-lg',
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
            'font-semibold tracking-[0.15em] uppercase transition-colors',
            isDock ? 'px-3 py-2 text-[0.68rem]' : 'px-5 py-2.5 text-sm',
            isActive
              ? 'mt-1 bg-persona-white pt-3 text-persona-black'
              : 'border-2 border-persona-white bg-persona-black text-persona-white group-hover:bg-persona-white group-hover:text-persona-black',
          )}
        >
          {label}
        </LayeredShape>

        {isActive && !isDock && (
          <span
            aria-hidden="true"
            className="absolute top-[1.85rem] left-1/2 z-30 h-2 w-10 -translate-x-1/2 bg-persona-white persona-clip-nav transition-transform duration-200 group-hover:-translate-y-0.5"
          />
        )}
      </button>
    </div>
  );
}
