import React, {useState} from "react";
import OrderbookHeader from "./components/OrderbookHeader";
import OrderbookListItem from "./components/OrderbookListItem";

function App({ data }) {


  const [buyOrders , setBuyOrders] = useState([])
  const [sellOrders , setSellOrders] = useState([])

    React.useEffect(() => {
      const socket = new WebSocket("ws://localhost:8082/ws");

      socket.onmessage = function(event) {
        let message = event.data;

        let messageElem = document.createElement('div');
        messageElem.textContent = message;

          setSellOrders(sellOrders.concat(JSON.parse(message).a));
          setBuyOrders(buyOrders.concat(JSON.parse(message).b))
      }

      socket.onerror = function (event) {
        console.log('event')
        console.log(event)
      }

      socket.onclose = function (event) {
        console.log('close:')
        console.log(event)
      }

    },[sellOrders, buyOrders])

    const calTotal = (i,type) => {
        let total = 0

        const list = type ===  'sell' ? sellOrders : buyOrders;

        for (let j = 0; j <= i; j++) {
          total += parseInt(list[j][1])
        }

      return total
    }

    const calSum = (type) => {
      let sum = 0
      const list = type ===  'sell' ? sellOrders : buyOrders;
      list.forEach(i => {sum += parseInt(i[1])})
      return sum
    }

    React.useEffect(() => {
      if (sellOrders.length) {

      }
    },[sellOrders])


  return (
    <div className="container">
      <h1 className={'info'}>Binance Orderbook (ETH/BTC)</h1>
      <div className="wrapper">
        <OrderbookHeader />
        <div className="table">
          <div className="sell-side side">
            {sellOrders.map((order,i) => {
              const total = calTotal(i,'sell')
              const sum = calSum('sell')
              return <OrderbookListItem amount={order[1]} type={'sell'} price={order[0]} index={i} key={i} bgWidth={total*100/sum} total={total} />
            })}
          </div>
          <div className="buy-side side">
            {buyOrders.map((order,i) => {
              const total = calTotal(i,'buy')
              const sum = calSum('buy')
              return <OrderbookListItem amount={order[1]} type={'buy'} price={order[0]} index={i} key={i} bgWidth={total*100/sum} total={total}/>
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
