interface header {
    theme: number;
    color: string;
    logo?: string;
    frame?: string;
    span_one?: string;
    span_two?: string;
}

interface queue {
    theme: number;
    color: string;
    span_one?: string;
    span_two?: string;
}

interface Hero {
    theme: number;
    color: string;
    image?: string;
    frame?: string;
    title?: string;
    subtitle?: string;
    desc?: string;
    cta?: string;
}

export interface Catalog {
    header: header;
    hero: Hero;
    queue: queue;
}