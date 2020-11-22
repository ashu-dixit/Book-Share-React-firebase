import React, { useEffect, useState } from "react";
import fire from "../firebase";
import BookCard from "./Card";

export default function MyBooks(props) {
  const [bookList, setBookList] = useState([]);
  const [ref, seRef] = useState(fire.firestore().collection('books'));
  var [unsubscribe, setUnsubscribe] = useState(null);
  useEffect(() => {
    if (props.id) {
      unsubscribe = ref
        .where("UserID", "==", props.id)
        .orderBy("UploadDate")
        .limit(10)
        .onSnapshot(onCollectionUpdate);
      // setUnsubscribe(
      //   ref
      //     .where("UserID", "==", props.id)
      //     .orderBy("UploadDate")
      //     .limit(10)
      //     .onSnapshot(onCollectionUpdate)
      // );
    }
  }, []);
  const onCollectionUpdate = (querySnapshot) => {
    var books = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data.id = doc.id;
      books.push(data);
    });
    setBookList(books);
  };
  return (
    <div>
      {bookList.map((book) => (
        <BookCard
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
        ></BookCard>
      ))}
    </div>
  );
}
