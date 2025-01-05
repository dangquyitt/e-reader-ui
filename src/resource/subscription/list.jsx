import { Datagrid, DateField, List, TextField } from "react-admin";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PaymentStatusDialog from "./components/PaymentStatusDialog";

export const SubscriptionList = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!searchParams.get("isSuccess")) {
      setDialogOpen(false);
      return;
    }

    setIsSuccess(searchParams.get("isSuccess") === "true");
    if (isSuccess) {
      setDialogOpen(true);
      return;
    }

    setDialogOpen(true);
  }, [searchParams]);

  const handleCloseDialog = () => {
    setDialogOpen(false);
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.delete("isSuccess");
    navigate(`?${updatedParams.toString()}`, { replace: true });
  };
  return (
    <>
      <List sort={{ field: "createdAt", order: "DESC" }}>
        <Datagrid bulkActionButtons={false}>
          <TextField source="id" />
          <DateField source="createdAt" />
          <DateField source="startTime" showTime />
          <DateField source="endTime" showTime />
        </Datagrid>
      </List>

      <PaymentStatusDialog
        open={isDialogOpen}
        isSuccess={isSuccess}
        onClose={handleCloseDialog}
        message={
          isSuccess
            ? "Congratulations on your successful payment!"
            : "Your payment failed!"
        }
      />
    </>
  );
};
