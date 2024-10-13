interface Attachment {
  url: string;
  type: string;
  name: string;
}

export interface IMessageRow {
  id: number;
  receiver_id: string;
  sender_id: string;
  content: string;
  attachments?: Attachment[];
  created_at: string;
  read_at?: string;
}

export type IMessageInsert = Partial<Omit<IMessageRow, 'id' | 'created_at'>>;
export type IMessageUpdate = Partial<Omit<IMessageRow, 'id' | 'created_at'>>;
