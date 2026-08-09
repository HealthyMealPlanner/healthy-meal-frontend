import { AlertTriangle } from "lucide-react";

function ErrorState({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="flex min-h-[40vh] w-full flex-col items-center justify-center gap-3 px-6 py-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
        <AlertTriangle size={22} className="text-red-500" />
      </div>

      <p className="max-w-sm text-sm text-slate">{message}</p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;
