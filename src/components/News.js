import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 18,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor() {
    super(); //Always used when we create constructor
    console.log("Hello I am a constructir from news component");

    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d6753bb2566b4e95bef87f64a633187e&page=${this.state.page}pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url); //fetch api takes url and returns a promise
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    //Sbse phle constructor aaega phir render phir cdm , async func waits for some promises to fullfill
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d6753bb2566b4e95bef87f64a633187e&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url); //fetch api takes url and returns a promise
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false,
    }); // articl ko set kr rhe parsed.article k brabr
    // this.updateNews()
  }

  handlePreviousClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d6753bb2566b4e95bef87f64a633187e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url); //fetch api takes url and returns a promise
    // let parsedata = await data.json();
    // console.log(parsedata);
    // this.setState({
    //   articles: parsedata.articles,
    //   page: this.state.page - 1,
    //   loading: false,
    // });
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  handleNextClick = async () => {
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
      //pageSize=18 taken in App.js
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=d6753bb2566b4e95bef87f64a633187e&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url); //fetch api takes url and returns a promise
      let parsedata = await data.json();
      console.log(parsedata);
      this.setState({
        articles: parsedata.articles,
        page: this.state.page + 1,
        loading: false,
      });
      // this.setState({page: this.state.page + 1})
      // this.updateNews()
    }
  };
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d6753bb2566b4e95bef87f64a633187e&page=${this.state.page}pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url); //fetch api takes url and returns a promise
    let parsedata = await data.json();
    console.log(parsedata);
    console.log("Hello as ca uctir from news component");
    this.setState({
      articles: this.state.articles.concat(parsedata.articles),
      totalResults: parsedata.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <>
        <h1
          className="text-center"
          style={{ margin: `25px 0px`, marginTop: `90px` }}
        >
          Mai News Hun!
        </h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        <section
          style={{
            backgroundColor: `crimson`,
            color: `white`,
            paddingTop: `15px`,
            paddingBottom: `3px`,
            textAlign: `center`,
            fontSize: `14px`,
          }}
        >
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <p>Copyright &copy;2020. All Rights Reserved</p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default News;
