import { Editor } from '@tiptap/react';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import { ImageIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import type { FilePondFile } from 'filepond';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';

registerPlugin(
  FilePondPluginFileRename,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageValidateSize
);
const ImageControl = ({ editor }: { editor: Editor | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [files, setFiles] = useState<FilePondFile[]>([]);

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
          files={files.map((file) => file.file)}
          onupdatefiles={(fileItems) => setFiles(fileItems)}
          allowMultiple={false}
          maxFiles={1}
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
