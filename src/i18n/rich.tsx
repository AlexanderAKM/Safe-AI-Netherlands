import { Fragment, type ReactNode } from "react";

/* Messages carry two kinds of markup, so a translator can move them freely
   inside a sentence without touching code:

     {name}             a value filled in at render time ("Apply by {deadline}.")
     <tag>words</tag>   words the component wraps in something: a link, bold,
                        an animated verb. The tag names mean nothing to the
                        browser; the component decides what each one becomes.

   Tags may hold placeholders and other tags, but not a tag of their own name.
   A tag or placeholder the component did not supply throws, so a broken
   translation fails the build instead of shipping raw markup. */

type Values = Record<string, ReactNode>;
type Tags = Record<string, (chunk: ReactNode, index: number) => ReactNode>;

const TOKEN = /<(\w+)>([\s\S]*?)<\/\1>|\{(\w+)\}/g;

function render(message: string, tags: Tags, values: Values, counts: Map<string, number>): ReactNode[] {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of Array.from(message.matchAll(TOKEN))) {
    const [whole, tag, inner, placeholder] = match;
    const at = match.index ?? 0;
    if (at > last) parts.push(message.slice(last, at));
    if (tag) {
      const wrap = tags[tag];
      if (!wrap) throw new Error(`No renderer for <${tag}> in message: ${message}`);
      const index = counts.get(tag) ?? 0;
      counts.set(tag, index + 1);
      parts.push(
        <Fragment key={at}>{wrap(render(inner, tags, values, counts), index)}</Fragment>,
      );
    } else {
      if (!(placeholder in values)) throw new Error(`No value for {${placeholder}} in message: ${message}`);
      parts.push(<Fragment key={at}>{values[placeholder]}</Fragment>);
    }
    last = at + whole.length;
  }
  if (last < message.length) parts.push(message.slice(last));
  return parts;
}

/** A message with tags and placeholders, as React nodes. `index` counts each
    tag's occurrences, so "the second <verb>" can animate after the first in
    whatever order the translation puts them. */
export function rich(message: string, tags: Tags = {}, values: Values = {}): ReactNode {
  return render(message, tags, values, new Map());
}

/** A message with placeholders only, as a plain string: for attributes,
    metadata, and anywhere React nodes cannot go. */
export function format(message: string, values: Record<string, string | number> = {}): string {
  return message.replace(/\{(\w+)\}/g, (_, name: string) => {
    if (!(name in values)) throw new Error(`No value for {${name}} in message: ${message}`);
    return String(values[name]);
  });
}
