'use client';

import { FormEvent, useEffect, useState } from "react";
import { socket } from "../utils/socket-io";
import { Alert, Button, Card, CardActions, CardContent, List, ListItem, ListItemText, Snackbar, TextField, TextareaAutosize, Typography } from "@mui/material";

export function NewTransactionPage() {
  const [accountPayerId, setAccountPayerId] = useState<string>('');
  const [accountPayeeId, setAccountPayeeId] = useState<string>('');
  const [open, setOpen] = useState(false);

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
    console.log(accountPayerResponse, accountPayeeResponse);

    const [payerId, payeeId] = await Promise.all([
      accountPayerResponse?.id,
      accountPayeeResponse?.id
    ])
    console.log(payerId, payeeId);
    
    if (!payerId) {
      console.error(accountPayerResponse);
      alert('Its not possible find user payer');
      return;
    }
    if (!payeeId) {
      console.error(accountPayeeResponse);
      alert('Its not possible find user payee');
      return;
    }
    
    setAccountPayerId(payerId);
    setAccountPayeeId(payeeId);
  }

  async function createTransaction(event: FormEvent) {
    event.preventDefault();

    const transactionAmount = (document.getElementById("amount") as HTMLInputElement)?.value;
    const transactionReason = (document.getElementById("reason") as HTMLInputElement)?.value;

    if (!transactionAmount && !transactionReason) return;

    console.log('transactionAmount', transactionAmount);
    console.log('transactionReason', transactionReason);

    // FIXME: add http method POST to create transaction

    // FIXME: get infos valid
    socket.emit("new-transations", {
      id: "ab72451e-6d9f-4e12-a676-da0dc0bc0265",
      accountPayerId: "ab72451e-6d9f-4e12-a676-da0dc0bc0265",
      accountPayeeId: "64afb7cd-18e8-418e-8b07-f729dbe5f88f",
      amount: 1.00,
      date: "13/06/2023",
      reason: "Pagas as contas de luz...",
      status: "In progress"
    });

    setOpen(true);
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
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity="success">
          Transaction created successfully
        </Alert>
      </Snackbar>
    </div>
  )
}

export default NewTransactionPage;
