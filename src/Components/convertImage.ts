export const convertImage = (image: string) => {
    const urlImage = process.env.NEXT_PUBLIC_MINIO + image;
    return urlImage
}