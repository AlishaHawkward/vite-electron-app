const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');
const child_process = require('child_process');

const localPkgJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));

let electron;
let watch;
let signal;

const input_dir = path.join(__dirname, '../src/background.ts');
const input_preload = path.join(__dirname, '../src/preload.ts');
const output_dir = path.join(__dirname, '../dist/main/background.js');
const common_wait = 1000;

const common_config = {
  entryPoints: [input_dir, input_preload],
  bundle: true,
  format: 'cjs',
  platform: 'node',
  outdir: path.join(output_dir, '../'),
  external: Object.keys({
    ...(localPkgJson.dependencies || {}),
    ...(localPkgJson.devDependencies || {}),
    ...(localPkgJson.peerDependencies || {}),
  }),
};

if (process.env.NODE_ENV === 'production') {
  esbuild.build({
    ...common_config,
    define: {
      'process.env.ENV': '\'production\'',
    },
  });
} else {
  esbuild.build({
    ...common_config,
    define: {
      'process.env.ENV': '\'development\'',
      'process.env.PORT': 3000,
    },
    watch: {
      onRebuild: (err) => {
        if (err) console.err('[ESBuild] Rebuild failed!');
        else {
          restart();
        }
      },
    },
  }).then((res) => {
    // wait for vite-react build.
    setTimeout(() => {
      start();
    }, common_wait);
    watch = res;
  });
}

function start() {
  electron = child_process.spawn('electron', [output_dir]);
  electron.on('exit', () => {
    if (signal === 1 && watch) watch.stop();
  });
  electron.stderr.on('data', (msg) => {
    console.error('[error]', msg.toString());
  });
  electron.stdout.on('data', (msg) => {
    console.log(msg.toString());
  });
  signal = 1;
}

function restart() {
  signal = 0;
  if (electron) electron.kill();
  // prevent signal = 1 stop for watch event.
  setTimeout(() => {
    start();
  }, common_wait);
}
