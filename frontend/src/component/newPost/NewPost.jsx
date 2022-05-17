import React, { useState, useEffect } from "react";
import "./newPost.css";
import { Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { createNewPostAction } from "../../Actions/Posts";

const NewPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const dispatch = useDispatch();

  const { isLoading, error, message } = useSelector((state) => state.like);

  const handleOnImgChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    dispatch(createNewPostAction(caption, image));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  return (
    <div className="newPost">
      {" "}
      <form className="newPostForm" onSubmit={handleOnSubmit}>
        <Typography variant="h3">New posts</Typography>

        {image && <img src={image} alt="postImages" />}

        <input type="file" accept="image/*" onChange={handleOnImgChange} />
        <input
          type="text"
          placeholder="Caption"
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button disabled={isLoading} type="submit">
          Post
        </Button>
      </form>
    </div>
  );
};

export default NewPost;
