import { useState } from "react";
import "./App.css";
import { useWeb3 } from "./components/providers/web3";

function App() {
  const [count, setCount] = useState(0);
  const { provider, contract } = useWeb3();

  const getNftinfo = async () => {
    try {
      console.log(await contract!.name());
      console.log(await contract!.symbol());
    } catch (e) {
      console.log(e);
    }
  };

  if (contract) {
    getNftinfo();
  }

  return <></>;
}

export default App;
