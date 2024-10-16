import supabase from '@app/configs/supabase';
import store from '@store/index';
import type { IMessageInsert, IMessageRow } from '@types';

export const sendMessage = async (body: IMessageInsert) => {
  const auth = store.getState().auth;

  const { data, error } = await supabase
    .from('messages')
    .insert([{ ...body, sender_id: auth?.user?.id }])
    .select();

  if (error) throw new Error(error.message);

  return data[0] as IMessageRow;
};

export const listMessages = async (chatId: string) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', chatId)
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);

  return data as IMessageRow[];
};
