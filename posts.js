// You should make a form for users to make new listings. The fields for the form should match the fields that the API expects, and the submit button should be intercepted so that you can create the right fetch request.

//import {  } from "./app.js";
//import {  } from "./auth.js";

const allPosts = {
    title: "example post title",
    description: "example post description",
    price: "$0.00",
    location: "example post location",
    willDeliver: null,
}

$("#new-post-form").submit( async (event) => {
  event.preventDefault();
  console.log("form submitted");

  const postObj = createPostObjFromForm();
  console.log(postObj);
  const response = await createPostAPI(postObj, localStorage.getItem("token"));


 //add new post in response to state (the array of posts)
 //re-render the array of posts in state
} )



function createPostObjFromForm(){
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
        willDeliver
    }

    if (location.length !== 0){
        post.location = location
    }

return post;
}

async function createPostAPI(postObj, token){
    return fetch('https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/posts', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          post: postObj
        })
      }).then(response => response.json())
        .then(result => {
          console.log(result);
          return result;
        })
        .catch(console.error);   //fetch, create post, return
}

function getPosts(){
  return fetch('https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/posts')
  .then(response => response.json())
  .then(result => {
    console.log(result);
    return result;
  })
  .catch(console.error);
}

function renderPosts(posts) {
    $("#posts").empty();

    posts.forEach(function (postObj) {
      const postElement = buildPostElement(postObj);
        $("#posts").append(postElement);
    })
};

  renderPosts();

  function buildPostElement(){
      //see API docs, include location, willDeliver, price, location 
      //see art collector project renderEntities/buildElement function, forEach callback
  }

  //bootstrap function that calls getPosts, stores posts in state, renders posts that are in state