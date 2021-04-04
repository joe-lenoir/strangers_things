// You should make a form for users to make new listings. The fields for the form should match the fields that the API expects, and the submit button should be intercepted so that you can create the right fetch request.

//import {  } from "./auth.js";
//import {  } from "./auth.js";

allPosts = {
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
  const response = await createPostAPI(postObj);
  //next: render the new posts
  //renderPosts();
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

async function createPostAPI(postObj){
    //fetch, create post, return
}

// function renderPosts() {
//     $("#new-post-form.content").empty();

//     allPosts.forEach(function (postObj) {
//       const postElement = createPostObjFromForm(postObj);
//         $("#posts").append(postObj);
//       }
//   };
  
//   renderPosts();