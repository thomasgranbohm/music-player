export type Followers = {
    href: string | null;
    total: number;
}

export type PagingObject<T> = {
    href: string;
    items: Array<T>;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}