import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date,source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'91%', zIndex:'1'}}>
                {source}
              </span>
          <img
            src={
              !imageUrl
                ? "https://images.hindustantimes.com/tech/img/2022/08/10/1600x900/FZqff1FXwAEc2Um_1660114507702_1660114537909_1660114537909.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
           
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Anonymous"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
