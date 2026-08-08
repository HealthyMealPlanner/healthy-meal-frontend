
function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-main-bg font-jakarta">
      <main className="mx-auto flex min-h-screen w-full max-w-md items-center justify-center px-6 py-10">
        {children}
      </main>
    </div>
  );
}

export default AuthLayout;