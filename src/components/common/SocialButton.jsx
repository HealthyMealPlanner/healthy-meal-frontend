function GoogleIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M21.35 12.27c0-.71-.06-1.39-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.22Z"
      />
      <path
        fill="#34A853"
        d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.7-1.72-5.47-4.03H3.28v2.53A9.75 9.75 0 0 0 12 21.75Z"
      />
      <path
        fill="#FBBC05"
        d="M6.53 13.84A5.86 5.86 0 0 1 6.22 12c0-.64.11-1.27.31-1.84V7.63H3.28A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.03 4.37l3.25-2.53Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.13c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.2 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.72 5.38l3.25 2.53C7.3 7.85 9.46 6.13 12 6.13Z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.05 12.54c-.02-2.04 1.67-3.02 1.75-3.07a3.76 3.76 0 0 0-2.96-1.6c-1.25-.13-2.45.73-3.09.73-.65 0-1.65-.71-2.71-.69a3.99 3.99 0 0 0-3.35 2.04c-1.45 2.51-.37 6.2 1.02 8.23.68.99 1.49 2.1 2.55 2.06 1.02-.04 1.4-.66 2.63-.66 1.22 0 1.57.66 2.64.64 1.1-.02 1.8-1 2.46-2 .78-1.13 1.1-2.22 1.12-2.28-.02-.01-2.04-.78-2.06-3.4Z" />
      <path d="M15.02 6.55c.56-.68.94-1.63.83-2.58-.81.03-1.79.54-2.37 1.22-.52.6-.98 1.57-.86 2.5.9.07 1.83-.46 2.4-1.14Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#1877F2"
        d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.09 4.39 23.08 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.88v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.08 24 18.09 24 12.07Z"
      />
    </svg>
  );
}

function SocialButton({ provider }) {
  const icons = {
    google: <GoogleIcon />,
    apple: <AppleIcon />,
    facebook: <FacebookIcon />,
  };

  return (
    <button
      type="button"
      className="flex h-14 flex-1 items-center justify-center rounded-xl bg-white shadow-sm transition hover:shadow-md"
    >
      {icons[provider]}
    </button>
  );
}

export default SocialButton;