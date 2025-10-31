# Clean Code & Architecture Review

## 🏗️ **Architecture Issues**

### 1. **Missing Service Layer**
- **Issue**: API calls are directly in `App.tsx` instead of a dedicated service layer
- **Impact**: Violates separation of concerns, makes testing difficult, code duplication
- **Location**: `src/App.tsx` lines 32-60
- **Recommendation**: Create `src/services/api/` directory with:
  - `apiClient.ts` - Base fetch wrapper with error handling
  - `userService.ts` - User-related API calls
  - `transactionService.ts` - Transaction-related API calls
  - `walletService.ts` - Wallet-related API calls

### 2. **Hard-coded Configuration**
- **Issue**: API endpoint URL is hard-coded in component
- **Location**: `src/App.tsx` line 24
- **Recommendation**: 
  - Create `src/config/constants.ts` or use environment variables
  - Use `.env` file for different environments

### 3. **Missing Custom Hooks**
- **Issue**: Data fetching logic mixed with component logic
- **Location**: `src/App.tsx`
- **Recommendation**: Create `src/hooks/useAppData.ts` to encapsulate:
  - State management
  - Data fetching
  - Loading/error states

### 4. **Monolithic App Component**
- **Issue**: `App.tsx` contains header, sidebar, and main content - too many responsibilities
- **Recommendation**: Extract into:
  - `components/layout/Header.tsx`
  - `components/layout/Sidebar.tsx`
  - `components/layout/LoadingOverlay.tsx`

---

## 🔧 **Code Quality Issues**

### 1. **Incomplete Error Handling**
- **Issue**: `fetch()` doesn't check HTTP response status (4xx, 5xx errors won't be caught)
- **Location**: `src/App.tsx` lines 32-60
- **Problem**: Network errors are caught, but HTTP errors (404, 500, etc.) are not
- **Fix**: 
```typescript
const response = await fetch(url);
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}
return response.json();
```

### 2. **Functions Can Return `undefined`**
- **Issue**: Fetch functions don't return anything on error, causing potential runtime errors
- **Location**: `src/App.tsx` lines 32-60
- **Problem**: If error occurs, function returns `undefined`, then `setUser(undefined)` sets invalid state
- **Fix**: Always return a value or throw errors properly

### 3. **Missing Response Validation**
- **Issue**: No validation that API responses match expected TypeScript types
- **Recommendation**: Add runtime validation using Zod or similar

### 4. **Duplicate Error Handling Code**
- **Issue**: Same try-catch pattern repeated 3 times
- **Location**: `src/App.tsx` lines 32-60
- **Recommendation**: Extract to reusable function

### 5. **Console.log Statements**
- **Issue**: Debug statements left in production code
- **Location**: `src/components/Transactions.tsx` lines 19, 24
- **Fix**: Remove or use proper logging utility

### 6. **Commented Out Code**
- **Issue**: Dead code should be removed
- **Location**: `src/components/Transactions.tsx` line 21
- **Fix**: Remove commented code or add to version control notes

### 7. **Magic Numbers and Strings**
- **Issue**: Hard-coded values scattered throughout
- **Examples**:
  - `src/components/Transactions.tsx` line 38: Filter count hard-coded as "3"
  - `src/App.tsx` line 84: Missing closing brace (syntax error!)
  - Color values: `#56616B`, `#131316` should be in constants
- **Recommendation**: Create `src/constants/` directory

### 8. **Missing Type Safety**
- **Issue**: Component props use inline types instead of interfaces
- **Location**: `src/components/GraphSection.tsx` lines 9-10
- **Recommendation**: Extract to separate interface files

### 9. **Inconsistent Naming**
- **Issue**: `handleFetchUser` vs `handleWalletBalance` - inconsistent verb usage
- **Recommendation**: Use consistent naming: `fetchUser`, `fetchTransactions`, `fetchWalletBalance`

---

## 📁 **File Organization Issues**

### 1. **Incorrect File Extensions**
- **Issue**: `src/utils/types.tsx` and `src/utils/index.tsx` use `.tsx` but contain no JSX
- **Fix**: Rename to `.ts`

### 2. **Missing Directory Structure**
- **Recommendation**: Organize as:
  ```
  src/
    api/          # API service layer
    components/   # UI components
      layout/     # Layout components (Header, Sidebar)
      features/   # Feature-specific components
    hooks/        # Custom React hooks
    utils/        # Utility functions
    constants/    # Constants and configuration
    types/        # TypeScript types (not in utils)
  ```

### 3. **Large Component Files**
- **Issue**: `App.tsx` is 158 lines - should be broken down
- **Issue**: `FilterTransactions.tsx` contains multiple sub-components inline

---

## 🎨 **Component Issues**

### 1. **Missing Component Extraction**
- **Header**: Should be `components/layout/Header.tsx`
- **Sidebar**: Should be `components/layout/Sidebar.tsx`
- **Navigation Menu**: Should be `components/layout/NavigationMenu.tsx`
- **Transaction Item**: Should be `components/transactions/TransactionItem.tsx`
- **Loading Overlay**: Should be `components/ui/LoadingOverlay.tsx`

### 2. **Inline Sub-components**
- **Issue**: `TransactionTypeSelect` and `TransactionStatusSelect` are defined inside filter drawer file
- **Location**: `src/components/drawers/FilterTransactions.tsx` lines 13-86
- **Recommendation**: Extract to separate files in `components/transactions/filters/`

