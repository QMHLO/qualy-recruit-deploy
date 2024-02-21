import React from "react";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, push, update, remove } from "firebase/database";
import { app } from "../firebase";
import { format } from "date-fns"; // Import format function from date-fns
const database = getDatabase(app);

function CompanyData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from Firebase Realtime Database
    const dataRef = ref(database, "posts");
    onValue(dataRef, (snapshot) => {
      const postData = snapshot.val();
      if (postData) {
        const dataArray = Object.entries(postData).map(([id, post]) => ({ id, ...post }));
        const sortedData = dataArray.sort((a, b) => b.timestamp - a.timestamp); // Sort by timestamp
        // Get the latest 3 posts
        // const latestPosts = sortedData.slice(0, 3);

        setData(sortedData);
      }
    });
  }, [database]); // Added dependency to ensure useEffect runs when database changes
  return (
    <div className="jobs-list">
      {data.map((post) => (
        <div className="job-card" key={post.id}>
          <h4 className="card-ttl">{post.title}</h4>
          <div className="desc">
            <div className="left">
              <span>Full-time employee</span>
              <span>MMK　{post.value}〜</span>
            </div>
            <div className="right">
              Recruitment deadline<span className="date">{format(new Date(post.date), "yyyy.M.dd")}</span>
            </div>
          </div>
          <p className="detail">{post.description}</p>
        </div>
      ))}
    </div>
  );
}

export default CompanyData;
