import React from "react";

function OrderbookHeader() {
  return (
    <div className="header">
      <div className="header-row1">
        <h2>Sell</h2>
        <h2>Buy</h2>
      </div>
      <div className="header-row2">
        <span>Total (ETH)</span>
        <span>Amount (ETH)</span>
        <span>PRICE (BTC)</span>
        <span>Amount (ETH)</span>
        <span>Total (ETH)</span>
      </div>
    </div>
  );
}

export default OrderbookHeader;
