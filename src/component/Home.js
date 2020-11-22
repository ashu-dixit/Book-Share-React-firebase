import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import fire from "../firebase";
import BookCard from "./Card";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
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
  const [ref, seRef] = useState(fire.firestore().collection('books'));
  var [unsubscribe, setUnsubscribe] = useState(null)
  const classes = useStyles();
  const getbooks = () => {
    const ref = fire.firestore().collection('books')
  }
  useEffect(() => {

    unsubscribe = ref.orderBy("UploadDate").limit(10).onSnapshot(onCollectionUpdate)
    // ref.get().then(onCollectionUpdate)
    // console.log("Hello")
  }, []);
  const onCollectionUpdate = (querySnapshot) => {
    var books = []
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data.id = doc.id;
      books.push(data);
    })
    setBookList(books)
  }
  return (
    <div class={classes.root}>
      {bookList.map((book) => (
        <BookCard
          key={book.id}
          name={book.BookName}
          about={book.About}
          UploadDate = {book.UploadDate.seconds}
          amount = {book.Amount}
          publisher = {book.Publisher}
          auther = {book.Auther}
          imageURL={book.imageURL}
          date={book.uploadDate}
        ></BookCard>
      ))}
    </div>
  );
}