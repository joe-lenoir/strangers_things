//ALL COPIED FROM POSTS

// You should make a form for users to make new listings. The fields for the form should match the fields that the API expects, and the submit button should be intercepted so that you can create the right fetch request.

//import {  } from "./app.js";
//import {  } from "./auth.js";

const allPosts = {
    title: "example post title",
    description: "example post description",
    price: "$0.00",
    location: "example post location",
    willDeliver: null,
  };
  
  $("#new-post-form").submit(async (event) => {
    event.preventDefault();
    console.log("form submitted");
  
    const postObj = createPostObjFromForm();
    console.log(postObj);
    const response = await createPostAPI(postObj, localStorage.getItem("token"));
    if (response.success) {
      $("#posts").prepend(buildPostElement(response.data.post));
      $("#title").val("");
      $("#description").val("");
      $("#price").val("");
      $("#location").val("");
      $("#will-deliver").prop("checked", false); //see if that works
    } else {
      $("#error-message").html("Sign in to create a post.");
    }
  
    //add new post in response to state (the array of posts)
    //re-render the array of posts in state
  });
  
  function createPostObjFromForm() {
    const title = $("#title").val();
    const description = $("#description").val();
    const price = $("#price").val();
    const location = $("#location").val();
    const willDeliver = $("#will-deliver").prop("checked");
    console.log(willDeliver);
  
    const post = {
      title,
      description,
      price,
      willDeliver,
    };
  
    if (location.length !== 0) {
      post.location = location;
    }
  
    return post;
  }
  
  async function createPostAPI(postObj, token) {
    return fetch(
      "https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: postObj,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch(console.error);
  }
  
  function getPosts() {
    return fetch(
      "https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/posts"
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch(console.error);
  }
  
  //ATTEMPT TO CHECK FOR USER TOKEN (WORK INTO getPosts ABOVE?)
  // async function getPosts(token) {
  //   try {
  //     const response = await fetch(
  //     "https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/posts",
  //     token
  //       ? {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //       : {}
  //   );
  //       const parsedJson = await response.json();
  //       console.log(parsedJson);
  //       return parsedJson.data.posts;
  //     } catch(error){
  //       console.error;
  //     }
  
  async function renderPosts() {
    $("#posts").empty();
  
    const result = await getPosts();
    const posts = result.data.posts;
  
    posts.forEach(function (postObj) {
      const postElement = buildPostElement(postObj);
      $("#posts").prepend(postElement);
    });
  }
  
  renderPosts();
  
  function buildPostElement(postObj) {
    return `<div class="newPost">
      <div id="post-title">${postObj.title}</div>
      <div id="description">${postObj.description}</div>
      <div id="price">Price: ${postObj.price}</div>
      <div id="location">Location: ${postObj.location}</div>
      <div id="willDeliver">Will deliver: ${postObj.willDeliver}</div>
      <button id="send-post-message">Send Message</button>
      <button id="delete-post">I posted this and want to delete it</button>
      <button id="delete-post">I posted this and want to edit it</button>
      <div id="message"></div>
    </div>`;
  }
  
  // if isAuthor === true {
  //   delete post
  // }
  // else {
  //   $("#message").text("You can only delete your own posts");
  // }
  
  //bootstrap function that calls getPosts, stores posts in state, renders posts that are in state
  
  //have not tested this one yet, just pulled it from api docs for later use
  async function editPost(postObj, token) {
    return fetch(
      "https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/posts/POST_ID",
      //not sure if that /POST_ID is what is needed or is a placeholder from the api docs
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: postObj,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        //return result;
      })
      .catch(console.error);
  }
  
  //have not tested this one yet, just pulled it from api docs for later use
  async function deletePost(postObj, token) {
    return fetch(
      "https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/posts/POST_ID",
      //not sure if that /POST_ID is what is needed or is a placeholder
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        //return result;
      })
      .catch(console.error);
  }
  
  $("#delete-post").click(function (event) {
      console.log("so you want to delete a post eh?")
      //deletePost();
    });
  
  
  