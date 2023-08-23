'use client';

import { FormEvent, useState } from "react";

export function NewTransactionPage() {
  const [accountPayerId, setAccountPayerId] = useState<string>('');
  const [accountPayeeId, setAccountPayeeId] = useState<string>('');

  async function searchAccounts(event: FormEvent) {
    event.preventDefault();

    const userCpfCnpjPayer = (document.getElementById("userCpfCnpjPayer") as HTMLInputElement)?.value;
    const userCpfCnpjPayee = (document.getElementById("userCpfCnpjPayee") as HTMLInputElement)?.value;

    if (!userCpfCnpjPayer && !userCpfCnpjPayee) return;

    // DOCS: process in parallelism
    const [accountPayerResponse, accountPayeeResponse]: any = await Promise.all([
      fetch(`http://localhost:3000/accounts?cpjCnpj=${userCpfCnpjPayer}`),
      fetch(`http://localhost:3000/accounts?cpjCnpj=${userCpfCnpjPayee}`)
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
  }

  return (
    <div>
      <h1>New Transaction</h1>
      <form 
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={searchAccounts}
      >
        <div>
          <input id="userCpfCnpjPayer" type="text" placeholder="Payer User CPF/CNPJ" />
        </div>
        <div>
          <input id="userCpfCnpjPayee" type="text" placeholder="Payee User CPF/CNPJ" />
        </div>
        <button type="submit">Search</button>
      </form><br />

      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={createTransaction}
      >
        {
          (accountPayerId && accountPayeeId) && (
            <>
              <div>
                <input id="amount" type="number" placeholder="Transaction amount" />
              </div>
              <div>
                <textarea id="reason" placeholder="Transaction reason" />
              </div>
            </>
          )
        }
        <button type="submit">Create transaction</button>
      </form>
    </div>
  )
}

export default NewTransactionPage;
