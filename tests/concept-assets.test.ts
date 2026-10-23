import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

// The supplied concept pixels are immutable design inputs, independent of financial content.
test('all fifteen concept plates retain their received bytes and native dimensions', () => {
  const manifest = JSON.parse(readFileSync(new URL('../design/concept-study/asset-manifest.json', import.meta.url), 'utf8'));
  assert.equal(manifest.entries.length, 15);
  assert.equal(new Set(manifest.entries.map((entry: { file: string }) => entry.file)).size, 15);
  for (const entry of manifest.entries) {
    const bytes = readFileSync(new URL(`../public/assets/concept-study/${entry.file}`, import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), entry.sha256, entry.file);
    assert.equal(bytes.length, entry.bytes, entry.file);
    assert.equal(bytes.subarray(1, 4).toString(), 'PNG');
    assert.equal(bytes.readUInt32BE(16), 1672);
    assert.equal(bytes.readUInt32BE(20), 941);
  }
});
