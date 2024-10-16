import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import type { IMessageInsert, IMessageRow } from '@types';
import { sendMessage } from '../_services';

const useSendMessage = (
  chatId: string,
  options?: UseMutationOptions<IMessageRow, string, IMessageInsert, unknown>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['message-send', chatId],

    mutationFn: (body: Omit<IMessageInsert, 'chat_id'>) =>
      sendMessage({ ...body, chat_id: chatId }),

    onSuccess(data, variables, context) {
      queryClient.refetchQueries({ queryKey: ['message-list', chatId] }).catch(() => {
        //
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export default useSendMessage;
