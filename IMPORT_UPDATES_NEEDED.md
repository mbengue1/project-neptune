# Import Path Updates - Follow-Up Required

This document tracks import path updates that need to be completed for the restructured codebase.

## Completed ✅

### Backend Services
- ✅ `services/api/src/server.js` - Updated cacheService import
- ✅ `services/api/src/services/sportsDataService.js` - Updated cacheService import
- ✅ `services/api/src/services/sportIntelService.js` - Updated cacheService and apiSportsClient imports
- ✅ `services/api/src/services/aiService.js` - Updated cacheService import
- ✅ `services/api/src/routes/sportIntel.js` - Updated apiSportsClient import

## Mobile App - Pending 🔄

The following files import types from the old location and need updating once the mobile app's TypeScript configuration supports path aliases:

### Files importing from `../types/matches`:
1. `apps/mobile/src/services/oddsApi.ts`
2. `apps/mobile/src/screens/MatchDetailsScreen/MatchDetailsScreen.tsx`
3. `apps/mobile/src/hooks/useOddsApi.ts`
4. `apps/mobile/src/data/sportsData/index.ts`
5. `apps/mobile/src/contexts/SportsDataContext.tsx`
6. `apps/mobile/src/components/MatchList/MatchList.tsx`

**Current path**: `import { MatchType } from '../types/matches';` or `../../types/matches`  
**New location**: Types moved to `packages/types/src/matches.ts`

**Options for fix**:
1. **Option A - Path Aliases** (Recommended): Update mobile app's `tsconfig.json` to support path aliases:
   ```typescript
   import { MatchType } from '@neptune/types/matches';
   ```

2. **Option B - Relative Imports**: Use relative imports to packages:
   ```typescript
   import { MatchType } from '../../../packages/types/src/matches';
   ```

3. **Option C - Local Re-export**: Keep a local types directory that re-exports from packages:
   ```typescript
   // apps/mobile/src/types/index.ts
   export * from '../../../packages/types/src';
   ```

### Files importing from `../../data/sportsBettingTypes`:
1. `apps/mobile/src/screens/BetsScreen/BetsScreen.tsx`
2. `apps/mobile/src/components/PlayerBets/PlayerBets.tsx`

**Current path**: `import { ... } from '../../data/sportsBettingTypes';`  
**New location**: Moved to `packages/types/src/sportsBettingTypes.ts`

**Recommended fix**: Same as above - use path aliases or relative imports.

## Mobile App tsconfig.json Update Needed

To support `@neptune/*` imports in the mobile app, update `apps/mobile/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "jsx": "react-native",
    "target": "esnext",
    "lib": ["dom", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "noEmit": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "isolatedModules": true,
    "baseUrl": "../..",
    "paths": {
      "@neptune/types": ["packages/types/src"],
      "@neptune/types/*": ["packages/types/src/*"]
    }
  },
  "exclude": [
    "node_modules",
    "babel.config.js",
    "metro.config.js",
    "jest.config.js"
  ]
}
```

## Metro Bundler Configuration

React Native's Metro bundler may also need configuration to resolve these paths. Update `apps/mobile/metro.config.js` if needed:

```javascript
const path = require('path');

module.exports = {
  // ... existing config
  watchFolders: [
    path.resolve(__dirname, '../../packages/types'),
  ],
  resolver: {
    extraNodeModules: {
      '@neptune/types': path.resolve(__dirname, '../../packages/types/src'),
    },
  },
};
```

## Testing After Updates

After making import path changes:

1. **Backend**:
   ```bash
   cd services/api
   npm install
   node src/server.js
   ```

2. **Mobile**:
   ```bash
   cd apps/mobile
   npm install
   npm start
   # Check for import errors in Metro bundler
   ```

3. **TypeScript**:
   ```bash
   npm run typecheck
   ```

## Priority

- **High**: Backend imports (✅ Completed)
- **Medium**: Mobile app imports (🔄 Pending)
- **Low**: Optimizing import paths for consistency

---

_Last updated: 2025-10-06_
