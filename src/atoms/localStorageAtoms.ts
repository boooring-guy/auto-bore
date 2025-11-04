import { atomWithStorage } from "jotai/utils";

export type SidebarState = "expanded" | "collapsed";

const STORAGE_KEY = "sidebar_state";

export const sidebarStateAtom = atomWithStorage<SidebarState>(
  STORAGE_KEY,
  "expanded" // default value
);
