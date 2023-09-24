import * as randomstring from 'randomstring';

type StorageType = 'image' | 'video' | 'document';
/**
 * Simulating storing content into filesystem (Local/ s3/ FTP...)
 * @param content String
 */
export const store = (_base64Content: string, type: StorageType): string => {
  const extensions = {
    image: '.png',
    video: '.mp4',
    document: '.pdf',
  };
  const path = randomstring.generate(16);
  const extension = extensions[type];
  return `${path}${extension}`;
};
