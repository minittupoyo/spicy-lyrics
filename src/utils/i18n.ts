import { isExperimentEnabled } from "./experiments.ts";
import { JA } from "./i18n/ja.ts";

/**
 * Translates a piece of UI text. Text is keyed by its English wording, so a
 * string with no entry (or any string while the Japanese UI experiment is off)
 * is shown as written.
 *
 * Call it where the text is rendered, not where it is defined: the setting
 * definitions stay in English, which is also what search keeps matching.
 */
export function t(text: string): string;
export function t(text: undefined): undefined;
export function t(text: string | undefined): string | undefined;
export function t(text: string | undefined): string | undefined {
  if (text === undefined || !isExperimentEnabled("japaneseUi")) return text;
  return Object.hasOwn(JA, text) ? JA[text] : text;
}
