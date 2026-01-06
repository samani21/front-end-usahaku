export interface header {
    theme: number;
    color: string;
    logo?: string;
    frame?: string;
    mode: string;
    span_one?: string;
    span_two?: string;
}

export interface Catalog {
    header: header;
}