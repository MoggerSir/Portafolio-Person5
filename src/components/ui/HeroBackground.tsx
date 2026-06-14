export function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <img
        src="/assets/backgrounds/FondoPrincipal1.png"
        alt=""
        className="h-full w-full object-cover object-center"
      />
    </div>
  );
}