### 3. **Hard-coded Data in Components**
- **Issue**: Chart data is hard-coded in component
- **Location**: `src/components/GraphSection.tsx` lines 32-39
- **Recommendation**: Should come from props or API

### 4. **Empty Div Elements**
- **Issue**: Empty div used for spacing (bad practice)
- **Location**: `src/components/GraphSection.tsx` line 89
- **Fix**: Use CSS gap/margin instead

### 5. **Missing Error Boundaries**
- **Issue**: No error boundary component to catch React errors
- **Recommendation**: Add `components/ErrorBoundary.tsx`

### 6. **Inconsistent Prop Interfaces**
- **Issue**: Some components use inline types, some don't
- **Recommendation**: Always define interfaces for props

---

## 🔒 **Type Safety Issues**

### 1. **Optional Chaining Overuse**
- **Issue**: Excessive use of `?.` suggests missing type guards
- **Example**: `walletBalance?.balance || 0` - should validate at API boundary

### 2. **Type Definitions in Wrong Location**
- **Issue**: Types are in `utils/types.tsx` - should be in dedicated `types/` directory
- **Recommendation**: Move to `src/types/` with separate files:
  - `user.types.ts`
  - `transaction.types.ts`
  - `wallet.types.ts`

### 3. **Missing Return Types**
- **Issue**: Functions missing explicit return types
- **Location**: Various async functions
- **Recommendation**: Always specify return types: `Promise<User | null>`

---

## 🐛 **Specific Bugs & Issues**

### 1. **Incomplete Error Handling in Promise.all**
- **Issue**: If any fetch function fails, it returns `undefined`, but Promise.all continues with undefined values
- **Location**: `src/App.tsx` line 70
- **Problem**: State gets set to `undefined` instead of proper error handling
- **Fix**: Ensure all promises resolve or handle rejections properly

### 2. **Missing Loading State per Request**
- **Issue**: Only global loading state, can't show individual loading indicators
- **Recommendation**: Separate loading states or use React Query

### 3. **No Response Type Validation**
- **Issue**: Assuming API returns correct format without validation
- **Risk**: Runtime errors if API structure changes

### 4. **Bug in `formatMoney` Function**
- **Issue**: String replacement logic is flawed
- **Location**: `src/utils/index.tsx` lines 7-10
- **Problems**:
  - `.replace(" ", "")` replaces ALL spaces, not just the first one
  - Multiple chained `.replace()` calls are inefficient and error-prone
  - The result may not match the intended format
- **Example Bug**: `"USD 1,234.56"` after first replace becomes `"USD1234.56"` if there are multiple spaces
- **Fix**: Use regex or proper string formatting

### 5. **Date Formatting Error Handling**
- **Issue**: `formatDate` doesn't handle invalid dates
- **Location**: `src/utils/index.tsx` line 12-17
- **Problem**: `new Date("")` returns `Invalid Date`, which will display incorrectly
- **Fix**: Add validation for invalid dates

---

## 🧪 **Testing & Maintainability**

### 1. **No Test Files**
- **Issue**: No test setup or test files found
- **Recommendation**: Add testing framework (Vitest + React Testing Library)

### 2. **Tight Coupling**
- **Issue**: Components tightly coupled to specific API structure
- **Recommendation**: Use abstraction layers

### 3. **No Documentation**
- **Issue**: No JSDoc comments for functions
- **Issue**: No README explaining architecture
- **Recommendation**: Add inline documentation

---

## 🎯 **Priority Fixes**

### **Critical (Fix Immediately)**
1. ✅ Fix error handling - check HTTP response status
2. ✅ Fix functions returning `undefined` on error (breaks Promise.all)
3. ✅ Add proper error handling for Promise.all rejections

### **High Priority**
4. Extract API calls to service layer
5. Extract Header and Sidebar components
6. Remove console.log statements
7. Fix file extensions (.tsx → .ts where appropriate)
8. Add proper TypeScript return types
9. Fix `formatMoney` string replacement bug
10. Add date validation to `formatDate`

### **Medium Priority**
11. Extract custom hooks for data fetching
12. Create constants file for magic values
13. Add environment variable support
14. Extract transaction item to separate component

### **Low Priority**
15. Add error boundaries
16. Improve file organization
17. Add JSDoc comments
18. Set up testing framework

---

## 📋 **Recommended Refactoring Order**

1. **Phase 1: Fix Critical Bugs**
   - Fix syntax errors
   - Fix error handling

2. **Phase 2: Extract API Layer**
   - Create service directory
   - Move API calls
   - Add proper error handling

3. **Phase 3: Component Extraction**
   - Extract Header, Sidebar, LoadingOverlay
   - Extract TransactionItem

4. **Phase 4: Custom Hooks**
   - Create useAppData hook
   - Extract data fetching logic

5. **Phase 5: Code Quality**
   - Remove console.logs
   - Fix file extensions
   - Add constants
   - Improve types

6. **Phase 6: Architecture**
   - Reorganize file structure
   - Add error boundaries
   - Set up testing

---

## 🔍 **Code Smells Detected**

1. **Long Method**: `App.tsx` component too long
2. **Large Class/Component**: Multiple responsibilities
3. **Data Clumps**: Repeated error handling patterns
4. **Primitive Obsession**: Using strings/numbers instead of enums/constants
5. **Long Parameter List**: Some components receive many props
6. **Feature Envy**: Components knowing too much about API structure
7. **Duplicated Code**: Error handling repeated 3 times
8. **Dead Code**: Commented out code and unused imports

