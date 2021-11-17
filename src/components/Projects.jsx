import React from 'react';
import axios from 'axios';
import './styles.css';
import Fuse from "fuse.js";
import locationIcon from './static/locationIcon.png';
import buildingIcon from './static/buildingIcon.png';
import dollarIcon from './static/dollarIcon.png';
import Select from 'react-select';
import { Link } from "react-router-dom";

const typeOptions = [
  { value: 'Verified', label: 'Verified' },
  { value: 'Verified with Some Unverified', label: 'Verified with Some Unverified' },
  { value: 'Raw', label: 'Raw' },
  { value: 'Raw-Real Time', label: 'Raw-Real Time' },
];

const DataClassificaitonOptions = [
  { value: 'Very Sensitive', label: 'Very Sensitive' },
  { value: 'Sensitive', label: 'Sensitive' },
  { value: 'Restricted', label: 'Restricted' },
  { value: 'Public', label: 'Public' },
];

const sortOptions = [
  { value: 'alphabetical', label: 'A-Z' },
  { value: 'reverse', label: 'Z-A' },
  { value: 'date', label: 'Date (Newest First)' },
  { value: 'reverse-date', label: 'Date (Oldest First)' }
]

class Projects extends React.Component {
  state = {
    selectedOption: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      filteredItems: [],
      locationFilter: [],
      n_datasets: 0,
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSortBy = this.handleSortBy.bind(this)
  }

  handleChange(val) {
    var filteredItems = [];
    if (!val) { // if an element is unselected (small X), so the value is null...
      filteredItems = this.state.items;
    }
    else if (val.length === 0) {  // if all selections are cleared (the big X is clicked)...
      filteredItems = this.state.items; // reset items

    }
    else {
      //val is the set of filters
      const vals = val.map((v) => v.value);
      let items = this.state.items;
      let final = (vals === undefined || vals.length === 0) ? items :
        items.filter((post) => {
          return vals.includes(post.tags);
        });
      filteredItems = final;
    }
    this.setState(
      {
        filteredItems: filteredItems,
      });
  }

  handleSortBy(val) {
    let sortby = val.value;
    let sortedItems = [...this.state.items];
    let fsortedItems = [...this.state.filteredItems];
    if (sortby === 'alphabetical') {
      sortedItems.sort((p, q) => (p.display_name > q.display_name) ? 1 : (q.display_name > p.display_name) ? -1 : 0);
      fsortedItems.sort((p, q) => (p.display_name > q.display_name) ? 1 : (q.display_name > p.display_name) ? -1 : 0);
    }
    else if (sortby === 'reverse') {
      sortedItems.sort((p, q) => (p.display_name > q.display_name) ? -1 : (q.display_name > p.display_name) ? 1 : 0);
      fsortedItems.sort((p, q) => (p.display_name > q.display_name) ? -1 : (q.display_name > p.display_name) ? 1 : 0);
    }
    else if (sortby === 'date') {
      sortedItems.sort((p, q) => (Date.parse(q.create_date) - Date.parse(p.create_date)));
      fsortedItems.sort((p, q) => (Date.parse(q.create_date) - Date.parse(p.create_date)));
    }
    else if (sortby === 'reverse-date') {
      sortedItems.sort((p, q) => (Date.parse(p.create_date) - Date.parse(q.create_date)));
      fsortedItems.sort((p, q) => (Date.parse(p.create_date) - Date.parse(q.create_date)));
    }
    this.setState({ items: sortedItems });
    this.setState({ filteredItems: fsortedItems });
  }

  componentDidMount() {
    axios.get('https://api.jsonbin.io/b/6194506b01558c731cc3a286/2')
      .then(result => {
        this.setState({
          isLoaded: true,
          items: result.data.sort((p, q) => (Date.parse(q.create_date) - Date.parse(p.create_date))),
          filteredItems: result.data.sort((p, q) => (Date.parse(q.create_date) - Date.parse(p.create_date))),
        });
        //console.log(result.data)
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  searchKey = (e) => {
    const term = e.target.value;
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "name",
        "description"
      ]
    };
    const fuse = new Fuse(this.state.items, options);
    const newFilteredItems = fuse.search(term);
    if ((typeof (term) === "undefined") || (term.length === 0)) {
      this.setState({
        filteredItems: this.state.items
      })
    } else {
      this.setState({
        filteredItems: newFilteredItems,
      });
    }
  }
  result(params) {
    console.log(params);
  }

  render() {
    const { selectedOption } = this.state;

    return (
      <div>
        <div className="sideBar desktop">
          <div className="greenBackground">
            <h1>What's this?</h1>
            <p>Work with other researchers in the Data Portal's secure analysis area - accessible anywhere with an internet connection. Process and analyse  datasets on SERP platform and publish your research findings.</p>
           
          </div>
        </div>
        <div id="datasetsAnchor" className="mainContent">
          <div className="datasetFilters">
            <input type="search" id="searchInput" onChange={e => this.searchKey(e)} placeholder="Search by dataset, project category, description, etc." name="search" />
            <div id="filterDropdowns">
              <div className="filter">
                <label className="marginRight">Dataset used</label>
                <span className="marginRight">
                  <Select
                    value={selectedOption} isMulti
                    placeholder={'All datasets'}
                    onChange={this.handleChange}
                    options={typeOptions}
                    theme={theme => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary25: '#9FE5D8',
                        primary: '#11BF9F',
                      },
                    })}
                  />
                </span>
              </div>
              <div className="filter">
                <label className="marginRight">Project Type</label>
                <span className="marginRight">
                  <Select
                    value={selectedOption} isMulti
                    placeholder={'All Project Types'}
                    onChange={this.handleChange}
                    options={DataClassificaitonOptions}
                    theme={theme => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary25: '#9FE5D8',
                        primary: '#11BF9F',
                      },
                    })}
                  />
                </span>
              </div>
              <div className="filter">
                <label className="marginRight">Sort By</label>
                <span className="marginRight">
                  <Select
                    value={selectedOption}
                    placeholder={'All Data Types'}
                    onChange={this.handleSortBy}
                    options={sortOptions}
                    theme={theme => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary25: '#9FE5D8',
                        primary: '#11BF9F',
                      },
                    })}
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="lightTitle">{this.state.filteredItems.length} Projects found</div>
          <ul id="datasetList" className="list">
            {this.state.filteredItems.map(post =>
              <div>
                <Link to={{
                  pathname: '/projects/' + post.name,
                  state: {
                    data: post,
                  }
                }}></Link>
                <ProjectCard
                  display_name={post.display_name}
                  description={post.description}
                  date={post.create_date}
                  source_url={post.source_url}
                  name={post.name}
                  tag={post.tags}
                  source={post.source}
                />
              </div>
            )}
          </ul>
        </div>
        <div className="clear"></div>
      </div>);
  }
}

function ProjectCard(props) {
  //var excerpt = props.excerpt.replace(/<\/?[^>]+(>|$)/g, ""); // strip description excerpt of HTML tags
  return (
    <div>
      <li>
        <Link to={{
          pathname: "/projects/" + props.name,
          state: {
            data: props,
          }
        }}>
          <div className="datasetTitle">{props.display_name}</div>
          <div className="datasetFacts">
            <span>
              <img className="icon" src={dollarIcon} alt="" />
              {props.tag}
            </span>
            <span>
              <img className="icon" src={locationIcon} alt="" />
              {props.date}
            </span>
            <span>
              <img className="icon" src={buildingIcon} alt="" />
              {props.source}
            </span>
          </div>
          <div className="datasetInfo">
            {props.description}
          </div>
        </Link>
      </li>
    </div>
  );
}

export default Projects;
