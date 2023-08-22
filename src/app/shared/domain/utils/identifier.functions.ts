/**
 * Generates a new hexadecimal id
 * based on the current timestamp and a counter
 * Allows 16 unique ids per millisecond.
 * @param size the size of the id to generate (default: 12)
 * @returns a new id
 */
export function getNewId(size = 12): string {
  const millisecond = getMillisecond();
  const counter = getNextCounter();
  return formatId(millisecond, counter, size);
}
const CURRENT_EPOCH = new Date(2020, 0, 1).getTime();
const BASE = 16;
let counter = -1;
let lastMillisecond = 0;

function getMillisecond(): number {
  const millisecond = Date.now() - CURRENT_EPOCH;
  if (millisecond !== lastMillisecond) {
    counter = -1;
    lastMillisecond = millisecond;
  }
  return millisecond;
}
function getNextCounter(): number {
  if (counter >= BASE - 1) {
    counter = -1;
  }
  counter++;
  return counter;
}
function formatId(millisecond: number, counter: number, size: number): string {
  const newId = millisecond.toString(BASE) + counter.toString(BASE);
  return newId.padStart(size, '0');
}

/**
 * Generates a slug (a_valid_url) from a given string
 * @param source
 * @returns the_slug
 */
export function getSlug(source: string): string {
  const cleanCase = source.trim().toLowerCase();
  const noSpaces = replaceSpacesWithSubs(cleanCase);
  const noInvalidChars = replaceInvalidCharsWithHyphens(noSpaces);
  return noInvalidChars;
}

function replaceSpacesWithSubs(source: string) {
  return source.replace(/\s+/g, '_');
}
function replaceInvalidCharsWithHyphens(source: string) {
  return source.replace(/[^a-zA-Z0-9_-]/g, '-');
}
