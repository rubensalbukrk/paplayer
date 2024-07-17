export default function getFileName(uri: string): string {
    return uri.split('/').pop()?.replace('.mp3', '') || '';
  }