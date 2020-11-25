import { useRef, useState } from "react";
import fire from "../firebase";
import { useCollectionData,  } from "react-firebase-hooks/firestore";

function ChatRoom(props) {
  const [receiver, setReceiver] = useState();
  const dummy = useRef();
  // const userRef = fire.firestore().collection("User");
//   const userQuery = userRef.where("UserID", "==", props.id);

  const messagesRef = fire.collection("messages");
  const query = messagesRef
    .where("firstUserID", "==", [User.id, props.id])
    .where("secondSUserID", "==", [User.id, props.id])
    .orderBy("createdAt")
    .limit(25);

  const [data] = useCollectionData(userQuery);
  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return <>{messages}</>;
}
