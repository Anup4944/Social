import React, { useState, useEffect } from "react";
import "./newPost.css";
import { Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { createNewPostAction } from "../../Actions/Posts";
import { loadUserAction } from "../../Actions/User";
import toast, { Toaster } from "react-hot-toast";

const NewPost = ({ inline = false }) => {
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

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createNewPostAction(caption, image));
    dispatch(loadUserAction());
    setImage(null);
    setCaption("");
  };

  useEffect(() => {
    if (inline) return;
    if (error) {
      toast.error(`${error}`);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      toast(`${message}`, {
        duration: 4000,
        position: "top-center",
        icon: "👏",
        iconTheme: { primary: "#000", secondary: "#fff" },
      });
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message, inline]);

  return (
    <div className={inline ? "newPostHome" : "newPost"}>
      <form className="newPostForm" onSubmit={handleOnSubmit}>
        {!inline && <Toaster />}
        <Typography variant={inline ? "h6" : "h4"}>New Post</Typography>

        {image && <img src={image} alt="postImages" />}

        <input type="file" accept="image/*" onChange={handleOnImgChange} />
        <textarea
          placeholder="Your Caption"
          value={caption}
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
