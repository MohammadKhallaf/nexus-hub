import { MantineProvider } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';

import { BubbleMenu, useEditor, type JSONContent } from '@tiptap/react';
import { SendIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSendMessage } from '@/features/chat/_hooks';
import { uploadImageToChat } from '@/features/chat/_services/upload-image.services';
import { addMessage } from '@actions';
import { useAppDispatch } from '@hooks';
import extensions from './extensions';
import InsertTableDialog from './insert-table-dialog';

import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';

const InputEditor = () => {
  const dispatch = useAppDispatch();

  const [attachments, setAttachments] = useState<Record<string, File>>({});

  const { mutate: sendMessage } = useSendMessage((import.meta.env.VITE_CHAT_ID as string) ?? '');

  const editor = useEditor({
    autofocus: true,

    extensions,
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none',
      },
    },

    content: '',
    onDrop: (event) => {
      event.preventDefault();
      const { files } = event.dataTransfer!;
      if (files?.length > 0) {
        const imageUrl = URL.createObjectURL(files[0]);
        editor?.chain().focus().setImage({ src: imageUrl }).run();
        setAttachments((attachments) => ({ ...attachments, [imageUrl]: files[0] }));
      }
    },

    onPaste: (event) => {
      event.preventDefault();
      const text = event.clipboardData?.getData('text/plain');
      if (text) {
        editor?.chain().focus().insertContent(text).run();
      }

      const image = event.clipboardData?.files[0];
      if (image?.type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(image);
        setAttachments((attachments) => ({ ...attachments, [imageUrl]: image }));

        editor?.chain().focus().setImage({ src: imageUrl }).run();
      }
    },
  });

  const onSend = async () => {
    if (editor) {
      editor.commands.focus('end');

      const messageJson = editor.getJSON();
      // for each image , upload to supabase, and replace image url with public url

      let JSONMessage = JSON.stringify(messageJson);

      //  for each key in the attachments,replace the image url with public url

      for (const key in attachments) {
        const image = attachments[key];

        const publicUrl = await uploadImageToChat(import.meta.env.VITE_CHAT_ID as string, image);
        JSONMessage = JSONMessage.replace(key, publicUrl);
      }

      dispatch(addMessage(messageJson));
      sendMessage({
        content: JSON.parse(JSONMessage) as JSONContent,
      });
      editor.commands.clearContent();
    }
  };

  return (
    <MantineProvider>
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
            {/* 
      <RichTextEditor.ControlsGroup>
        <RichTextEditor.H1 />
        <RichTextEditor.H2 />
        <RichTextEditor.H3 />
        <RichTextEditor.H4 />
      </RichTextEditor.ControlsGroup> */}

            {/* <RichTextEditor.ControlsGroup>
        <RichTextEditor.Blockquote />
        <RichTextEditor.Hr />
        <RichTextEditor.BulletList />
        <RichTextEditor.OrderedList />
        <RichTextEditor.Subscript />
        <RichTextEditor.Superscript />
      </RichTextEditor.ControlsGroup> */}

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>
            {/* 
      <RichTextEditor.ControlsGroup>
        <RichTextEditor.AlignLeft />
        <RichTextEditor.AlignCenter />
        <RichTextEditor.AlignJustify />
        <RichTextEditor.AlignRight />
      </RichTextEditor.ControlsGroup> */}

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Undo />
              <RichTextEditor.Redo />
            </RichTextEditor.ControlsGroup>
            <RichTextEditor.ControlsGroup>
              <InsertTableDialog editor={editor} />
              {/* <ImageControl editor={editor} /> */}
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>
          <div className="flex flex-row items-baseline justify-center gap-2 p-2">
            <ScrollArea className={'h-16 max-w-full flex-grow'}>
              <RichTextEditor.Content className="flex-grow" />
            </ScrollArea>
            <Button
              className="mt-auto p-3"
              onClick={() => {
                onSend().catch((_) => {
                  // ignore
                });
              }}>
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
        </RichTextEditor>
      </div>
    </MantineProvider>
  );
};

export default InputEditor;
