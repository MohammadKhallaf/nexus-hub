import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_TABLE_COMMAND } from '@lexical/table';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  onClose: () => void;
}

const InsertTableDialog = ({ onClose }: Props) => {
  const [editor] = useLexicalComposerContext();
  const [rows, setRows] = useState('3');
  const [columns, setColumns] = useState('3');

  const onInsert = () => {
    editor.dispatchCommand(INSERT_TABLE_COMMAND, { rows, columns });
    onClose();
  };

  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <Label htmlFor="rows">Rows</Label>
        <Input
          min="1"
          id="rows"
          type="number"
          value={rows}
          onChange={(e) => setRows(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="columns">Columns</Label>
        <Input
          min="1"
          id="columns"
          type="number"
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

export default InsertTableDialog;
