import { useEffect, useState } from 'react';

export const useWebSocket = (url: string) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(url);
        setSocket(ws);

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [url]);

    return socket;
};
