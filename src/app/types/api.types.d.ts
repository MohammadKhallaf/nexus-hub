export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

interface ISubapaseREsponse<T> {
  data?: T;
  status: number;
  statusText: string;
}
