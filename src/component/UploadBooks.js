import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  TextField,
  Grid,
} from "@material-ui/core";
import fire from "../firebase";
import React from "react";
import BookCard from "./Card";
import firebase from "firebase";
// import {} from "react-";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin:{
    margin: theme.spacing(3),
    width: "30ch",
  },
  textField: {
    width: "30ch",
  },
  submit: {
    margin: theme.spacing(3),
    width: "30ch",
    display:"block"
  },
}));

export default function UploadBooks(props) {
  const [files, setFiles] = React.useState([]);
  const [BookName, setBookName] = React.useState([]);
  const [Amount, setAmount] = React.useState([]);
  const [Author, setAuthor] = React.useState([]);
  const [Publisher, setPublisher] = React.useState([]);
  const [About, setAbout] = React.useState([]);
  const [Published, setPublished] = React.useState([]);
  const [imageURL, setImageURL] = React.useState("");
  const classes = useStyles();
  const setImage = (e) => {
    console.log(e.target.files);
    if (e.target.files[0].size > 1244099) {
      alert("File Should be smaller than 1.2MB");
    } else {
      setFiles(e.target.files[0]);
      var file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageURL(reader.result);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }
  };
  const onSubmit = (event) => {
    console.log(files.name);

    var uploadTask = fire
      .storage()
      .ref()
      .child("images/" + files.name)
      .put(files);

    uploadTask.on(
      "state_changed", // or 'state_changed'
      function (snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused": // or 'paused'
            console.log("Upload is paused");
            break;
          case "running": // or 'running'
            console.log("Upload is running");
            break;
          default:
            console.log("Failed");
            break;
        }
      },
      function (error) {
        switch (error.code) {
          case "storage/unauthorized":
            alert("Login First");
            break;
          case "storage/canceled":
            alert("Canceled");
            break;
          case "storage/unknown":
            alert("Network Error");
            break;
          default:
            console.log("Failed");
            break;
        }
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log(downloadURL + "   Ashu");
          setImageURL(downloadURL);
          uploadDoc(downloadURL);
        });
      }
    );
  };
  const uploadDoc = (url) => {
    fire
      .firestore()
      .collection("books")
      .add({
        BookName: BookName,
        Amount: Amount,
        Author: Author,
        Publisher: Publisher,
        About: About,
        Published: Published,
        imageURL: url,
        UploadDate: firebase.firestore.FieldValue.serverTimestamp(),
        UserID: props.id,
      })
      .then((docRef) => {
        setBookName("");
        setAbout("");
        setAmount("");
        setAuthor("");
        setFiles(null);
        setImageURL("");
        setPublished("");
        setPublisher("");
      })
      .catch((err) => alert(err));
  };
  return (
    <div>
      {/* <Grid
        container
        spacing={3}
        direction="column"
        justify="center"
        alignItems="stretch"
      > */}
        {/* <Grid item xs> */}
          <TextField
            required
            id="BookName"
            label="Book Name"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            className={classes.margin}
            onChange={(e) => setBookName(e.target.value)}
          />
        {/* </Grid> */}
        {/* <Grid item xs> */}
          <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">Rs.</InputAdornment>
              }
              labelWidth={60}
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormControl>
        {/* </Grid> */}
        {/* <Grid item xs> */}
          <TextField
            required
            id="Author"
            label="Author's Name"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            className={classes.margin}
            onChange={(e) => setAuthor(e.target.value)}
          />
        {/* </Grid> */}
        {/* <Grid item xs> */}
          <TextField
            id="Publisher"
            label="Publisher"
            defaultValue=""
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            className={classes.margin}
            onChange={(e) => setPublisher(e.target.value)}
          />
        {/* </Grid> */}
        {/* <Grid item xs> */}
          <TextField
            id="date"
            label="Published on"
            type="date"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            className={classes.margin}
            onChange={(e) => setPublished(e.target.valueAsDate)}
          />
        {/* </Grid> */}
        {/* <Grid item xs> */}
          <TextField
            id="About"
            label="About"
            multiline
            rows={4}
            defaultValue=""
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            className={classes.margin}
            onChange={(e) => setAbout(e.target.value)}
          />
        {/* </Grid> */}
        {/* <Grid item xs> */}
          <Button variant="contained" className={classes.margin} component="label">
            Upload File
            <input
              type="file"
              name="picture"
              hidden
              
              onChange={(e) => setImage(e)}
            />
          </Button>
        {/* </Grid> */}
        {/* <Grid item xs> */}
         
        {/* </Grid> */}
      {/* </Grid> */}
      <Button variant="contained" color="primary" className={classes.submit} onClick={onSubmit}>
            Submit
          </Button>
      <BookCard
        name={BookName}
        about={About}
        date={Published}
        amount={Amount}
        publisher={Publisher}
        auther={Author}
        imageURL={imageURL}
        UploadDate={parseInt(new Date() / 1000)}
      ></BookCard>
    </div>
  );
}
