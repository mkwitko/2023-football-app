import { getCache } from '../../services/Cache';
import { useState } from 'react';

export default function useWalletHook() {
    const [data, setData] = useState<any>(getCache('wallets') || []);
    return {
        data,
        setData,
    };
}
