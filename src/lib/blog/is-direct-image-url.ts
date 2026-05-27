const DIRECT_IMAGE_EXTENSION = /\.(png|jpe?g|gif|webp|svg|avif)(\?|#|$)/i;

const IMAGE_CDN_PATTERN =
  /(?:images\.unsplash\.com|i\.imgur\.com|picsum\.photos|cloudinary\.com\/.*\/image\/upload)/i;

export function isDirectImageUrl(value: string): boolean {
  try {
    const url = new URL(value.trim());
    return DIRECT_IMAGE_EXTENSION.test(url.pathname) || IMAGE_CDN_PATTERN.test(url.href);
  } catch {
    return false;
  }
}
