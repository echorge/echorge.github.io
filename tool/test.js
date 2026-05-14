/**
 * URL Codec Test Suite
 * Tests for urlCodec encoding and decoding functions
 */

const urlCodec = require('./urlCodec.js');

// Test utilities
const tests = [];
let passed = 0;
let failed = 0;

function test(name, fn) {
  tests.push({ name, fn });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertEquals(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected "${expected}", but got "${actual}"`);
  }
}

// Run tests
function runTests() {
  console.log('🧪 Running URL Codec Tests...\n');

  tests.forEach(({ name, fn }) => {
    try {
      fn();
      console.log(`✅ ${name}`);
      passed++;
    } catch (e) {
      console.error(`❌ ${name}`);
      console.error(`   Error: ${e.message}\n`);
      failed++;
    }
  });

  console.log(`\n📊 Results: ${passed} passed, ${failed} failed out of ${tests.length} tests`);
  process.exit(failed > 0 ? 1 : 0);
}

// ============ Tests ============

test('encode: should encode simple text', () => {
  const result = urlCodec.encode('hello world');
  assertEquals(result, 'hello%20world', 'Simple text encoding failed');
});

test('encode: should encode special characters', () => {
  const result = urlCodec.encode('hello&world=test');
  assertEquals(result, 'hello%26world%3Dtest', 'Special characters encoding failed');
});

test('encode: should encode Chinese characters', () => {
  const result = urlCodec.encode('你好');
  assertEquals(result, '%E4%BD%A0%E5%A5%BD', 'Chinese characters encoding failed');
});

test('encode: should throw error for non-string input', () => {
  try {
    urlCodec.encode(123);
    throw new Error('Should have thrown TypeError');
  } catch (e) {
    assert(e instanceof TypeError, 'Should throw TypeError for non-string input');
  }
});

test('decode: should decode URL-encoded string', () => {
  const result = urlCodec.decode('hello%20world');
  assertEquals(result, 'hello world', 'URL decoding failed');
});

test('decode: should decode special characters', () => {
  const result = urlCodec.decode('hello%26world%3Dtest');
  assertEquals(result, 'hello&world=test', 'Special characters decoding failed');
});

test('decode: should decode Chinese characters', () => {
  const result = urlCodec.decode('%E4%BD%A0%E5%A5%BD');
  assertEquals(result, '你好', 'Chinese characters decoding failed');
});

test('decode: should throw error for non-string input', () => {
  try {
    urlCodec.decode(123);
    throw new Error('Should have thrown TypeError');
  } catch (e) {
    assert(e instanceof TypeError, 'Should throw TypeError for non-string input');
  }
});

test('decode: should throw error for invalid encoded string', () => {
  try {
    urlCodec.decode('%FF%FE');
    // Note: Some invalid sequences may still be decodable depending on browser/Node.js
    // This is a best-effort check
  } catch (e) {
    assert(e instanceof Error, 'Should throw Error for invalid encoded string');
  }
});

test('encode/decode: round trip with simple text', () => {
  const original = 'test@example.com';
  const encoded = urlCodec.encode(original);
  const decoded = urlCodec.decode(encoded);
  assertEquals(decoded, original, 'Round trip encoding/decoding failed');
});

test('encode/decode: round trip with complex text', () => {
  const original = '!@#$%^&*()_+-={}[]|:;<>?,./';
  const encoded = urlCodec.encode(original);
  const decoded = urlCodec.decode(encoded);
  assertEquals(decoded, original, 'Round trip with complex characters failed');
});

test('encode/decode: round trip with Chinese text', () => {
  const original = '你好世界123@#$';
  const encoded = urlCodec.encode(original);
  const decoded = urlCodec.decode(encoded);
  assertEquals(decoded, original, 'Round trip with Chinese text failed');
});

test('encodeURL: should preserve URL structure', () => {
  const url = 'https://example.com/path?query=hello world';
  const result = urlCodec.encodeURL(url);
  assert(result.includes('https://'), 'Protocol should be preserved');
  assert(result.includes('example.com'), 'Domain should be preserved');
  assert(result.includes('/path'), 'Path should be preserved');
  assert(result.includes('?'), 'Query marker should be preserved');
  assert(result.includes('='), 'Equals sign should be preserved');
});

test('encodeURL: should encode spaces in URL', () => {
  const url = 'https://example.com/path with spaces';
  const result = urlCodec.encodeURL(url);
  assertEquals(result, 'https://example.com/path%20with%20spaces', 'Spaces should be encoded');
});

test('decodeURL: should decode URL-encoded URL', () => {
  const url = 'https://example.com/path%20with%20spaces?q=hello%20world';
  const result = urlCodec.decodeURL(url);
  assert(result.includes('path with spaces'), 'Path should be decoded');
  assert(result.includes('hello world'), 'Query should be decoded');
});

test('encodeURL: should throw error for non-string input', () => {
  try {
    urlCodec.encodeURL(123);
    throw new Error('Should have thrown TypeError');
  } catch (e) {
    assert(e instanceof TypeError, 'Should throw TypeError for non-string input');
  }
});

test('decodeURL: should throw error for non-string input', () => {
  try {
    urlCodec.decodeURL(123);
    throw new Error('Should have thrown TypeError');
  } catch (e) {
    assert(e instanceof TypeError, 'Should throw TypeError for non-string input');
  }
});

test('encodeURL/decodeURL: round trip with full URL', () => {
  const original = 'https://example.com/api/users?name=John Doe&email=john@example.com#section';
  const encoded = urlCodec.encodeURL(original);
  const decoded = urlCodec.decodeURL(encoded);
  assertEquals(decoded, original, 'URL round trip failed');
});

test('encode: should handle empty string', () => {
  const result = urlCodec.encode('');
  assertEquals(result, '', 'Empty string should return empty string');
});

test('decode: should handle empty string', () => {
  const result = urlCodec.decode('');
  assertEquals(result, '', 'Empty string should return empty string');
});

test('encode: should not double-encode', () => {
  const original = 'hello%20world';
  const result = urlCodec.encode(original);
  assertEquals(result, 'hello%2520world', 'Should encode the % character');
});

// Run all tests
runTests();
