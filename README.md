# remix-fetcher-utils
Loader/Fetcher LRU client cache for Remix + Global Variables.

## Installation
```bash
npm i remix-fetcher-utils
```

## Peer dependencies
`remix`
`@remix-run/react`
`react`

## Setup
First, wrap the code with `AppCacheProvider`, preferably that would be app layout.

```tsx
import { AppCacheProvider } from "~/appCache";

export default function AppLayout() {
  return (
    <AppCacheProvider>
      {/* Rest of code... */}
    </AppCacheProvider>
  );
}
```

## Usage
```tsx
import { useQuery } from "remix-fetcher-utils";

export const OverviewTab = () => {
  const overviewFetcher = useQuery<QueryResult>(
    `/some/query/getOverview/:itemId`,
    { params: { itemId: '123' } }
  );

  return (
    <div className="overflow-auto p-2">
      {overviewFetcher.data && (
        <RenderMDX source={overviewFetcher.data.foo} />
      )}
    </div>
  );
};
```

## Global Variables
```tsx
export const SecondTab = () => {
  const [tabIdx, setTabIdx] = useGlobalVar("tabIndex", {
    defaultValue: 0,
  });
}
```
`useGlobalVar` hook use AppCacheProvider to store variables globally. Any call with `setTabIdx` in this components will result in
any other component which uses this global variable.

## Features
* Caching last calls with same parameters, 2 consecutive calls to same endpoint with same parameters will send http request only once.
* Query/Mutation parameters, add `:` before parameter name to like `:id`, `:firstName` and etc.

## API
* `useQuery<ReturnType = any>(href: string, {params = {}}): FetcherWithComponents<ReturnType>`
   Cached query. Uses remix's fetcher `load` method under the hood.
* `useLazyQuery<ReturnType = any>(href: string): FetcherWithComponents<ReturnType> & {load: (params = {}) => ReturnType}`
   Cached lazy query. Same as `useQuery` but do not trigger the `load` immediately, only then `load` is called programmatically.
```tsx
const booksFetcher = useLazyQuery(
  "/books/:collectionName"
);

const fetchBooksCollection = useCallback((cName: string) => {
  hierarchyFetcher.load({ collectionName: cName });
}, []);
```
* `useMutation(options: {refetchQueries?: string[], subaction?: string}): [submitFn, FetcherWithComponents]`
```tsx
const [update, updateFetcher] = useMutation({
  refetchQueries: [
    "/books/:collectionName",
  ],
});

const handleUpdate = (newCollectionName: string) => {
  update({
    oldName: 'some name',
    newName: newCollectionName
  });
}
```

## Todo
* Tags (inspired from RTK Query) or other solution of query cache validation/invalidation
* Better types for Query & Mutation parameters
