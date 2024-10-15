import ImageResize from 'tiptap-extension-resize-image';
// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';

import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

// Register the plugins
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_TABLE_COMMAND, TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { MantineProvider } from '@mantine/core';
import { Link, RichTextEditor } from '@mantine/tiptap';
import CharacterCount from '@tiptap/extension-character-count';
import Dropcursor from '@tiptap/extension-dropcursor';
import Highlight from '@tiptap/extension-highlight';
import TiptapImage from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { BubbleMenu, Editor, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { $getRoot, $getSelection, LexicalEditor, type EditorThemeClasses } from 'lexical';
import { ImageIcon, MoreVerticalIcon, PhoneIcon, VideoIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import InsertTableDialog from './input-editor/_plugins/insert-table-dialog';

import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';

registerPlugin(
  FilePondPluginFileRename,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageValidateSize
);

const theme: EditorThemeClasses = {
  ltr: 'ltr',
  rtl: 'rtl',
  placeholder: 'text-muted-foreground',
  paragraph: 'mb-2',
  quote: 'border-l-4 border-gray-200 pl-4 italic',
  heading: {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-bold',
    h4: 'text-xl font-bold',
    h5: 'text-lg font-bold',
    h6: 'font-bold',
  },
  list: {
    nested: {
      listitem: 'list-none',
    },
    ol: 'list-decimal pl-5 mb-2',
    ul: 'list-disc pl-5 mb-2',
    listitem: 'mb-1',
  },
  image: 'inline-block',
  link: 'text-blue-500 underline',
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    underlineStrikethrough: 'underline line-through',
  },
  code: 'bg-gray-100 rounded-md p-1 font-mono text-sm',
  codeHighlight: {
    atrule: 'text-blue-500',
    attr: 'text-purple-500',
    boolean: 'text-red-500',
    builtin: 'text-cyan-500',
    cdata: 'text-gray-500',
    char: 'text-green-500',
    class: 'text-yellow-500',
    'class-name': 'text-yellow-500',
    comment: 'text-gray-500 italic',
    constant: 'text-pink-500',
    deleted: 'text-red-500',
    doctype: 'text-gray-500',
    entity: 'text-yellow-500',
    function: 'text-blue-500',
    important: 'text-red-500',
    inserted: 'text-green-500',
    keyword: 'text-purple-500',
    namespace: 'text-yellow-500',
    number: 'text-cyan-500',
    operator: 'text-yellow-500',
    prolog: 'text-gray-500',
    property: 'text-cyan-500',
    punctuation: 'text-gray-500',
    regex: 'text-red-500',
    selector: 'text-green-500',
    string: 'text-green-500',
    symbol: 'text-pink-500',
    tag: 'text-red-500',
    url: 'text-blue-500',
    variable: 'text-yellow-500',
  },
  table: 'border-collapse border border-gray-300',
  tableCell: 'border border-gray-300 p-2 min-w-[5rem]',
  tableRow: 'border-b border-gray-300',
  tableCellHeader: 'bg-gray-100 font-bold',
};

const $updateEditorState = (editor: LexicalEditor) => {
  editor.dispatchCommand(INSERT_TABLE_COMMAND, {
    columns: String(3),
    includeHeaders: true,
    rows: String(3),
  });
};

function onError(error: any) {
  console.error(error);
}

const initialConfig = {
  namespace: 'MyEditor',
  theme,
  nodes: [TableNode, TableCellNode, TableRowNode],
  onError,
};

function MyOnChangePlugin({ onChange }: { onChange: (editorState: any) => void }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}

const ImageControl = ({ editor }: { editor: Editor | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [files, setFiles] = useState([]);

  const insertImage = useCallback(() => {
    const imageUrl = URL.createObjectURL(files[0].file);
    console.log(imageUrl);
    if (editor && files.length) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      setIsOpen(false);
    }
  }, [editor, files]);

  if (!editor) {
    return null;
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
          <ImageIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <FilePond
          files={files}
          onupdatefiles={setFiles}
          allowMultiple={false}
          maxFiles={1}
          server={false}
        />
        <div className="space-y-4 p-4">
          <div className="space-y-2">
            <Label htmlFor="image-url">Image URL</Label>
            <Input
              id="image-url"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={insertImage}>Insert Image</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const ChatArea = () => {
  const [editorState, setEditorState] = useState('');
  const [showTable, setShowTable] = useState<boolean>(false);
  const editor = useEditor({
    autofocus: true,
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      Dropcursor,
      CharacterCount.configure({
        limit: 200,
      }),
      Placeholder.configure({ placeholder: 'Enter your message ...' }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TiptapImage.configure({ inline: true }),
      ImageResize,
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
    ],
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none',
      },
    },

    content: '',
  });
  function onChange(editorState: { read: (arg0: () => void) => void; toJSON: () => any }) {
    editorState.read(() => {
      const root = $getRoot();
      const selection = $getSelection();
      console.log(root, selection);
    });
    console.log(editorState.toJSON());
  }

  return (
    <MantineProvider>
      <div className="flex flex-grow flex-col rounded-l-lg shadow-lg">
        <div className="flex items-center justify-between rounded-tl-lg border-b bg-white p-4">
          <div className="flex items-center">
            <Avatar className="mr-3">
              <AvatarImage src="/anil-avatar.jpg" alt="Anil" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">Anil</h2>
              <p className="text-sm text-muted-foreground">Online - Last seen, 2:02pm</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" aria-label="Phone call">
              <PhoneIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Video call">
              <VideoIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="More options">
              <MoreVerticalIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <ScrollArea className="flex-grow p-4">
          <div className="space-y-4">
            <div className="flex flex-col items-start">
              <div className="max-w-[70%] rounded-lg bg-secondary p-3">
                <p>Hey There!</p>
              </div>
              <span className="mt-1 text-xs text-muted-foreground">Today, 8:30pm</span>
            </div>
            <div className="flex flex-col items-end">
              <div className="max-w-[70%] rounded-lg bg-primary p-3 text-primary-foreground">
                <p>Hello!</p>
              </div>
              <span className="mt-1 text-xs text-muted-foreground">Today, 8:33pm</span>
            </div>
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <RichTextEditor editor={editor}>
            {editor && (
              <BubbleMenu editor={editor}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Link />
                </RichTextEditor.ControlsGroup>
              </BubbleMenu>
            )}
            <RichTextEditor.Toolbar sticky stickyOffset={60} className="border-b">
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
                <RichTextEditor.Subscript />
                <RichTextEditor.Superscript />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignJustify />
                <RichTextEditor.AlignRight />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Undo />
                <RichTextEditor.Redo />
              </RichTextEditor.ControlsGroup>
              <RichTextEditor.ControlsGroup>
                <InsertTableDialog editor={editor} /> <ImageControl editor={editor} />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content />
          </RichTextEditor>
        </div>
      </div>
    </MantineProvider>
  );
};

export default ChatArea;
