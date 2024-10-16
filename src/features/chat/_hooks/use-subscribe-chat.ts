import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import supabase from '@app/configs/supabase';
import type { IMessageRow } from '@types';

const useSubscribeChat = (chatId: string) => {
  const queryClient = useQueryClient();
  const channel = supabase.channel(`chat-${chatId}`);

  useEffect(() => {
    channel
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${chatId}`,
        },
        (payload: { new: IMessageRow }) => {
          queryClient.setQueryData(['message-list', chatId], (data: IMessageRow[] | undefined) => {
            if (!data) return [payload.new];
            return [...data, payload.new];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel).catch((error) => {
        // do nothing
      });
    };
  }, [chatId]);
};

export default useSubscribeChat;
