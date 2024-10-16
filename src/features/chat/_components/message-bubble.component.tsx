import { EditorContent, useEditor } from '@tiptap/react';
import { motion } from 'framer-motion';
import { DateTime } from 'luxon';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import editorExtensions from '@components/input-editor/extensions';
import { useAuthSelector } from '@store/selectors';
import type { IMessageRow } from '@types';

const MessageBubble = forwardRef<HTMLDivElement, IMessageRow & { index: number }>(
  ({ content, created_at, sender_id, read_at, index }, ref) => {
    const { user } = useAuthSelector()!;

    const isCurrentUserMessage = sender_id === user?.id;

    const editor = useEditor({
      extensions: editorExtensions,
      content: content,
      editable: false,
    });

    const bubbleVariants = {
      hidden: {
        opacity: 0,
        y: 20,
        scale: 0.8,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.3,
          ease: 'easeOut',
        },
        delay: index * 2,
      },
      exit: {
        opacity: 0,
        scale: 0.8,
        transition: {
          duration: 0.2,
        },
      },
    };

    return (
      <motion.div
        className={cn('mb-4 flex', isCurrentUserMessage ? 'justify-end' : 'justify-start')}
        initial="hidden"
        animate="visible"
        exit="exit"
        layout
        ref={ref}
        variants={bubbleVariants}
        transition={{ type: 'spring', stiffness: 500, damping: 30, delay: index * 2 }}>
        <motion.div
          className={cn(
            'max-w-[70%] rounded-lg p-3 shadow-md',
            isCurrentUserMessage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800',
            'transition-shadow duration-300 hover:shadow-lg'
          )}>
          <div className="tiptap-content mb-2">
            <EditorContent editor={editor} readOnly />
          </div>{' '}
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs opacity-75">{DateTime.fromISO(created_at).toRelative()}</span>
            {isCurrentUserMessage && read_at && (
              <motion.span
                className="ml-2 text-xs opacity-75"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}>
                Read {DateTime.fromISO(read_at).toRelative()}
              </motion.span>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  }
);

MessageBubble.displayName = 'MessageBubble';

export default MessageBubble;
