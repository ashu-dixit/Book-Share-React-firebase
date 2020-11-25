import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import fire from "../firebase";
import BookCard from "./Card";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent:"center",
    margin:theme.spacing(3)
  },
  margin:{
    margin: theme.spacing(3),
  },
  textField: {
    width: "30ch",
  },
  form: {},
}));


export default function Home(props) {
  const [bookList, setBookList] = useState([]);
  const [ref, ] = useState(fire.firestore().collection('books'));
  const onCollectionUpdate = (querySnapshot) => {
    var books = []
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data.id = doc.id;
      books.push(data);
    })
    setBookList(books)
  }
  useEffect(() => {
    ref
       .orderBy("UploadDate")
       .limit(10)
       .onSnapshot(onCollectionUpdate);
   }, []);
  const classes = useStyles();
  return (
    <div class={classes.root}>
      {bookList.map((book) => (
        <BookCard
          id={book.id}
          key={book.id}
          name={book.BookName}
          about={book.About}
          UploadDate = {book.UploadDate.seconds}
          amount = {book.Amount}
          publisher = {book.Publisher}
          auther = {book.Auther}
          imageURL={book.imageURL}
          date={book.uploadDate}
          chatoption={true}
        ></BookCard>
      ))}
    </div>
  );
}