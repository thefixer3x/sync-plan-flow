// Workaround for Dexie TS1540 error with newer TypeScript versions
// The 'module' keyword in dexie.d.ts conflicts with TS moduleDetection: "force"
declare module 'dexie' {
  export * from 'dexie/dist/dexie';
}
