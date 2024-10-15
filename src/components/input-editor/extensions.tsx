import CharacterCount from '@tiptap/extension-character-count';
import Dropcursor from '@tiptap/extension-dropcursor';
import Highlight from '@tiptap/extension-highlight';
import TiptapImage from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import ImageResize from 'tiptap-extension-resize-image';
import { type Extensions } from '@tiptap/react';

const editorExtensions = [
  StarterKit,
  Underline,
  Link,
  Superscript,
  SubScript,
  Highlight,
  CharacterCount.configure({
    limit: 200,
  }),
  Placeholder.configure({ placeholder: 'Enter your message ...' }),
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  ImageResize.configure({ inline: true }),
  Table.configure({
    resizable: true,
    HTMLAttributes: {
      class: 'border-collapse table-auto w-full',
    },
  }),
  TableRow.configure({
    HTMLAttributes: {
      class: 'border-b dark:border-gray-700',
    },
  }),
  TableHeader.configure({
    HTMLAttributes: {
      class: 'border-b dark:border-gray-700',
    },
  }),
  TableCell.configure({
    HTMLAttributes: {
      class: 'border border-gray-200 dark:border-gray-700 p-2',
    },
  }),
] satisfies Extensions;

export default editorExtensions;
