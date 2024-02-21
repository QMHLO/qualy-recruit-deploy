import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, push, update, remove } from "firebase/database";
import { app } from "../firebase";
import { getUnixTime } from "date-fns";
import { Button, Flex } from "antd";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const database = getDatabase(app);

function Posts() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Fetch data from Firebase Realtime Database
    const dataRef = ref(database, "posts");
    onValue(dataRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        const dataArray = Object.entries(userData).map(([id, user]) => ({ id, ...user }));
        setData(dataArray);
      }
      setLoading(false);
    });
  }, [database]);

  const handleAddUser = () => {
    const dataRef = ref(database, "posts");
    const newUser = {
      title: title,
      value: value,
      date: date,
      description: description,
      timestamp: getUnixTime(new Date()), // Add timestamp
    };
    push(dataRef, newUser);
    toast.success("Your post was uploaded.");
    setTitle("");
    setValue("");
    setDate("");
    setDescription("");
    setShowModal(false);
  };

  const handleUpdateUser = () => {
    if (selectedUserId) {
      const dataRef = ref(database, `posts/${selectedUserId}`);
      const updatedUser = {
        title: title,
        value: value,
        date: date,
        description: description,
        timestamp: getUnixTime(new Date()), // Update timestamp
      };
      update(dataRef, updatedUser);
      toast.success("Your post was updated.");
      setTitle("");
      setValue("");
      setDate("");
      setDescription("");
      setSelectedUserId(null);
      setShowModal(false);
    }
  };

  const handleDeleteUser = (id) => {
    // Delete user from Firebase Realtime Database
    const dataRef = ref(database, `posts/${id}`);
    remove(dataRef);
    toast.error("Your post was deleted.");
  };

  const handleSelectUser = (user) => {
    setTitle(user.title);
    setValue(user.value);
    setDate(user.date);
    setDescription(user.description);
    setSelectedUserId(user.id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTitle("");
    setValue("");
    setDate("");
    setDescription("");
    setSelectedUserId(null);
  };

  let count = 1;
  return (
    <>
      {loading && <Loading />}
      <div className="limiter two">
        <h2>Recruiter Posts</h2>
        <div className="txt-center">
          <Button type="primary" onClick={() => setShowModal(true)}>
            Add Post
          </Button>
        </div>
        <div className="container-table100">
          <div className="wrap-table100">
            <div className="table">
              <div className="row header">
                <div className="cell">No</div>
                <div className="cell">Title</div>
                <div className="cell">Salary</div>
                <div className="cell">Date</div>
                <div className="cell">Description</div>
                <div className="cell">Action</div>
              </div>
              {data.map((user) => (
                <div className="row" key={user.id}>
                  <div className="cell">{count++}</div>
                  <div className="cell">{user.title}</div>
                  <div className="cell"> {user.value}</div>
                  <div className="cell"> {user.date}</div>
                  <div className="cell"> {user.description}</div>
                  <div className="cell">
                    <Flex gap="small" justify="center">
                      <Button type="primary" onClick={() => handleSelectUser(user)}>
                        Edit
                      </Button>
                      <Button type="primary" danger onClick={() => handleDeleteUser(user.id)}>
                        Delete
                      </Button>
                    </Flex>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div>
          <div className="modal mb100">
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal}></span>
              <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <input type="text" placeholder="value" value={value} onChange={(e) => setValue(e.target.value)} />
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
              {selectedUserId ? <button onClick={handleUpdateUser}>Update Post</button> : <button onClick={handleAddUser}>Add Post</button>}
            </div>
          </div>
          <div className={`overlay ${showModal ? "show" : ""}`} onClick={() => setShowModal(false)}></div>
        </div>
      )}
    </>
  );
}

export default Posts;
