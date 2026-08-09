function Loader({ label = "Loading..." }) {
  return (
    <div className="flex min-h-[40vh] w-full flex-col items-center justify-center gap-3 py-10">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      <p className="text-sm text-slate">{label}</p>
    </div>
  );
}

export default Loader;
