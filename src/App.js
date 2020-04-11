import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import IconImage from "./images/icons/science (3).png";
import Backdrop from "@material-ui/core/Backdrop";
import { Box, CircularProgress, Divider, Chip } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Sumit Jangir
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
    backgroundSize: "90% 90%",
    backgroundColor: "#fafafa",
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  paddingLeft: {
    paddingLeft: "5px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function Album() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [open, setClose] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [dialogData, setDialogData] = useState({});

  const handleClickOpen = (scrollType, data) => (event) => {
    setOpen(true);
    setScroll(scrollType);
    event.preventDefault();
    event.stopPropagation();
    setDialogData(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function fetchData(q) {
    let search = q ? `&q=${q}` : "";

    let request = fetch(
      "https://www.data.qld.gov.au/api/3/action/datastore_search?resource_id=8b9178e0-2995-42ad-8e55-37c15b4435a3&limit=21" +
        search
    );
    let data = await (await request).json();
    setData(data.result.records);
    setClose(false);
  }

  useEffect(() => {
    fetchData(searchQuery);
  }, [searchQuery]);

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (openModal) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openModal]);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative" style={{ background: "#f44336" }}>
        <Toolbar>
          <Avatar
            variant="rounded"
            src={IconImage}
            className={classes.rounded}
          ></Avatar>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.paddingLeft}
          >
            Science Directory
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Search and Learn
            </Typography>
            <TextField
              id="search-text"
              label="Search test here..."
              variant="outlined"
              className=""
              fullWidth
              onKeyUp={(e) => setSearchQuery(e.target.value)}
            />
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4} key="1">
            {data.length > 0 ? (
              data.map((card) => (
                <Grid item key={card._id} xs={12} sm={6} md={4}>
                  <a
                    href={card.Weblink}
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={card["logo_clean"]}
                        title="Image title"
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h6" component="h2">
                          {card["Centre name"]}{" "}
                          {card["Abbreviation"]
                            ? "(" + card["Abbreviation"] + ")"
                            : ""}
                        </Typography>
                        <Typography color="textSecondary">
                          {card["Overview"].length > 100
                            ? card["Overview"].substring(0, 100) + "..."
                            : card["Overview"]}
                        </Typography>
                        <b>Address</b>{" "}
                        <Box fontStyle="oblique">{card["Address"]}</Box>
                      </CardContent>
                      <Divider />
                      <div className={classes.root}>
                        {card["Sectors"].split(";").map((c) => (
                          <Chip
                            size="small"
                            color="secondary"
                            variant="outlined"
                            label={c}
                          />
                        ))}
                      </div>
                      <Divider />
                      <CardActions>
                        <Button
                          size="small"
                          color="primary"
                          onClick={handleClickOpen("paper", card)}
                        >
                          View more details
                        </Button>
                      </CardActions>
                    </Card>
                  </a>
                </Grid>
              ))
            ) : (
              <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
              </Backdrop>
            )}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Help Links
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Source of data:
          <Button
            target="_blank"
            href="https://www.data.qld.gov.au/"
            color="primary"
          >
            Queensland Government
          </Button>
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Mentor:
          <a target="_blank" href="#"></a>
          <Button target="_blank" href="#u/" color="primary">
            Mr. Matti richardson
          </Button>
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}

      <Dialog
        open={openModal}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {dialogData["Centre name"]}{" "}
          {dialogData["Abbreviation"]
            ? "(" + dialogData["Abbreviation"] + ")"
            : ""}
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Typography component="div" variant="body1">
              <Box color="warning.main">Parent organisation</Box>
              {dialogData["Parent organisation"]}
            </Typography>
            <Typography component="div" variant="body1">
              <Box color="warning.main">Web link</Box>
              <Button
                target="_blank"
                href={dialogData["Weblink"]}
                color="primary"
              >
                {dialogData["Weblink"]}
              </Button>
            </Typography>
            <Typography component="div" variant="body1">
              <Box color="warning.main">Overview</Box>
              {dialogData["Overview"]}
            </Typography>
            <Typography component="div" variant="body1">
              <Box color="warning.main">Centre summary</Box>
              {dialogData["Centre summary"]}
            </Typography>
            <Typography component="div" variant="body1">
              <Box color="warning.main">Sectors</Box>
              {dialogData["Sectors"]}
            </Typography>
            <Typography component="div" variant="body1">
              <Box color="warning.main">Strengths and capabilities</Box>
              {dialogData["Strengths and capabilities"]}
            </Typography>
            <Typography component="div" variant="body1">
              <Box color="warning.main">Facilities and major equipment</Box>
              {dialogData["Facilities and major equipment"]}
            </Typography>
            <Typography component="div" variant="body1">
              <Box color="warning.main">Research staff</Box>
              {dialogData["Research staff"]}
            </Typography>
            <Typography component="div" variant="body1">
              <Box color="warning.main">Organisation type</Box>
              {dialogData["Organisation type"]}
            </Typography>
            <Typography component="div" variant="body1">
              <Box color="warning.main">Primary centre</Box>
              {dialogData["Primary centre"]}
            </Typography>
            <Typography component="div" variant="body1">
              <Box color="warning.main">Address</Box>
              {dialogData["Address"]}
            </Typography>
            <Typography component="div" variant="body1">
              <Box color="warning.main">Latitude and Longitude</Box>
              {dialogData["Latitude"]}
              {","}
              {dialogData["Longitude"]}
            </Typography>
            <Typography component="div" variant="body1">
              <Box color="warning.main">Centre achievements</Box>
              {dialogData["Centre achievements"]}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
