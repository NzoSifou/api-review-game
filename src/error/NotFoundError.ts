export function notFound(name: string): never {
  const error = new Error(name + " not found");
  (error as any).status = 404;
  throw error;
}

export function notFoundConsole(name: string): never {
  const error = new Error("Console " + name + " not found");
  (error as any).status = 404;
  throw error;
}

export function notFoundGame(name: string): never {
  const error = new Error("Game " + name + " not found");
  (error as any).status = 404;
  throw error;
}