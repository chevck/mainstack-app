/// <reference types="jest" />

declare global {
  var global: typeof globalThis;
  namespace NodeJS {
    interface Global {
      structuredClone: typeof structuredClone;
      ResizeObserver: typeof ResizeObserver;
      IntersectionObserver: typeof IntersectionObserver;
    }
  }
}

export {};

