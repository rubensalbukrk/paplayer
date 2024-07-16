import React, { createContext, useState, useContext, ReactNode } from 'react';
// Definir a interface do jogador
interface PlayerProps {
  name: string;
  status: string;
  isPlaying: boolean;
}

// Definir a interface do contexto
interface PlayerContextType {
  player: PlayerProps;
  updatePlayer: (newPlayer: PlayerProps) => void;
}

// Criar o contexto
export const PlayContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [player, setPlayer] = useState<PlayerProps>({
    name: '',
    status: 'Play',
    isPlaying: false,
  });

  const updatePlayer = (newPlayer: PlayerProps) => {
    setPlayer(newPlayer);
  }
   // Valor a ser fornecido para o contexto
   const contextValue: PlayerContextType = {
    player,
    updatePlayer,
  };

  return (
    <PlayContext.Provider value={contextValue}>
    {children}
  </PlayContext.Provider>
  )
}

// Hook personalizado para usar o contexto
export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
