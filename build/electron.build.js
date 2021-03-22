const esbuild = require('esbuild');
const builder = require('electron-builder');
const path = require('path');

const input_dir = path.join(__dirname, '../src/background.ts');
const output_dir = path.join(__dirname, '../dist/main/background.js');

esbuild.build({
  entryPoints: [input_dir],
  bundle: false,
  format: 'cjs',
  platform: 'node',
  define: {
    'process.env.ENV': '\'production\'',
  },
  outfile: output_dir,
}).then(() => {
  build();
});

function build() {
  builder.build({
    targets: builder.Platform.MAC.createTarget(),
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
    },
  });
}
