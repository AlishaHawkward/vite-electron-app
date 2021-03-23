const esbuild = require('esbuild');
const builder = require('electron-builder');
const path = require('path');
const fs = require('fs');

const localPkgJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));

const input_dir = path.join(__dirname, '../src/background.ts');
const input_preload = path.join(__dirname, '../src/preload.ts');
const output_dir = path.join(__dirname, '../dist/main/background.js');

esbuild.build({
  entryPoints: [input_dir, input_preload],
  bundle: true,
  format: 'cjs',
  platform: 'node',
  define: {
    'process.env.ENV': '\'production\'',
  },
  outdir: path.join(output_dir, '../'),
  external: Object.keys({
    ...(localPkgJson.dependencies || {}),
    ...(localPkgJson.devDependencies || {}),
    ...(localPkgJson.peerDependencies || {})
  })
}).then(() => {
  build();
});

function build() {
  builder.build({
    config: {
      appId: 'com.youmukonpaku.example',
      productName: 'viteElectronApp',
      copyright: 'YoumuKonpaku',
      files: [
        '!node_modules',
        'dist/main/**',
        'dist/render/**',
      ],
      electronDownload: {
        mirror: 'https://npm.taobao.org/mirrors/electron/',
      },
      asar: false,
    },
  });
}
