import EventEmitter from "events";

declare module "node:fs/promises" {
  interface FileHandle extends EventEmitter {}
}
