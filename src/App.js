import React, { Component } from "react"
import { Card, Container, ListGroup, Row, Col, ListGroupItem, Stack, Image } from 'react-bootstrap'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      experts: [],
    };
  }

  componentDidMount() {
    fetch('https://api.airtable.com/v0/app5tsAm7aoHtBm31/sgpn?api_key=keymnTqY5qJJFYdua')
      .then((resp) => resp.json())
      .then(data => {
        this.setState({ experts: data.records });
      }).catch(err => {
        // Error :(
      });
  }

  render() {
    return (
      <>
        <Container fluid="lg" className="px-4 py-5">
          <Row xs={1} sm={2} md={3} xl={4} className="g-4" data-masonry='{"percentPosition": true }'>
            {this.state.experts.map(expert => <ExpertPicks {...expert.fields} />)}
          </Row>
        </Container>
      </>
    )
  }
}

export default App;


const ExpertPicks = ({ Avatar, Name, Role, URL, One, Two, Three, Alternate }) => (
  <>
    <Col>
      <Card className="shadow-sm">
        <Card.Body>
          <Stack direction="horizontal">
            <div>
              <a href={URL} target='_blank' rel="noopener noreferrer" >
                <Card.Title>{Name}</Card.Title>
              </a>
              <Card.Subtitle>{Role}</Card.Subtitle>
            </div>
            <Image width={64} className="ms-auto" roundedCircle src={Avatar[0].url} />
          </Stack>

          <ListGroup variant="flush" className="mt-3">
            <ListGroupItem className="p-1">
              <Stack direction="horizontal">
                <div><small className="text-muted">1st</small></div>
                <div className="ms-auto semi-bold">{One}</div>
              </Stack>
            </ListGroupItem>
            <ListGroupItem className="p-1">
              <Stack direction="horizontal">
                <div><small className="text-muted">2nd</small></div>
                <div className="ms-auto semi-bold">{Two}</div>
              </Stack></ListGroupItem>
            <ListGroupItem className="p-1">
              <Stack direction="horizontal">
                <div><small className="text-muted">3rd</small></div>
                <div className="ms-auto semi-bold">{Three}</div>
              </Stack></ListGroupItem>
            <ListGroupItem className="p-1">
              <Stack direction="horizontal">
                <div><small className="text-muted">Alt</small></div>
                <div className="ms-auto semi-bold">{Alternate}</div>
              </Stack></ListGroupItem>
          </ListGroup>
        </Card.Body>
      </Card>
    </Col>
  </>
);