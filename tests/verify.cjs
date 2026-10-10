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

assert(readme.includes('## Current flagship: one Runnerz ecosystem'), 'current flagship section is missing');
assert(readme.includes('Technical Director, TPTS Namibia'), 'TPTS must lead the current command');
assert(readme.includes('assets/finepay-case-study.svg'), 'TPTS-led FinePay proof is missing');
assert(readme.includes('namibia-finepay-case-study'), 'FinePay public evidence links are missing');
assert(readme.includes('Founder and CEO, SolarSpin Technologies'), 'SolarSpin founder identity is missing');
assert(readme.includes('assets/solarspin-company.svg'), 'SolarSpin visual identity is missing');
assert(readme.includes('assets/fuel-retail-platform.svg'), 'fuel-retail case-study artwork is missing');
assert(readme.includes('fuel-retail-digital-platform-case-study'), 'fuel-retail case-study link is missing');
assert(readme.includes('assets/pdm-namibia-hq.png'), 'PDM project banner is missing');
assert(readme.includes('assets/tito-on-call.svg'), 'Tito On Call project banner is missing');
assert(readme.includes('assets/monaluxe-card.webp'), 'Mona Luxe final brand card is missing');
assert(readme.includes('https://monaluxe.pages.dev/'), 'Mona Luxe live experience link is missing');
assert(readme.includes('https://github.com/freeman-ipumbu/monaluxe-case-study'), 'Mona Luxe public case-study link is missing');
assert(readme.includes('Mona Luxe Circle points, rewards and referrals'), 'Mona Luxe retention scope is missing');
assert(readme.includes('private CRM for appointments, payments, client value and retention insight'), 'Mona Luxe owner-system scope is missing');
assert(readme.includes('assets/ecc-command.svg'), 'ECC Command project banner is missing');
assert(readme.includes('assets/rightmatch.png'), 'RightMatch project banner is missing');
assert(readme.includes('assets/kickoff-nam.png'), 'KICKOFF NAM project banner is missing');
assert(readme.includes('assets/omutambo-mark.svg'), 'Omutambo project banner is missing');
assert(readme.includes('RUNNERZ 1.1.0 · code 16'), 'Runnerz version signal is missing');
assert(readme.includes('145 tests each, 0 failures'), 'test signal is missing');
assert(readme.includes('not being presented as public-production releases yet'), 'release boundary is missing');
assert(readme.includes('Exact trails stay local'), 'trail privacy boundary is missing');
assert(readme.includes('UNIFIED 20.0'), 'current UNIFIED release is missing');
assert(readme.includes('version code 22'), 'UNIFIED version-code evidence is missing');
assert(readme.includes('small and growing businesses'), 'RightMatch business pathway is missing');
assert(readme.includes('three-part product story'), 'RightMatch product-story refresh is missing');
assert(readme.includes('transparent owner-income calculator'), 'RightMatch income calculator is missing');
assert(readme.includes('Public bookings, payments and document submission remain gated'), 'RightMatch public transaction boundary is missing');
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

assert(new Set(localImages).size >= 25, 'rich profile artwork has been flattened again');

assert(pngSize('assets/runnerz-1.1.0.png').join('x') === '1600x900', 'Runnerz proof must be 1600x900');
assert(pngSize('assets/unified-20-command-deck.png').join('x') === '1200x2664', 'UNIFIED 20 proof must be 1200x2664');
assert(pngSize('assets/rightmatch.png').join('x') === '1200x630', 'RightMatch proof must be 1200x630');

console.log(`Profile verification passed: ${checks} checks`);
