class WebSocketService {
  private tokenSocket: WebSocket | null = null;
  private token: string;

  constructor(token: string) {
    this.token = token.toLowerCase();
  }

  connectTokens(onDataReceived: (closePrice: number) => void) {
    if (!this.token) {
      console.error("No token provided");
      return;
    }
    
    this.tokenSocket = new WebSocket(`wss://fstream.binance.com/ws/${this.token}usdt@ticker`);

    this.tokenSocket.onopen = () => {
      console.log("WebSocket connected");
    }

    this.tokenSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      
      if (data.e === "24hrTicker") {
        const closePrice = Number(data.c);
        onDataReceived(closePrice);
      } 
    }

    this.tokenSocket.onerror = () => {
      console.error("WebSocket error");
    }

    this.tokenSocket.onclose = () => {
      console.log("WebSocket connection closed");
    }
  }

  disconnect() {
    if (this.tokenSocket) {
      this.tokenSocket.close();
      this.tokenSocket = null;
      console.log("WebSocket disconnected");
    }
  }
}

export default WebSocketService;