
export type PaginationWrapper<T> = Readonly<{
  page: number;
  pageCount: number;
  count: number;
  total: number;
  data: T[];
}>;

export type UserPayload = Readonly<{
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}>;

export type QueueItem = Readonly<{
  id: number;
  priority: number;
  user: UserPayload;
}>;

export type QueuePayload = {
  id: number;
  name: string;
  address: string;
  isActive: boolean;
  maxVolume?: number;
  expiresAt?: string;
  items?: ReadonlyArray<QueueItem>;
};