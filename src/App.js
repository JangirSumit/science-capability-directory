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
import { Box, CircularProgress } from "@material-ui/core";

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
}));

export default function Album() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [open, setClose] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
                        Address:{" "}
                        <Box fontStyle="oblique">{card["Address"]}</Box>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
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
          Source of data :
          <a target="_blank" href="https://www.data.qld.gov.au/">
            Queensland Government
          </a>
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
