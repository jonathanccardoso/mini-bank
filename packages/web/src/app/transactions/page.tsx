import useSwr from "swr";
import { fetcher } from "../utils/http";

export function TransactionsPage() {

  const {
    data: transactions,
    error,
    isLoading,
  } = useSwr<any>("http://localhost:3000/routes", fetcher, {
    fallbackData: [],
  });

  // show transactions and possible view details by modal section

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
      }}
    >
      <h1>Transactions</h1>
      {transactions!.map((transaction: any) => (
        <div key={transaction.id}>
          {transaction.name}
        </div>
      ))}
    </div>
  )
}

export default TransactionsPage;
