import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import fire from "../firebase";
import BookCard from "./Card";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: theme.spacing(3),
  },
  margin: {
    margin: theme.spacing(3),
  },
  textField: {
    width: "30ch",
  },
  form: {},
}));

export default function MyBooks(props) {
  const [bookList, setBookList] = useState([]);
  const [User] = useAuthState(fire.auth());
  const [ref, seRef] = useState(fire.firestore().collection("books"));
  var [unsubscribe, setUnsubscribe] = useState(null);
  const classes = useStyles();
  const deletePost = (id) => {
    ref.doc(id).delete()
  };
  useEffect(() => {
   ref
      .where("UserID", "==", User?"" + User.uid:"")
      .orderBy("UploadDate")
      .limit(10)
      .onSnapshot(onCollectionUpdate);
  }, []);
  const onCollectionUpdate = (querySnapshot) => {
    var books = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      // console.log(doc);
      data.id = doc.id;
      books.push(data);
    });
    setBookList(books);
  };
  return (
    <div class={classes.root}>
      {/* {bookList} */}
      {bookList.map((book) => (
        <BookCard
          id={book.id}
          key={book.id}
          name={book.BookName}
          about={book.About}
          UploadDate={book.UploadDate.seconds}
          date={book.Published}
          amount={book.Amount}
          publisher={book.Publisher}
          auther={book.Auther}
          imageURL={book.imageURL}
          date={book.uploadDate}
          chatoption={false}
          UserID={book.UserID}
          deletePost={deletePost}
        ></BookCard>
      ))}
    </div>
  );
}
