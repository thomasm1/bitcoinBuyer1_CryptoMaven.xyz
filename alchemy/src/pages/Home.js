import logo from "../logo.svg";

export function HomePage({ accountProps }) {
  return (
    <header className="App-header">
      <div className="container">
        <p>
         

        </p>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        CryptoMaven
        </p>
        <p>
        with&nbsp;
          <a
            className="App-link"
            href="https://alchemy.com/?r=zU2MTQwNTU5Mzc2M"
            rel="noreferrer"
            target="_blank"
          >
            Alchemy UI
          </a>
        </p>
      </div>
    </header>
  );
}
