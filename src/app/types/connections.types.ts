export enum EConnectionStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  BLOCKED = 'blocked',
}

export interface IConnectionRow {
  id: string;
  created_at: string;
  status?: EConnectionStatus;
  user_id1?: string;
  user_id2?: string;
}

export interface IConnectionInsert extends Partial<Omit<IConnectionRow, 'id' | 'created_at'>> {
  id?: string;
}

export type IConnectionUpdate = Partial<Omit<IConnectionRow, 'id' | 'created_at'>>;
