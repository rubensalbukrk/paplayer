import getFileName from "./getMusicName";

const transformMusicList = (list: any) => {
    return list.map((item: string, index: number) => ({
      id: index,
      url: item,
      title: `${getFileName(item)}`,
      artist: "Artista Desconhecido",
    }));
  };
  
  export default transformMusicList