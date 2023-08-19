import { getCache } from './../../services/Cache';
import { useState } from 'react';

export default function useNotificacoesHook() {
  const [data, setData] = useState<any>(getCache('Notificacoes') || []);

  return {
    data,
    setData,
  };
}
