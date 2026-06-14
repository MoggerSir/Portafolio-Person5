function PhantomMaskIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className="h-10 w-10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 18C6 10 14 4 24 4C34 4 42 10 42 18V28C42 36 34 42 24 42C14 42 6 36 6 28V18Z"
        fill="#f5f5f5"
        stroke="#f5f5f5"
        strokeWidth="2"
      />
      <path
        d="M14 20C16 17 20 16 24 16C28 16 32 17 34 20"
        stroke="#0a0a0a"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ellipse cx="17" cy="24" rx="3" ry="4" fill="#0a0a0a" />
      <ellipse cx="31" cy="24" rx="3" ry="4" fill="#0a0a0a" />
      <path
        d="M20 31C21.5 33 26.5 33 28 31"
        stroke="#0a0a0a"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M24 4V10" stroke="#0a0a0a" strokeWidth="2" />
    </svg>
  );
}

export { PhantomMaskIcon };
