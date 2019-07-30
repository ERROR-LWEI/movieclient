
export interface RootState {
    version: string;
}

export interface Response {
    code?: number,
    message?: string,
    type?: string,
    data?: any
}