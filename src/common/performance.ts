import { performance, PerformanceObserver } from 'perf_hooks';

import { InputFunction } from './error_handling';

const obs = new PerformanceObserver((items) => {
  console.log('execution time:', items.getEntries()[0].duration, 'ms');
  performance.clearMarks();
});
obs.observe({ entryTypes: ['measure'] });

export function createPerformanceObserver(fn: InputFunction): InputFunction {
  return async (req, res) => {
    performance.mark('start');
    await fn(req, res);
    performance.mark('end');
    performance.measure('start to end', 'start', 'end');
  };
}

// performance.mark('A');
// (() => {
//   performance.mark('B');
//   performance.measure('A to B', 'A', 'B');
// })();

// import async_hooks from 'async_hooks';
// import { performance, PerformanceObserver } from 'perf_hooks';

// export function enablePerformance(): void {
//   const set = new Set();
//   const hook = async_hooks.createHook({
//     init(id, type) {
//       if (type === 'Timeout') {
//         performance.mark(`Timeout-${id}-Init`);
//         set.add(id);
//       }
//     },
//     destroy(id) {
//       if (set.has(id)) {
//         set.delete(id);
//         performance.mark(`Timeout-${id}-Destroy`);
//         performance.measure(`Timeout-${id}`, `Timeout-${id}-Init`, `Timeout-${id}-Destroy`);
//       }
//     }
//   });
//   hook.enable();

//   const obs = new PerformanceObserver((list, observer) => {
//     console.log('execution time:', list.getEntries()[0].duration, 'ms');
//     performance.clearMarks();
//     observer.disconnect();
//   });
//   obs.observe({ entryTypes: ['measure'], buffered: true });
// }
