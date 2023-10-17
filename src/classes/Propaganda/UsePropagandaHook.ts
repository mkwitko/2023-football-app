import { getCache, setCache } from './../../services/Cache';
import { useState } from 'react';

export default function usePropagandaHook() {
    const [data, setData] = useState<any>(getCache('covenants') || []);
    const [current, setCurrent] = useState<any>(null);

    const handleSetCurrent = (current: any) => {
        setCurrent(current);
        setCache('currentCovenants', current);
    }

    const getCurrent = () => {
        return current ? current : getCache('currentCovenants');
    }

    return {
        data,
        setData,
        current,
        setCurrent,
        handleSetCurrent,
        getCurrent,
    };
}
