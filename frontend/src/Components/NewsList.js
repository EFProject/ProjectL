import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewsList = ({ data }) => {
  const { events } = data;
  return (
    <div className="container mt-4">
      {console.log(events)}
      <h1 className="mb-4">Latest News</h1>
      {!events ? (
        <p>Loading news...</p>
      ) : (
        <div className="row">
          {events.map((item) => (
            <div className="col-md-4" key={item.id}>
              <div className="card mb-4">
                <img
                  src={item.imageUrl}
                  className="card-img-top"
                  alt={item.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <a
                    href={item.link}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsList;
