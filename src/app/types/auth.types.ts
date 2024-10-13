export interface TProfileRow {
  id: string;
  avatar_url?: string;
  created_at: string;
  first_name?: string;
  is_discoverable?: boolean;
  is_public?: boolean;
  last_name?: string;
  updated_at?: string;
}

export type IProfileUpdate = Partial<Omit<TProfileRow, 'id' | 'created_at' | 'updated_at'>>;
