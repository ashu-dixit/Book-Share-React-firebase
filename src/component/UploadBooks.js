import { makeStyles } from "@material-ui/core";
import fire from "../firebase";
import React from "react";
import BookCard from "./Card";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Container,
  Form,
  Button,
  ProgressBar,
  InputGroup,
  FormControl,
  Badge,
} from "react-bootstrap";
// import {} from "react-";
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(3),
    width: "30ch",
  },
  textField: {
    width: "30ch",
  },
  submit: {
    margin: theme.spacing(3),
    width: "30ch",
    display: "block",
  },
}));

export default function UploadBooks(props) {
  const [User] = useAuthState(fire.auth());
  const [files, setFiles] = React.useState([]);
  const [BookName, setBookName] = React.useState([]);
  const [Amount, setAmount] = React.useState([]);
  const [Author, setAuthor] = React.useState([]);
  const [Publisher, setPublisher] = React.useState([]);
  const [About, setAbout] = React.useState([]);
  const [Published, setPublished] = React.useState([]);
  const [imageURL, setImageURL] = React.useState("");
  const [progress, setProgress] = React.useState(0);
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
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
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
        UserID: User.uid,
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
        setProgress(0);
      })
      .catch((err) => alert(err));
  };
  return (
    <div>
      {User?
      <Container>
        <h2>
          <Badge style={{display: "flex",justifyContent:"center",justifyItems:"center" }} variant="secondary">Enter Book details</Badge>
        </h2><br/><br/><br/>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Book name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              onChange={(e) => setBookName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Author's Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Author's Name"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Form.Group>
          <label htmlFor="basic-url">Amount</label>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">₹</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Amount"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Publisher</Form.Label>
            <Form.Control
              type="textr"
              placeholder="Enter publisher name"
              onChange={(e) => setPublisher(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Published on</Form.Label>
            <Form.Control
              type="Date"
              placeholder="published On"
              onChange={(e) => setPublished(e.target.valueAsDate)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>About</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter in breif about book condition"
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Book Image</Form.Label>
            <Form.Control
              type="file"
              placeholder="Enter in breif about book condition"
              onChange={(e) => setAmount(e.target.value)}
            />
            <Form.Text>file size Should be less then 1.2MB</Form.Text>
          </Form.Group>
          <Button variant="primary" onClick={onSubmit}>
            Save
          </Button>
        </Form>
        {progress === 0 ? <div /> : <ProgressBar now={progress} />}
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
      </Container>:<div>Login First</div>}
    </div>
  );
}
