// src/pages/ErrorPage.tsx
import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError() as Error;

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-red-500">Oops!</h1>
      <p className="mt-4 text-lg">Sorry, an unexpected error has occurred.</p>
      <p className="mt-2 text-gray-500">{error.message}</p>
    </div>
  );
}
