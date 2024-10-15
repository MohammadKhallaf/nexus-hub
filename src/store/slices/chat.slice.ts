import { createSlice, type PayloadAction, type Slice } from '@reduxjs/toolkit';
import { type JSONContent } from '@tiptap/react';

export interface IChat {
  chatId: string;
  type: 'one-to-one' | 'group';
  messages: JSONContent[];
}

const initialState: IChat = {
  chatId: '',
  type: 'one-to-one',
  messages: [],
};

const chatSlice: Slice<IChat> = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IChat['messages'][0]>) => {
      state.messages.push(action.payload);
    },
  },
});

export default chatSlice;
