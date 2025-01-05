import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Grid } from "@mui/material";
import { useState } from "react";
import { getAllPlans } from "../../services/plan";
import { useEffect } from "react";
import { getPaymentUrl } from "../../services/payment";

export default function Pricing() {
  const [plans, setPlans] = useState([]);
  const fetchPlans = async () => {
    try {
      const response = await getAllPlans();
      setPlans(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleCheckout = async (plan) => {
    console.log(plan);

    try {
      const response = await getPaymentUrl(plan.id);
      window.location.href = response.data;
    } catch (error) {}
  };

  return (
    <Container
      id="pricing"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          Pricing
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Quickly build an effective pricing table for your potential customers
          with this layout. <br />
          It&apos;s built with default Material UI components with little
          customization.
        </Typography>
      </Box>
      <Grid
        container
        spacing={3}
        sx={{ alignItems: "center", justifyContent: "center", width: "100%" }}
      >
        {plans?.map((plan) => (
          <Grid
            size={{ xs: 12, sm: plan.name === "Prenium" ? 12 : 6, md: 4 }}
            key={plan.name}
          >
            <Card
              sx={[
                {
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                },
                plan.name === "Standard" &&
                  ((theme) => ({
                    border: "none",
                    background:
                      "radial-gradient(circle at 50% 0%, hsl(220, 20%, 35%), hsl(220, 30%, 6%))",
                    boxShadow: `0 8px 12px hsla(220, 20%, 42%, 0.2)`,
                    ...theme.applyStyles("dark", {
                      background:
                        "radial-gradient(circle at 50% 0%, hsl(220, 20%, 20%), hsl(220, 30%, 16%))",
                      boxShadow: `0 8px 12px hsla(0, 0%, 0%, 0.8)`,
                    }),
                  })),
              ]}
            >
              <CardContent>
                <Box
                  sx={[
                    {
                      mb: 1,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
                    },
                    plan.name === "Standard"
                      ? { color: "grey.100" }
                      : { color: "" },
                  ]}
                >
                  <Typography component="h3" variant="h6">
                    {plan.name}
                  </Typography>
                  {plan.name === "Standard" && (
                    <Chip
                      icon={<AutoAwesomeIcon />}
                      label={plan?.price?.metadata?.subheader}
                    />
                  )}
                </Box>
                <Box
                  sx={[
                    {
                      display: "flex",
                      alignItems: "baseline",
                    },
                    plan.name === "Standard"
                      ? { color: "grey.50" }
                      : { color: null },
                  ]}
                >
                  <Typography component="h3" variant="h2">
                    ${plan?.price?.amount}
                  </Typography>
                  <Typography component="h3" variant="h6">
                    &nbsp;{" "}
                    {"/" +
                      plan?.price?.duration +
                      " " +
                      plan?.price?.durationUnit.toLowerCase()}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2, opacity: 0.8, borderColor: "divider" }} />
                {plan?.price?.features?.map((line) => (
                  <Box
                    key={line}
                    sx={{
                      py: 1,
                      display: "flex",
                      gap: 1.5,
                      alignItems: "center",
                    }}
                  >
                    <CheckCircleRoundedIcon
                      sx={[
                        {
                          width: 20,
                        },
                        plan.name === "Standard"
                          ? { color: "primary.light" }
                          : { color: "primary.main" },
                      ]}
                    />
                    <Typography
                      variant="subtitle2"
                      component={"span"}
                      sx={[
                        plan.name === "Standard"
                          ? { color: "grey.50" }
                          : { color: null },
                      ]}
                    >
                      {line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant={plan?.price?.metadata?.buttonVariant}
                  color={plan?.price?.metadata?.buttonColor}
                  onClick={() => handleCheckout(plan)}
                >
                  {plan?.price?.metadata?.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
