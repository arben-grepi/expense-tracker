import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { moneyFormatter } from "./utils/moneyFormatter";

//Money formatter function

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0);

  return (
    <>
      <h4>Your Balance</h4>
      <h1>{moneyFormatter(total)}</h1>
    </>
  );
};
