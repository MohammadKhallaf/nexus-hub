import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { IMessageRow } from '@types';
import { listMessages } from '../_services';

const useListMessage = (
  chatId: string,
  options?: UseQueryOptions<unknown, string, IMessageRow[]>
) => {
  return useQuery({
    queryKey: ['message-list', chatId],
    queryFn: () => listMessages(chatId),
    ...options,
  });
};

export default useListMessage;
