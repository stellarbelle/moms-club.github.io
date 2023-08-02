/// <reference types="vite/client" />

declare module "*.txt" {
  const content: any;
  export default content;
}
