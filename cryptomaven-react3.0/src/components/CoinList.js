 
const CoinList = ({ coins }) => {
  const styles = {
    small: {
      color: "#48a0ff",
      fontSize: "0.8em",
    },
    li: {
      color: "blue",
    },
    ul: {
      listStyleType: "none",
      padding: 0,
      margin: 0,
    },
  };

  const renderedCoins =  Object.values(coins).map((coin) => {
    let content;
    if (coin.status === "APPROVED") {
      content = coin.content;
    } 
    if (coin.status === "PENDING") {
      content = "This coin awaiting moderation";
    }
    if (coin.status === "REJECTED") {
      content = "This coin has been rejected";
    }
  

    return (
      <li style={styles.li} key={coin.id}>
        {coin.body}
        <br />
        <small style={styles.small}>{coin.name}</small> | &nbsp;
        <small style={styles.small}>{coin.email}</small>
        <hr />
      </li>
    );
  });

  return <div 
  className="d-flex flex-row flex-wrap justify-content-between"
  >
    <ul style={styles.ul}>
      {renderedCoins}
      </ul></div>;
};

export default CoinList;
