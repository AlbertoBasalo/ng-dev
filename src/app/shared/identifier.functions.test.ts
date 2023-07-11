import { getNewId, getSlug } from './identifier.functions';

describe('The getNewId function', function () {
  it('should produce hexadecimal strings of 12 chars', function () {
    const actualId = getNewId();
    expect(actualId).toMatch(/^[0-9a-f]+$/);
    expect(actualId.length).toBe(12);
  });
  it('should produce unique ids', function () {
    const oneId = getNewId();
    const otherId = getNewId();
    expect(oneId).not.toBe(otherId);
  });
  it('should produce continuous ids', function () {
    const id1 = getNewId();
    const id2 = getNewId();
    const id3 = getNewId();
    const id4 = getNewId();
    expect(parseInt(id2, 16) - parseInt(id1, 16)).toBe(1);
    expect(parseInt(id3, 16) - parseInt(id2, 16)).toBe(1);
    expect(parseInt(id4, 16) - parseInt(id3, 16)).toBe(1);
  });
  it('should produce up to 16 different each millisecond', function () {
    const actualIds = new Set();
    const MAX_IDS = 16;
    for (let i = 0; i < MAX_IDS; i++) {
      const id = getNewId();
      actualIds.add(id);
    }
    expect(actualIds.size).toBe(MAX_IDS);
  });
  it('should not produce more than 16 different each millisecond', function () {
    const actualIds = new Set();
    const MAX_IDS = 16;
    for (let i = 0; i < MAX_IDS + 1; i++) {
      const id = getNewId();
      actualIds.add(id);
    }
    expect(actualIds.size).toBe(MAX_IDS);
  });
  it('should produce 16 ordered ids in each millisecond', function () {
    // Wait to ensure we are in a new millisecond
    setTimeout(() => null, 1);
    const actualIds = [];
    for (let i = 0; i < 16; i++) {
      const id = getNewId();
      actualIds.push(id);
    }
    const actualFrozenIds = [...actualIds];
    const expectedSortedIds = actualIds.sort();
    expect(actualFrozenIds).toEqual(expectedSortedIds);
  });
});

describe('The getSlug function', function () {
  it('should return a slug string', function () {
    const actualSlug = getSlug('This is a Test');
    expect(typeof actualSlug).toBe('string');
  });
  it('should return a slug with no spaces', function () {
    const actualSlug = getSlug('This is a Test');
    expect(actualSlug).not.toMatch(/\s/);
  });
  it('should return a slug with no invalid chars', function () {
    const actualSlug = getSlug('This is Español 123');
    expect(actualSlug).not.toMatch(/[^a-zA-Z0-9_-]/);
  });
  it('should return the correct slug for each edge cases', function () {
    const SAMPLE_CASES = [
      ['This is a Test 123', 'this_is_a_test_123'],
      ['This is Español', 'this_is_espa-ol'],
      ['This is a Test with spaces', 'this_is_a_test_with_spaces'],
      ['This has inv@lid chars', 'this_has_inv-lid_chars'],
    ];
    SAMPLE_CASES.forEach(([source, expected]) => {
      const actualSlug = getSlug(source);
      expect(actualSlug).toBe(expected);
    });
  });
});
