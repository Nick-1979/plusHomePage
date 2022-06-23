import { Avatar, Box, Grid, Typography, Button, Link } from "@mui/material";
import React, { useCallback } from "react";
import Features from "./Features";
import Team from "./Team";
import Footer from "./Footer";
import Slider from "./Slider";

function App() {
  const handleOpenFirefox = useCallback(() => {
    window.open(
      "https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-plus-extension/",
      "_blank"
    );
  }, []);

  return (
    <>
      <Grid container disableGutter justifyContent="center" sx={{ pt: 5 }}>
        <Grid
          component="img"
          alt="logo"
          src="images/logo.jpg"
          sx={{
            width: 405,
            height: 70,
            maxHeight: { xs: 35, md: 70 },
            maxWidth: { xs: 202, md: 405 },
          }}
        />
        {/* <Slider /> */}
        <Grid container justifyContent="center" pt={{ xs: 1, md: 6 }}>
          <Box
            component="img"
            sx={{
              height: 607,
              width: 2245,
              maxHeight: { xs: 90, md: 303 },
              maxWidth: { xs: 336, md: 1123 },
              pt: 5,
            }}
            alt="intro"
            src="images/intro.png"
          />
          <Grid item xs={12} textAlign="right" pr="40px" fontSize={14}>
            <Link
              href="https://github.com/Nick-1979/polkadot-Js-Plus-extension/wiki/How-To's"
              target="_blank"
              rel="noopener"
            >
              More photos
            </Link>
          </Grid>
        </Grid>
        <Grid item md={12} px={{ sx: 2, md: 8 }}>
          <Typography align="center" variant="subtitle1" sx={{ pt: 4 }}>
            Polkadot js plus is actually Polkadot js extension, plus new
            features. It is a user-friendly wallet to interact with the
            Polkadot/Substrate based blockchains through a browser. It allows
            users to access their account(s), which can also be used to interact
            with decentralized apps.
          </Typography>
        </Grid>
        <Button
          color="primary"
          variant="contained"
          sx={{ mt: 5 }}
          startIcon={
            <Avatar
              alt="plus"
              src="images/firefox.png"
              sx={{ width: 20, height: 20 }}
            />
          }
          onClick={handleOpenFirefox}
        >
          Download for firefox
        </Button>
      </Grid>

      <Features />
      <Team />
      <Footer />
    </>
  );
}

export default App;
