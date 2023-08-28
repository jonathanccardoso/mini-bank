'use client';

import useSwr from "swr";
import { useEffect, useState } from "react";
import { fetcher } from "../utils/http";
import { socket } from "../utils/socket-io";
import { ITransaction } from "../interfaces";
import { Box, Button, Modal, Typography } from "@mui/material";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function TransactionsPage() {
  const [openModal, setOpenModal] = useState(false);
  const [transactionSelected, setTransactionSelected] = useState<ITransaction>({} as ITransaction);
  
  const {
    data: transactions,
    error,
    isLoading,
  } = useSwr<any>("http://server:3000/routes", fetcher, {
    fallbackData: [],
  });

  useEffect(() => {
    socket.connect();
    
    // FIXME: resolve problem socket.io
    socket.on("admin-new-transactions", (data: ITransaction) => {
      if (data.id) {
        transactions.push(data);
      }
    });

    return () => {
      socket.disconnect();
    }
  }, [transactions]);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleSelectedTransaction = (transaction: ITransaction) => {
    setTransactionSelected(transaction);
    handleOpen();
  }

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

            <Button
              variant="contained"
              onClick={() => handleSelectedTransaction(transaction)}
            >
              View details
            </Button>
          </div>
        ))}
      </div>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Details Transaction
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {transactionSelected.id} <br />
            {transactionSelected.accountPayerId} <br />
            {transactionSelected.accountPayeeId} <br />
            {transactionSelected.date} <br />
            {transactionSelected.reason} <br />
            {transactionSelected.status} <br />
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default TransactionsPage;
