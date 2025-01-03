import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import GoogleIcon from "../../components/GoogleIcon/GoogleIcon";
import ForgotPassword from "./components/ForgotPassword";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useLogin, useNotify } from "react-admin";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginType } from "../../constants/loginType";
import { sendVerifyEmail } from "../../services/auth";

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

const LoginContainer = styled(Stack)(({ theme }) => ({
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

export default function Login(props) {
  const login = useLogin();
  const notify = useNotify();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const email = watch("email", "");
  const [isOpenForgotPassword, setIsOpenForgotPassword] = useState(false);
  const [isOpenSendEmailVerification, setIsOpenSendEmailVerification] =
    useState(false);
  const handleCloseOpenForgotPassword = () => {
    setIsOpenForgotPassword(false);
  };
  const handleClickOpenForgotPassword = () => {
    setIsOpenForgotPassword(true);
  };
  const handleSendEmailVerification = async () => {
    try {
      const response = await sendVerifyEmail(email);
      notify(response.message, { type: "success" });
      setIsOpenSendEmailVerification(false);
    } catch (error) {
      notify(error.response.data.message, { type: "error" });
    }
  };
  const onSubmit = async (data) => {
    login({ email: data.email, password: data.password })
      .then((data) => notify(data.message, { type: "success" }))
      .catch((error) => {
        if (error.response.data.code === "user.not_verified") {
          setIsOpenSendEmailVerification(true);
        }
        notify(error.response.data.message, { type: "error" });
      });
  };
  const handleLoginWithGoogle = (idTokenString) => {
    login({ loginType: LoginType.GOOGLE, idTokenString })
      .then((data) => notify(data.message, { type: "success" }))
      .catch((error) => notify(error.response.data.message, { type: "error" }));
  };
  return (
    <>
      <LoginContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <GoogleIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                type="email"
                name="email"
                helperText={errors.email?.message}
                placeholder="your@email.com"
                autoComplete="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
                error={errors.email}
                color={errors.email ? "error" : "primary"}
                autoFocus
                fullWidth
                variant="outlined"
                sx={{ ariaLabel: "email" }}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Link
                  component="button"
                  type="button"
                  onClick={handleClickOpenForgotPassword}
                  variant="body2"
                  sx={{ alignSelf: "baseline" }}
                >
                  Forgot your password?
                </Link>
              </Box>
              <TextField
                placeholder="••••••"
                type="password"
                helperText={errors.password?.message}
                id="password"
                {...register("password", {
                  required: "Password is required",
                })}
                error={errors.password}
                autoComplete="current-password"
                fullWidth
                variant="outlined"
                color={errors.password ? "error" : "primary"}
              />
            </FormControl>
            {isOpenSendEmailVerification && (
              <Link
                component="button"
                type="button"
                onClick={handleSendEmailVerification}
                variant="body2"
                sx={{ alignSelf: "baseline" }}
              >
                Click here to resend email verification?
              </Link>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <ForgotPassword
              open={isOpenForgotPassword}
              handleClose={handleCloseOpenForgotPassword}
            />
            <Button type="submit" fullWidth variant="contained">
              Login
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <span>
                <Link to={"/register"}>Register</Link>
              </span>
            </Typography>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* <Button
              fullWidth
              variant="outlined"
              // onClick={handleClickLoginWithGoogle}
              startIcon={<GoogleIcon />}
            >
              Login with Google
            </Button> */}
            <GoogleLogin
              onSuccess={(credentials) =>
                handleLoginWithGoogle(credentials.credential)
              }
            />
            {/* <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Login with Facebook")}
              startIcon={<FacebookIcon />}
            >
              Login with Facebook
            </Button> */}
          </Box>
        </Card>
      </LoginContainer>
    </>
  );
}
