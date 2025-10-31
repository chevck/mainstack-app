# Testing Guide

This project uses [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/react) for unit testing.

## Setup

Install dependencies:

```bash
npm install
```

## Running Tests

Run all tests:
```bash
npm test
```

Run tests in watch mode (automatically reruns on file changes):
```bash
npm run test:watch
```

Run tests with coverage report:
```bash
npm run test:coverage
```

## Test Structure

All tests are organized in the `src/test/` folder, maintaining the same directory structure as source files:

```
src/
  └── test/
      ├── setup.ts                      # Test setup and configuration
      ├── test-utils.tsx                # Custom render with providers
      ├── utils/
      │   └── index.test.ts             # Tests for utility functions
      └── components/
          ├── App.test.tsx              # Tests for App component
          ├── layout/
          │   ├── Header.test.tsx       # Tests for Header component
          │   └── Sidebar.test.tsx      # Tests for Sidebar component
          ├── Transactions.test.tsx     # Tests for Transactions component
          └── GraphSection.test.tsx     # Tests for GraphSection component
```

## Writing Tests

### Example: Utility Function Test

```typescript
import { formatMoney } from './index';

describe('formatMoney', () => {
  it('should format positive numbers correctly', () => {
    expect(formatMoney(1000)).toBe('USD1,000');
  });
});
```

### Example: Component Test

```typescript
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

## Test Coverage

The project is configured to generate coverage reports. After running `npm run test:coverage`, check the `coverage/` directory for HTML reports.

## Best Practices

1. **Test user behavior, not implementation details**
2. **Use descriptive test names** that explain what is being tested
3. **Keep tests simple and focused** - one assertion per test when possible
4. **Use `screen` queries** from React Testing Library
5. **Mock external dependencies** like API calls
6. **Clean up after tests** using the built-in cleanup

## Common Testing Patterns

### Mocking Fetch API

```typescript
global.fetch = jest.fn();

(global.fetch as any).mockResolvedValueOnce({
  ok: true,
  json: async () => mockData,
});
```

### Testing Async Components

```typescript
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
}, { timeout: 3000 });
```

### Testing User Interactions

```typescript
import { fireEvent } from '@testing-library/react';

const button = screen.getByText('Click me');
fireEvent.click(button);
```

## Troubleshooting

If tests fail to find modules:
1. Ensure all dependencies are installed: `npm install`
2. Check that `jest.config.js` is properly configured
3. Verify that test files have the `.test.ts` or `.test.tsx` extension
4. Make sure TypeScript paths are correctly set up if using path aliases

