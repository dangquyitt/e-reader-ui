import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import AppAppBar from "../../components/Pricing/AppBar";
// import Hero from "./components/Hero";
// import LogoCollection from "./components/LogoCollection";
// import Highlights from "./components/Highlights";
import Footer from "../../components/Pricing/Footer";
import Pricing from "./Pricing";
// import Features from "./components/Features";
// import Testimonials from "./components/Testimonials";
// import FAQ from "./components/FAQ";
// import Footer from "./components/Footer";
// import AppTheme from "../shared-theme/AppTheme";

export default function MarketingPage(props) {
  return (
    <>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      {/* <Hero /> */}
      <div>
        <Pricing />
        <Footer />
      </div>
    </>
  );
}
