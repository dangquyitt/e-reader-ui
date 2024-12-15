import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import GoogleIcon from "../../components/GoogleIcon/GoogleIcon";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useLogin, useNotify } from "react-admin";
import { useForm } from "react-hook-form";
import { LoginType } from "../../constants/loginType";
import { register as registerAPI } from "../../services/auth";
import { useEffect } from "react";
import { resetPassword as resetPasswordAPI } from "../../services/auth";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const ResetPasswordContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function ResetPassword(props) {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    setValue,
  } = useForm();
  const notify = useNotify();
  const login = useLogin();
  const navigate = useNavigate();
  const password = watch("password", "");

  const handleLoginWithGoogle = (idTokenString) => {
    login({ loginType: LoginType.GOOGLE, idTokenString }).catch(() =>
      notify("Invalid email or password")
    );
  };
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setValue("email", searchParams.get("email"));
  }, [searchParams]);

  const onSubmit = async (data) => {
    try {
      const response = await resetPasswordAPI(
        data.email,
        data.password,
        searchParams.get("token")
      );
      notify(response.message, { type: "success" });
      navigate("/login");
    } catch (error) {
      notify(error.response.data.message, { type: "error" });
    }
  };
  return (
    <>
      <ResetPasswordContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <GoogleIcon />

          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Reset password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Email"
              placeholder="your@email.com"
              variant="outlined"
              fullWidth
              disabled
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type="password"
              placeholder="••••••"
              variant="outlined"
              fullWidth
              autoFocus
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
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
                  value === password || "Passwords do not match",
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Confirm
            </Button>
          </Box>
          <Divider sx={{ my: 2 }}>
            <Typography color="textSecondary">or</Typography>
          </Divider>
          <GoogleLogin
            onSuccess={(credentialResponse) =>
              handleLoginWithGoogle(credentialResponse.credential)
            }
          />
          <Typography align="center" sx={{ mt: 2 }}>
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Card>
      </ResetPasswordContainer>
    </>
  );
}
