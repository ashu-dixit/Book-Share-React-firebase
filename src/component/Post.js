import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import fire from "../firebase";
import CommunityPostCard from "./PostCard";
export default function Post(props) {
  const [ref,] = useState(fire.firestore().collection("communitypost"));
  const [posts, setPost] = useState([]);
  useEffect(() => {
    console.log(ref.id);
      ref
      .orderBy("UploadDate")
      .limit(10)
      .onSnapshot(onCollectionUpdate);
  }, []);
  const onCollectionUpdate = (querySnapshot) => {
    
    var posts = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data.id = doc.id;
      posts.push(data);
    });
    setPost(posts);
    console.log(posts);
  };

  return (
    <Container style={{display: "flex",justifyContent:"center",justifyItems:"center" }}>
      
      {posts.map((post) => (
        <CommunityPostCard  key={post.id} data={post} />
      ))}
      
    </Container>
  );
}
