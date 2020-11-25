import React, { useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import ThumbUp from "@material-ui/icons/ThumbUp"
export default function CommunityPostCard(props) {
  useEffect(() => console.log(props)
  ,[])
  return (
    <div>
      <Card style={{ width: "22rem" }}>
        <Card.Body>
          <Card.Title>{props.data.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            
          </Card.Subtitle>
          <Card.Text>
            {props.data.about}
          </Card.Text>
          <Row>
            <Col>
          <Button variant="outline-secondary">Comments</Button>
          </Col>
          <Col>

          <ThumbUp/>
          </Col>

          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
