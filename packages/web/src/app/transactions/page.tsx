'use client';

import useSwr from "swr";
import { useEffect } from "react";
import { fetcher } from "../utils/http";
import { socket } from "../utils/socket-io";
import { ITransaction } from "../interfaces";
import { Button, Typography } from "@mui/material";

export function TransactionsPage() {

  const {
    data: transactions,
    error,
    isLoading,
  } = useSwr<any>("http://server:3000/routes", fetcher, {
    fallbackData: [],
  });

  useEffect(() => {
    socket.connect();
    
    socket.on("admin-new-transactions", (data: ITransaction) => {
      if (data.id) {
        transactions.push(data);
      }
    });

    return () => {
      socket.disconnect();
    }
  }, [transactions]);

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
      <Typography variant="h4">Transactions</Typography>
      <div>
        {isLoading && <p>Loading ...</p>}
        {transactions!.map((transaction: any) => (
          <div key={transaction.id}>
            {transaction.name}

            <Button variant="contained">
              View details
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TransactionsPage;
