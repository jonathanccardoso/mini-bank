'use client';

import { FormEvent, useEffect, useState } from "react";
import { socket } from "../utils/socket-io";
import { Alert, Button, Card, CardActions, CardContent, List, ListItem, Snackbar, TextField, TextareaAutosize, Typography } from "@mui/material";
import { ITransaction, TypeStatusEnum } from "../interfaces";

export function NewTransactionPage() {
  const [accountPayerId, setAccountPayerId] = useState<string>('');
  const [accountPayeeId, setAccountPayeeId] = useState<string>('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    }
  }, []);

  async function searchAccounts(event: FormEvent) {
    event.preventDefault();

    const userCpfCnpjPayer = (document.getElementById("userCpfCnpjPayer") as HTMLInputElement)?.value;
    const userCpfCnpjPayee = (document.getElementById("userCpfCnpjPayee") as HTMLInputElement)?.value;

    if (!userCpfCnpjPayer && !userCpfCnpjPayee) return;

    // DOCS: process in parallelism
    // [use proxy] redirect to own next js to revalidate
    const [accountPayerResponse, accountPayeeResponse]: any = await Promise.all([
      fetch(`http://localhost:3001/api/accounts?cpjCnpj=${userCpfCnpjPayer}`),
      fetch(`http://localhost:3001/api/accounts?cpjCnpj=${userCpfCnpjPayee}`)
    ])

    const [payer, payee] = await Promise.all([
      accountPayerResponse.json(),
      accountPayeeResponse.json()
    ])
    
    if (!payer) {
      console.error(accountPayerResponse);
      alert('Its not possible find user payer');
      return;
    }
    if (!payee) {
      console.error(accountPayeeResponse);
      alert('Its not possible find user payee');
      return;
    }
    
    setAccountPayerId(payer.id);
    setAccountPayeeId(payee.id);
  }

  async function createTransaction(event: FormEvent) {
    event.preventDefault();

    const transactionAmount = (document.getElementById("amount") as HTMLInputElement)?.value;
    const transactionReason = (document.getElementById("reason") as HTMLInputElement)?.value;

    if (!transactionAmount && !transactionReason) return;

    console.log('transactionAmount', transactionAmount);
    console.log('transactionReason', transactionReason);

    const transactionResponse = await fetch(`http://localhost:3001/api/transactions`, {
      method: 'POST',
      body: JSON.stringify({
        accountPayerId: accountPayerId,
        accountPayeeId: accountPayeeId,
        amount: Number(transactionAmount),
        date: new Date().toLocaleDateString(),
        reason: transactionReason,
        status: TypeStatusEnum.InProgress
      })
    });

    const transaction: ITransaction = await transactionResponse.json();
    console.log('transaction', transaction);
    if (!transaction) {
      setOpenError(true);      
      return;
    }

    socket.emit("new-transations", {
      id: transaction.id,
      accountPayerId: transaction.accountPayerId,
      accountPayeeId: transaction.accountPayeeId,
      amount: Number(transaction.amount),
      date: transaction.date,
      reason: transaction.reason,
      status: transaction.status
    });

    setOpenSuccess(true);
  }

  return (
    <div>
      <Typography variant="h4">New Transaction</Typography>
      <form 
        style={{ display: "flex", flexDirection: "column", padding: "16px" }}
        onSubmit={searchAccounts}
      >
        <TextField id="userCpfCnpjPayer" label="Payer User CPF/CNPJ" margin="normal" />
        <TextField id="userCpfCnpjPayee" label="Payee User CPF/CNPJ" margin="normal" />
        <Button variant="contained" type="submit">Search</Button>
      </form><br />

      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={createTransaction}
      >
        {
          (accountPayerId && accountPayeeId) && (
            <Card sx={{ mt: 1 }}>
              <CardContent>
                <List>
                  <ListItem>
                    <TextField id="amount" label="Transaction amount" />
                  </ListItem>
                  <ListItem>
                    <TextField id="reason" label="Transaction reason" />
                  </ListItem>
                </List>
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <Button type="submit" variant="contained">
                  Create transaction
                </Button>
              </CardActions>
            </Card>
          )
        }
      </form>
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={() => setOpenSuccess(false)}
      >
        <Alert onClose={() => setOpenSuccess(false)} severity="success">
          Transaction created successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={() => setOpenError(false)}
      >
        <Alert onClose={() => setOpenError(false)} severity="success">
          Error creating transaction
        </Alert>
      </Snackbar>
    </div>
  )
}

export default NewTransactionPage;
