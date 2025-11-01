import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

// Polyfill for structuredClone (needed for Chakra UI)
if (!(global as any).structuredClone) {
  (global as any).structuredClone = (obj: any) =>
    JSON.parse(JSON.stringify(obj));
}

// Polyfill for ResizeObserver (needed for Chakra UI charts)
(global as any).ResizeObserver = class ResizeObserver {
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
(global as any).IntersectionObserver = class IntersectionObserver {
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
