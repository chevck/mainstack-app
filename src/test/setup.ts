import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

// Polyfill for structuredClone (needed for Chakra UI)
if (!global.structuredClone) {
  global.structuredClone = (obj: any) => JSON.parse(JSON.stringify(obj));
}

// Polyfill for ResizeObserver (needed for Chakra UI charts)
global.ResizeObserver = class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
} as any;

// Polyfill for IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
} as any;

// Cleanup after each test
afterEach(() => {
  cleanup();
});
