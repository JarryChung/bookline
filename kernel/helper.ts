export function useAsyncResource<T>(fn: () => Promise<T>) {
  const isLoading = ref(false);
  const error = ref<Error | null>(null);
  const data = ref<T | null>(null);

  const load = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      data.value = await fn();
    } catch (e) {
      error.value = e as any;
    } finally {
      isLoading.value = false;
    }
  };

  load();

  return { isLoading, error, data };
}

type Fn = (...args: any[]) => Promise<any>;
interface PoolOptions {
  concurrency?: number;
}
interface Task {
  resolve: (value: any) => void;
  reject: (error: Error) => void;
  args: any[];
}
export function createPool(fn: Fn, options: PoolOptions = {}) {
  const { concurrency = 1 } = options;

  const tasks: Task[] = [];
  let counter = 0;

  const runTask = async () => {
    if (counter < concurrency && tasks.length > 0) {
      const task = tasks.shift();
      if (!task) {
        return;
      }
      const { resolve, reject, args } = task;
      counter++;

      try {
        const result = await fn(...args);
        resolve(result);
      } catch (error: any) {
        reject(error);
      }

      counter--;
      runTask();
    }
  };

  return async (...args: any) => {
    return new Promise((resolve, reject) => {
      tasks.push({ resolve, reject, args });
      runTask();
    });
  };
}

export function formatTime(time: number): string {
  const date = new Date(time);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function formatReadingTimeToObject(time: number) {
  const hours = Math.floor(time / 60 / 60);
  const minutes = time % 60;
  return { hours, minutes };
}

export function formatReadingTime(time: number): string {
  const { hours, minutes } = formatReadingTimeToObject(time);
  return `${hours}时${minutes}分`;
}

/**
 * Given a list of items returns a new list with only
 * unique items. Accepts an optional identity function
 * to convert each item in the list to a comparable identity
 * value
 */
export const unique = <T, K extends string | number | symbol>(
  array: readonly T[],
  toKey?: (item: T) => K,
): T[] => {
  const valueMap = array.reduce((acc, item) => {
    const key = toKey ? toKey(item) : (item as any as string | number | symbol);
    if (acc[key]) return acc;
    acc[key] = item;
    return acc;
  }, {} as Record<string | number | symbol, T>);
  return Object.values(valueMap);
};

export const isOnlyOne = (source: string, target: string) => {
  const start = source.indexOf(target);
  const end = source.lastIndexOf(target);
  return start === end;
};

export const replaceOne = (str: string, source: string, target: string) => {
  if (isOnlyOne(str, source)) {
    return str.replace(source, target);
  }
  return str;
};
