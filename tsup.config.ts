// import { defineConfig } from 'tsup';

// export default defineConfig({
//   entry: ['src/index.tsx'],
//   format: ['esm', 'cjs'],
//   dts: true,
//   external: ['react'],
//   esbuildOptions(options) {
//     options.define = {
//       'process.env.NODE_ENV': '"production"',
//       'process.browser': '"true"',
//     };
//     options.inject = ['process/browser'];
//     options.plugins = [
//       {
//         name: 'replace-tty',
//         setup(build) {
//           build.onResolve({ filter: /^tty$/ }, () => ({ path: require.resolve('node-noop') }));
//         },
//       },
//     ];
//   },
//   minify: true,
//   sourcemap: true,
//   clean: true,
//   treeshake: true,
// });