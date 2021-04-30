import { performance, PerformanceObserver } from 'perf_hooks';

const obs = new PerformanceObserver((items) => {
  console.log('execution time:', items.getEntries()[0].duration, 'ms');
  performance.clearMarks();
});
obs.observe({ entryTypes: ['measure'] });

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
