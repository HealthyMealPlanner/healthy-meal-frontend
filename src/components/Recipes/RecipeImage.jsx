import { useState } from "react";
import { ImageOff } from "lucide-react";

function RecipeImage({
  src,
  alt = "",
  className = "",
}) {
  const [failed, setFailed] = useState(false);

  const showFallback = !src || failed;

  if (showFallback) {
    return (
      <div
        className={`flex items-center justify-center bg-primary-light ${className}`}
      >
        <ImageOff
          size={32}
          className="text-primary/40"
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

export default RecipeImage;