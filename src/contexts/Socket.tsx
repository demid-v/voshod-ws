import {
  createContext,
  type FC,
  type ReactNode,
  useEffect,
  useContext,
  useState,
} from "react";

const SocketContext = createContext<{
  socket: WebSocket | null;
  isOpen: boolean;
} | null>(null);

const Socket: FC<{ children: ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  function createSocket() {
    setSocket(new WebSocket("wss://taxivoshod.ru:8999"));
  }

  useEffect(() => createSocket(), []);

  useEffect(() => {
    socket?.addEventListener("open", (event) => {
      console.log("Socket opened", event);

      setIsOpen(true);
    });

    socket?.addEventListener("close", (event) => {
      console.log("Socket closed", event);

      setIsOpen(false);
    });

    socket?.addEventListener("error", (event) => {
      console.log("Error", event);

      socket.close(1);
      setTimeout(() => createSocket(), 5 * 1000);
    });

    socket?.addEventListener("message", (message) => {
      console.log(message);
    });
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, isOpen }}>
      {children}
    </SocketContext.Provider>
  );
};

function useSocket() {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be used inside a SocketContext");
  }

  return context;
}

export default Socket;
export { useSocket };
