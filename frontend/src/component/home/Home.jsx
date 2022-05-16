import React from "react";
import User from "../User/User";
import "./Home.css";
import Post from "../Post/Post";

const Home = () => {
  // const { user } = useSelector((state) => state.user);
  return (
    <div className="home">
      <div className="homeleft">
        <Post
          postImages={`https://cdn.pixabay.com/photo/2015/10/07/12/17/post-976115_960_720.png`}
          ownerName={"Mark Zukenburg"}
          caption={"This is sample post"}
          // isAccount={true}
          // isDelete={true}
        />
        <Post
          postImages={`https://cdn.pixabay.com/photo/2015/10/07/12/17/post-976115_960_720.png`}
          ownerName={"Mark Zukenburg"}
          caption={"This is sample post"}
          // isAccount={true}
          // isDelete={true}
        />
        <Post
          postImages={`https://cdn.pixabay.com/photo/2015/10/07/12/17/post-976115_960_720.png`}
          ownerName={"Mark Zukenburg"}
          caption={"This is sample post"}
          // isAccount={true}
          // isDelete={true}
        />
        <Post
          postImages={`https://cdn.pixabay.com/photo/2015/10/07/12/17/post-976115_960_720.png`}
          ownerName={"Mark Zukenburg"}
          caption={"This is sample post"}
          // isAccount={true}
          // isDelete={true}
        />
      </div>
      <div className="homeright">
        <User
          userId={"user._id"}
          name={"Mark Zukenburg"}
          avatar={
            "https://imageio.forbes.com/specials-images/imageserve/5c76b7d331358e35dd2773a9/0x0.jpg?format=jpg&crop=4401,4401,x0,y0,safe&height=416&width=416&fit=bounds"
          }
        />
      </div>
    </div>
  );
};

export default Home;
