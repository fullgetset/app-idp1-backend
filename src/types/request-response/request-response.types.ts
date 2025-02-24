import { Request } from 'express';

export type RequestParams<T> = Request<T>;
export type RequestBody<T> = Request<{}, {}, T>;
export type RequestQuery<T> = Request<{},{},{}, T>
