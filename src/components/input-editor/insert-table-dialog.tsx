import { useState } from 'react';
import { useEditor, Editor } from '@tiptap/react';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { RichTextEditor } from '@mantine/tiptap';
import { TableIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InsertTableDialogProps {
  editor: Editor | null;
  onClose: () => void;
}

const InsertTableDialog = ({ editor, onClose }: InsertTableDialogProps) => {
  const [rows, setRows] = useState('3');
  const [columns, setColumns] = useState('3');

  const onInsert = () => {
    if (editor) {
      editor
        .chain()
        .focus()
        .insertTable({ rows: parseInt(rows), cols: parseInt(columns), withHeaderRow: true })
        .run();
      onClose();
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <Label htmlFor="rows">Rows</Label>
        <Input
          id="rows"
          type="number"
          min={1}
          value={rows}
          onChange={(e) => setRows(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="columns">Columns</Label>
        <Input
          id="columns"
          type="number"
          min={1}
          value={columns}
          onChange={(e) => setColumns(e.target.value)}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onInsert}>Insert</Button>
      </div>
    </div>
  );
};

const TableControl = ({ editor }: { editor: Editor | null }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!editor) {
    return null;
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
          <TableIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <InsertTableDialog editor={editor} onClose={() => setIsOpen(false)} />
      </PopoverContent>
    </Popover>
  );
};

export default TableControl;
