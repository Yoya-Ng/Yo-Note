import React, { useState, useEffect } from "react";

// const [posts, setPosts] = useState([]);

// fetch('https://jsonplaceholder.typicode.com/posts?_limit=10' ,{ method: "GET"})
//    .then(response => response.json())
//    .then(data => console.log(data));

// useEffect(() => {
//   // 在这里获取数据
// }, []);

const Greeting = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=1")
      .then((response) => response.json())
      .then((data) => {
        console.log("OK~~~~" , data);
        setPosts(data);
      })
      .catch((err) => {
        console.log("ERROR~~~~" , err.message);
      });
  }, []);


  return (
    <div className="posts-container">
    <h1>*API Demo</h1>
      {posts.map((post) => {
        return (
          <div className="post-card" key={post.id}>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.body}</p>
            <div className="button">
              <div className="delete-btn">Delete</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Greeting;
