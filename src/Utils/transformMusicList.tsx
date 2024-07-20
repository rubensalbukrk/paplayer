
const transformMusicList = (list: any) => {
    return list.map((item: string, index: number) => ({
      id: index.toString(),
      url: item,
      title: item,
      artist: "Artista Desconhecido",
    }));
  };
  
  export default transformMusicList