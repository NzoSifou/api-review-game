export function preconditionFailed(name: string): never {
    const error = new Error(name + " exists and has to be deleted first");
    (error as any).status = 412;
    throw error;
}