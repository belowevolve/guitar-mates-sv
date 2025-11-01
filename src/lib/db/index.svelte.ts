import { liveQuery } from "dexie";
import { fromStore } from "svelte/store";

export const liveQ = <T>(q: () => T | Promise<T>) =>
  fromStore({
    subscribe: (run, invalidate) =>
      liveQuery(q).subscribe(run, invalidate).unsubscribe,
  });
