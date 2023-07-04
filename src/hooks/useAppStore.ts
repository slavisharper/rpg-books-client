import { Storage } from "@ionic/storage";
import { useMemo } from "react";

const store = new Storage();
await store.create();

async function getValue<T>(key: string): Promise<T | undefined> {
  const storedValue = await store.get(key);
  if (storedValue) {
    return JSON.parse(storedValue) as T;
  }
}

async function setValue(key: string, value: object) {
  await store.set(key, JSON.stringify(value));
}

async function deleteValue(key: string) {
  await store.remove(key);
}

export type AppStore = {
  setValue(key: string, value: object): Promise<void>;
  getValue<T>(key: string): Promise<T | undefined>;
  deleteValue(key: string): Promise<void>;
};

const useAppStore = (): AppStore => {
  const store: AppStore = useMemo(() => {
    return {
      setValue: setValue,
      getValue: getValue,
      deleteValue: deleteValue,
    };
  }, []);

  return store;
};

export default useAppStore;
