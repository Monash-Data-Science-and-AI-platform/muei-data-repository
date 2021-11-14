import React from 'react';
import './styles.css';
//import briefcaseIcon from './static/briefcaseIcon.png';
import axios from 'axios';
import { find } from 'lodash';
import { Link } from "react-router-dom";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class DatasetDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      csv: '',
      articles: []
    };
  }

  componentDidMount() {
    axios.get('https://api.jsonbin.io/b/61889a55820eda3cc81983bf/12')
      .then(result => {
        this.setState({
          isLoaded: true,
          items: result.data,
        });
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    axios.get("https://s3.us-east-2.amazonaws.com/open-data-portal/" + this.props.match.params.name + ".csv")
      .then(result => {
        this.setState({
          csv: result.data.split('\r\n').slice(0, 9).join('\r\n'),
        });
      },
        (error) => {
          this.setState({
            error
          });
        }
      )
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      targetUrl = 'https://wp.stanforddaily.com/wp-json/wp/v2/posts?_embed&categories=58277'
    // embed adds featured image
    fetch(proxyUrl + targetUrl)
      .then(blob => blob.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          articles: result,
        });
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    let curArticles = [];
    if (this.state.items.length !== 0 && this.state.articles.length !== 0) {
      //console.log('this.state.items' + this.state.items);
      let dataset = find(this.state.items, { "name": this.props.match.params.name });
      //console.log('dataset', dataset);
      console.log('articles', this.state.articles);
      curArticles = dataset.stories.split(',').map((story) => find(this.state.articles, { "slug": story })).filter(e => e)
      console.log(dataset.stories.split(',').map((story) => console.log(story)))
      console.log('curArticles', curArticles);
    }

    if (this.state.items.length === 0) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="datasetDetails">
          <div>
            {this.state.items && this.state.items.map((post) =>
              post.name === this.props.match.params.name &&
              <div>
                <div className="datasetFacts">
                  <Row>
                    <Col>
                    <p className="datasetTitle"> {post.display_name} </p>
                    <div> <b> Data classification:</b> {post.tags} </div>
                    <div><b> Published on:</b> {post.create_date} </div>
                    <div><b> Data Providing Organisation:</b> {post.source} </div>
                    <br></br>
                    </Col>
                    <Col>
                    <div><b> Administrative Contact:</b> <br/> <br/> {post.owner.name} <br/> {post.owner.Org} <br/> {post.owner.phone} <br/> {post.owner.email}  </div>
                    <br></br>
                    <br></br>
                    </Col>
                    

                  </Row>
                  <div>
                      <a href="https://forms.gle/giqJT2LNcyW3umHm7" target="_blank" rel="noopener noreferrer" className="btnSecondary">Request Subscription to Data</a>

                    </div>
                </div>
                <div>

                  <Container className="p-3">

                    <h1 className="header">Overview</h1>
                    <hr />
                    <Row>
                      <Col>
                        <h3>Description</h3>
                        <p>
                        {post.description}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>

                        <h3>Statement of purpose</h3>
                        <p>
                        {post.statement}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>

                        <h3>Meta Axis of data</h3>
                        <dl>
                          <dt>Time</dt>
                          <dd>Verified: {post.meta_time.Verified} <br/> Unverified: {post.meta_time.Unverified}</dd>

                          <dt>Location</dt>
                          <dd>{post.meta_location}</dd>

                          <dt>Who</dt>
                          <dd>{post.meta_who}</dd>
                        </dl>
                      </Col>

                    </Row>



                  </Container>

                  <Container className="">

                    <h1 className="header">Coverage</h1>
                    <hr />
                    <Row>
                      <Col>
                        <h3>Inclusion / Exclusion Criteria</h3>
                        <p>
                        {post.inc_excl}
                        </p>
                      </Col>
                      <Col>

                        <h3>Dataset Period</h3>
                        <p>
                        {post.period}
                        </p>
                      </Col>

                    </Row>



                  </Container>

                  <Container className="p-3">

                    <h1 className="header">Highlights and Known Issues</h1>
                    <hr />
                    <Row>
                      <Col>
                        <h3>Data Highlights</h3>
                        <p>
                        {post.highlights}
                        </p>
                      </Col>
                      <Col>

                        <h3>Known Issues</h3>
                        <p>
                        {post.issues}
                        </p>
                      </Col>

                      </Row>



                  </Container>

                  <Container className="p-3">

                    <h1 className="header">Projects</h1>
                    <hr />
                    <div class="row">
                      <div class="col-6">
                        <p>
                        {post.projects}
                        <ul>
                          {post.project.map((object, i) => <li ><Link to={{pathname: '/projects/' + object.id}}>{object.name} </Link></li>)}
                        </ul>
                        </p>
                      </div>

                    </div>
                  </Container>
                </div>



              </div>
            )}
          </div>
        </div>
      )
    }
  }
}

export default DatasetDetails;