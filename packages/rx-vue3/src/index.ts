import { onUnmounted } from 'vue';
import { Callback, UseFetchOptions, useFetch as useBaseFetch } from 'rx';

export function useFetch(cb: Callback, options: UseFetchOptions) {
  const { autoClear } = options;
  if (options.autoClear) {
    delete options.autoClear;
  }
  const release = useBaseFetch(cb, options);

  console.log('autoClear', autoClear, onUnmounted);
  if (autoClear) {
    onUnmounted(() => {
      release()
      console.log('clear');
    });
  }

  return release;
}