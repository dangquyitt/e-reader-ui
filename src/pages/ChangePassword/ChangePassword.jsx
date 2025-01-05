import React from "react";
import { useForm } from "react-hook-form";
import { Button, Box, TextField, Container, Typography } from "@mui/material";
import { changePassword } from "../../services/user";
import { useNotify } from "react-admin";

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const notify = useNotify();
  const newPassword = watch("newPassword", "");

  const onSubmit = async (data) => {
    try {
      const resp = await changePassword(data.currentPassword, data.newPassword);
      notify(resp.message, { type: "success" });
      reset();
    } catch (error) {
      notify(error.response.data.message, { type: "error" });
    }
  };

  return (
    <Container>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Change password
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          label="Current password"
          type="password"
          placeholder="••••••"
          variant="outlined"
          fullWidth
          {...register("currentPassword", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={!!errors.currentPassword}
          helperText={errors.currentPassword?.message}
        />
        <TextField
          label="New password"
          type="password"
          placeholder="••••••"
          variant="outlined"
          fullWidth
          {...register("newPassword", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
        />
        <TextField
          label="Confirm Password"
          type="password"
          placeholder="••••••"
          variant="outlined"
          fullWidth
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) =>
              value === newPassword || "Passwords do not match",
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Change
        </Button>
      </Box>
    </Container>
  );
}
