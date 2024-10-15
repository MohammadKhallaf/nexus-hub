import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
  type ElementFormatType,
  type TextFormatType,
} from 'lexical';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Redo,
  Strikethrough,
  Table,
  Underline,
  Undo,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import InsertTableDialog from './insert-table-dialog';
import ToolbarButton from './toolbar-button.atom';

const lowPriority = 1;
const initialFormat = {
  isBold: false,
  isItalic: false,
  isUnderline: false,
  isStrikethrough: false,
};

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const [format, setFormat] = useState(initialFormat);

  const [isTableDialogOpen, setIsTableDialogOpen] = useState(false);

  const formatSelection = (format: TextFormatType) =>
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);

  const alignSelection = (align: ElementFormatType) =>
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, align);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection))
      setFormat({
        isBold: selection.hasFormat('bold'),
        isItalic: selection.hasFormat('italic'),
        isUnderline: selection.hasFormat('underline'),
        isStrikethrough: selection.hasFormat('strikethrough'),
      });
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        lowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        lowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        lowPriority
      )
    );
  }, [editor, $updateToolbar]);

  return (
    <div className="flex items-center space-x-1 rounded-t-md border border-b-0 border-input bg-muted/20 p-1">
      <ToolbarButton
        tip="Undo"
        icon={Undo}
        disabled={!canUndo}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
      />

      <ToolbarButton
        tip="Redo"
        icon={Redo}
        disabled={!canRedo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
      />

      <Separator orientation="vertical" className="h-6" />

      <ToolbarButton
        tip="Format Bold"
        icon={Bold}
        active={format.isBold}
        onClick={() => formatSelection('bold')}
      />

      <ToolbarButton
        tip="Format Italics"
        icon={Italic}
        active={format.isItalic}
        onClick={() => formatSelection('italic')}
      />

      <ToolbarButton
        tip="Format Underline"
        icon={Underline}
        active={format.isUnderline}
        onClick={() => formatSelection('underline')}
      />

      <ToolbarButton
        tip="Format Strikethrough"
        icon={Strikethrough}
        active={format.isStrikethrough}
        onClick={() => formatSelection('strikethrough')}
      />

      <Separator orientation="vertical" className="h-6" />
      <ToolbarButton tip="Left Align" icon={AlignLeft} onClick={() => alignSelection('left')} />
      <ToolbarButton
        tip="Center Align"
        icon={AlignCenter}
        onClick={() => alignSelection('center')}
      />
      <ToolbarButton tip="Right Align" icon={AlignRight} onClick={() => alignSelection('right')} />
      <ToolbarButton
        tip="Justify Align"
        icon={AlignJustify}
        onClick={() => alignSelection('justify')}
      />

      <Separator orientation="vertical" className="h-6" />

      <Popover open={isTableDialogOpen} onOpenChange={setIsTableDialogOpen}>
        <PopoverTrigger>
          <ToolbarButton tip="Insert Table" icon={Table} />
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <InsertTableDialog onClose={() => setIsTableDialogOpen(false)} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
