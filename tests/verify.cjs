const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
let checks = 0;

function assert(condition, message) {
  checks += 1;
  if (!condition) throw new Error(message);
}

const catalogue = [
  'Runnerz Namibia',
  'UNIFIED Music',
  'RightMatch Namibia',
  'Soek.Iets',
  'Fuel retail digital platform',
  'Namibia FinePay',
  'ECC Command',
  'Omutambo Herd Operations',
  'Borizago',
  'Tito On Call',
  'Utuseb Drinks & Delivery',
  'MOHSS AIRMED COMMAND',
  'NamAir Command',
  'NamMar Command',
  'KICKOFF NAM',
  'TPTS Grid',
  'JB.Braids',
  'NAILED & Lashed by Mona',
  'PDM Namibia',
  'E.M.A. Namibia',
  'OSH-Med International',
  'Ontoko Foods',
  'Magic Boys Football Academy',
  'Omwenyo Renal Health Centre',
  'M & L Occupational Safety',
  'Dream High Learning Institute',
  'Stephanie Madl Portfolio',
  'IT Handover Continuance',
  'Career Arc Lab',
  'SolarSpin digital headquarters',
  'Freeman technical portfolio'
];

assert(readme.includes('## I build systems that have to work after the applause.'), 'signature profile heading is missing');
assert(readme.includes('## Current orbit'), 'current orbit is missing');
assert(readme.includes('Technical Director, TPTS Namibia'), 'TPTS must lead the current orbit');
assert(readme.includes('Founder and CEO, SolarSpin Technologies'), 'SolarSpin founder role is missing');
assert(readme.includes('Founder and CEO, Runnerz Namibia'), 'Runnerz founder role is missing');
assert(readme.includes('Co-Founder and CTO, RightMatch Namibia'), 'RightMatch founder role is missing');
assert(readme.includes('## Thirty-one systems. One evidence trail.'), '31-system catalogue heading is missing');
assert(readme.includes('Owned universe · 04 systems'), 'owned-universe count is missing');
assert(readme.includes('Command and operations · 12 systems'), 'command count is missing');
assert(readme.includes('Digital experiences · 11 systems'), 'experience count is missing');
assert(readme.includes('Research and build records · 04 systems'), 'evidence count is missing');
assert(readme.includes('https://github.com/freeman-ipumbu/career-arc-lab-case-study'), 'Career Arc Lab public case study is missing');
assert(readme.includes('Public Atlas'), 'SolarSpin Public Atlas is missing');
assert(readme.includes('Gravity Table'), 'SolarSpin Gravity Table is missing');
assert(readme.includes('TPTS owns the platform'), 'TPTS ownership boundary is missing');
assert(readme.includes('controlled candidates are never described here as public-production releases'.replace('controlled', 'Controlled')), 'Runnerz release boundary is missing');
assert(readme.includes('Built from Windhoek. Tested against reality.'), 'closing signal is missing');
assert(readme.includes('https://www.solarspin-namibia.xyz/'), 'new SolarSpin domain is missing');
assert(!readme.includes('solarspin-namibia.pages.dev'), 'legacy SolarSpin domain remains');
assert(!readme.includes('29 selected') && !readme.includes('29-project'), 'stale 29-project language remains');
assert(!readme.includes('assets/unified-20-command-deck.png'), 'portrait UNIFIED artwork should not be on the open profile surface');
assert(!readme.includes('<<<<<<<') && !readme.includes('>>>>>>>'), 'merge markers detected');

for (const title of catalogue) {
  assert(readme.includes(`**${title}**`), `catalogue entry is missing: ${title}`);
}

const localImages = [...readme.matchAll(/(?:src="|!\[[^\]]*\]\()([^"\)]+)(?:"|\))/g)]
  .map((match) => match[1])
  .filter((ref) => !/^https?:/.test(ref));

assert(new Set(localImages).size >= 5, 'profile needs at least five authentic local visuals');
assert(new Set(localImages).size <= 10, 'profile artwork is becoming visually noisy again');

for (const ref of new Set(localImages)) {
  assert(fs.existsSync(path.join(root, ref)), `missing local image: ${ref}`);
}

assert(readme.length > 15000, 'profile has been flattened too aggressively');
assert(readme.length < 35000, 'profile has returned to an unreadable wall of content');

console.log(`Profile verification passed: ${checks} checks`);
