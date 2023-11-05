export const useDebounceFn = (fn, delay) => {
  let timeoutId = null
  const debouncedFn = (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
  return debouncedFn
}
