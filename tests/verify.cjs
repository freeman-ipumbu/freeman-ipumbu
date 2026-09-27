const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
let checks = 0;

function assert(condition, message) {
  checks += 1;
  if (!condition) throw new Error(message);
}

function pngSize(relativePath) {
  const data = fs.readFileSync(path.join(root, relativePath));
  assert(data.subarray(1, 4).toString('ascii') === 'PNG', `${relativePath} is not a PNG`);
  return [data.readUInt32BE(16), data.readUInt32BE(20)];
}

assert(readme.includes('## Current flagship — one Runnerz ecosystem'), 'current flagship section is missing');
assert(readme.includes('RUNNERZ 1.1.0 · code 16'), 'Runnerz version signal is missing');
assert(readme.includes('145 tests per variant, 0 failures'), 'test signal is missing');
assert(readme.includes('public-store release gates remain tracked work'), 'release boundary is missing');
assert(readme.includes('Exact trails stay local'), 'trail privacy boundary is missing');
assert(readme.includes('UNIFIED 20.0'), 'current UNIFIED release is missing');
assert(readme.includes('version code 21'), 'UNIFIED version-code evidence is missing');
assert(readme.includes('assets/unified-20-command-deck.png'), 'UNIFIED 20 proof image is missing');
assert(readme.includes('assets/runnerz-1.1.0.png'), 'Runnerz proof image is missing');
assert(!readme.includes('src="assets/runnerz.png"'), 'legacy Runnerz image is still referenced');
assert(!readme.includes('<<<<<<<') && !readme.includes('>>>>>>>'), 'merge markers detected');

const localImages = [...readme.matchAll(/(?:src="|!\[[^\]]*\]\()([^"\)]+)(?:"|\))/g)]
  .map((match) => match[1])
  .filter((ref) => !/^https?:/.test(ref));
for (const ref of new Set(localImages)) {
  assert(fs.existsSync(path.join(root, ref)), `missing local image: ${ref}`);
}

assert(pngSize('assets/runnerz-1.1.0.png').join('x') === '1600x900', 'Runnerz proof must be 1600x900');
assert(pngSize('assets/unified-20-command-deck.png').join('x') === '1200x2664', 'UNIFIED 20 proof must be 1200x2664');

console.log(`Profile verification passed: ${checks} checks`);
