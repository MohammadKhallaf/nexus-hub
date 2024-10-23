import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { REALTIME_CHANNEL_STATES } from '@supabase/supabase-js';
import supabase from '@app/configs/supabase';
import type { IMessageRow } from '@types';

const useSubscribeChat = (chatId: string) => {
  const queryClient = useQueryClient();
  const channel = supabase.channel(`chat-${chatId}`);

  useEffect(() => {
    if (channel.state === REALTIME_CHANNEL_STATES.joined) return;
    const subscription = channel
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${chatId}`,
        },
        (payload: { new: IMessageRow }) => {
          console.log('Updated');
          queryClient.setQueryData(['message-list', chatId], (data: IMessageRow[] | undefined) => {
            if (!data) return [payload.new];
            return [...data, payload.new];
          });
        }
      )
      .subscribe();

    return () => {
      subscription
        .unsubscribe()
        .then(() => console.log('unsubscribed'))
        .catch(console.error);
    };
  }, [chatId]);
};

export default useSubscribeChat;
