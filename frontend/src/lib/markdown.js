import remarkParser from 'remark-parse';
// import blockElements from 'remark-parse/lib/block-elements.json';
import inspect from 'unist-util-inspect';
import subSupParser from 'remark-sub-super';
import reactRenderer from 'remark-react';
import unified from 'unified';
import gh from 'hast-util-sanitize/lib/github';
import merge from 'lodash.merge';
import visit from 'unist-util-visit';
import externalLinks from 'remark-external-links';
import refractor from 'refractor/core';
import lang_markdown from 'refractor/lang/markdown';
import lang_bash from 'refractor/lang/bash';
import lang_sql from 'refractor/lang/sql';
import lang_python from 'refractor/lang/python';
import lang_ruby from 'refractor/lang/ruby';
import lang_jsx from 'refractor/lang/jsx';

refractor.register(lang_markdown);
refractor.register(lang_bash);
refractor.register(lang_sql);
refractor.register(lang_python);
refractor.register(lang_ruby);
refractor.register(lang_jsx);

const schema = merge(gh, {
  tagNames: ['span', 'hr'],
  attributes: { '*': ['className'] }
});

function markdownToJsx(markdown) {
  const processor = unified()
    .use(remarkParser, {
      commonmark: true
    })
    .use(externalLinks, { target: false, rel: ['nofollow'] })
    // .use(processRuby)
    .use(subSupParser)
    .use(remarkRefractor)
    .use(reactRenderer, {
      clean: false,
      sanitize: schema
    });
  const tree = unified()
    .use(remarkParser, {
      commonmark: true
    })
    .use(subSupParser)
    .use(externalLinks, { target: false, rel: ['nofollow'] })
    .parse(markdown);
  console.log(inspect(tree));
  return processor.processSync(markdown).contents;
}

// function processRuby() {
//   function visitor(node) {
//     console.log(node);
//   }

//   return ast => visit(ast, 'html', visitor);
// }

function remarkRefractor({ include, exclude } = {}) {
  function visitor(node) {
    const { lang } = node;
    if (
      !lang ||
      (include && include.includes(lang)) ||
      (exclude && !exclude.includes(lang))
    ) {
      return;
    }

    let { data, value = '' } = node;

    if (!data) {
      node.data = data = {};
    }

    try {
      data.hChildren = refractor.highlight(value, lang);
    } catch (err) {
      data.hChildren = refractor.highlight(value, 'clike');
    }
    data.hProperties = data.hProperties || {};
    data.hProperties.className = [
      ...(data.hProperties.className || []),
      `language-${lang}`
    ];
  }

  // TODO: visit parent pre and add a class!
  return ast => visit(ast, 'code', visitor);
}

export { markdownToJsx };
