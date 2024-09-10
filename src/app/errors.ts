// src/app/errors.ts
export class SomeSpecificError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SomeSpecificError';
  }
}
