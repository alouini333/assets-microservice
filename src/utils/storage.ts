import * as randomstring from 'randomstring';

/**
 * Simulating storing content into filesystem (Local/ s3/ FTP...)
 * @param content Buffer
 */
export const store = (_content: Buffer): string => {
    return randomstring.generate(16);
} 