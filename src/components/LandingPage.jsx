import React from 'react';
import './styles.css';
import { Link } from "react-router-dom";
import axios from 'axios';


export default class LandingPage extends React.Component {
  state = {
    selectedOption: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      articles: [],
    };
  }


  componentDidMount() {
    var targetUrl = 'https://wp.stanforddaily.com/wp-json/wp/v2/posts?_embed&categories=58277' 
      // embed adds featured image

    axios.get(targetUrl)
      .then(result => {
        let stories = result.data.slice(0, 3);
        this.setState({
          isLoaded: true,
          articles: stories
        });
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

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
      /*.then(() => {
        let slugs = this.state.items.filter(dataset => dataset.stories !== "").slice(0, 3).map(dataset => dataset.stories);
        console.log(this.state.items);
        for (var i = 0; i < slugs.length; i++) {
          let multipleSlugs = slugs[i].split(",")
          for (var j = 0; j < multipleSlugs.length; j++) {
            targetUrl += '&slug[]=' + multipleSlugs[j];
          }
        }
        console.log(targetUrl);

        fetch(targetUrl)
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
      })*/
  }

  render() {


    return (
      <div className="home">
        <header>
          <div id='info'>
            <h1>Welcome to the<br/>Monash Energy Institute data repository</h1>
            
            <div id='lpbuttons'>
              <Link to="/datasets" className="btnPrimary">Explore data</Link>
              {/*<a href="#" className="btnTertiary">Get alerts</a>  */}
            </div>


          </div>
        </header>

        <div className="newDatasets">
          <h3>Featured Datasets</h3>
          <div className="mini">
            {this.state.items.slice(0, 6).map(dataset =>
              <Link to={{
                pathname: '/datasets/' + dataset.name,
                state: {
                  data: dataset,
                }
              }} className="seeMore">
                <div className="title">
                {dataset.display_name}
              </div>

              <div className="lightTitle"> <b> Data classification:</b> {dataset.tags} </div>
              <div className="lightTitle"><b> Published on:</b> {dataset.create_date} </div>
              <div className="lightTitle"><b> Data Providing Organisation:</b> {dataset.source} </div>
              </Link>
            )
            }
          </div>
          <Link to="/datasets" className="seeMore">See more</Link>
        </div>
      </div>
    );
  }
}
