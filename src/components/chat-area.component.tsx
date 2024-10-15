import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { INSERT_TABLE_COMMAND, TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { $getRoot, $getSelection, LexicalEditor, type EditorThemeClasses } from 'lexical';
import { MicIcon, MoreVerticalIcon, PhoneIcon, SmileIcon, VideoIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ToolbarPlugin from './input-editor/_plugins/toolbar-plugin';

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
const ChatArea = () => {
  const [editorState, setEditorState] = useState('');
  const [showTable, setShowTable] = useState<boolean>(false);

  function onChange(editorState: { read: (arg0: () => void) => void; toJSON: () => any }) {
    editorState.read(() => {
      const root = $getRoot();
      const selection = $getSelection();
      console.log(root, selection);
    });
    console.log(editorState.toJSON());
  }

  return (
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
        <LexicalComposer initialConfig={initialConfig}>
          <div className="flex items-center space-x-2">
            {/* <Button variant="ghost" size="icon" aria-label="Attach file">
              <PaperclipIcon className="h-5 w-5" />
              </Button> */}
            <div className="flex-grow">
              <ToolbarPlugin />
              <RichTextPlugin
                contentEditable={
                  <ContentEditable className="min-h-[40px] w-full rounded-b-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" />
                }
                placeholder={<div className="text-muted-foreground">Type your message here...</div>}
                ErrorBoundary={LexicalErrorBoundary}
              />
            </div>
            <AutoFocusPlugin />
            <MyOnChangePlugin onChange={onChange} />
            <HistoryPlugin />
            <TablePlugin />
            <Button variant="ghost" size="icon" aria-label="Insert emoji">
              <SmileIcon className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              className="bg-primary text-primary-foreground"
              aria-label="Voice message">
              <MicIcon className="h-5 w-5" />
            </Button>
          </div>
        </LexicalComposer>
      </div>
    </div>
  );
};

export default ChatArea;
