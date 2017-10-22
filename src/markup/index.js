import marked from 'marked';

marked.setOptions({ gfm: true, tables: true });

export default function (input) {
  return marked(input);
}
