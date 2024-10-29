await Bun.build({
  entrypoints: ['client.tsx'],
  // external: ['react', 'react-dom'],
  outdir: 'public',
  format: 'esm',
  minify: true,
  target: 'browser',
  sourcemap: 'inline',
  experimentalCss: true,
});
