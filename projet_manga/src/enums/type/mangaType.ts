export type MangaType = {
    images: {
        jpg: {
            image_url: string,
            large_image_url: string
        }
    },
    title: string,
    type: string,
    status: string,
    published: {
        from: string,
        to: string | null,
        string: string
    },
    score: number,
    rank: string,
    synopsis: string,
    background: string,
    authors: [
        {
            name: string,
        }
    ],
    genres: [
        {
            type: string,
            name: string,
        }
    ],
    themes: [
        {
            type: string,
            name: string
        }
    ],
    serializations: [
        {
            type: string,
            name: string
        }
    ],
    demographics: [
        {
            type: string,
            name: string
        }
    ],
    chapters: number,
    volumes: number,
    members: number
}