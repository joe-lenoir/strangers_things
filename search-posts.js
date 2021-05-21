//MOST OF THIS FILE IS COPIED FROM A SEARCH FORM APP DEMO 
//NOT WORKED ON YET

const POSTS_URL = "https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/posts";

const searchForm = $(".search-form");
const searchField = $("#search-field");
const allPosts = $("posts");

const state = {
    todos: []
};

const fetchTodos = async () => {
    try {
        throw new Error("oh no");
        const response = await fetch(TODOS_URL);
        return response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const buildTodo = ({ title, completed }) => {
    if (!title)
        return "";

    return $(`
        <li>${title} - ${completed ? "complete" : "incomplete"}</li>
    `);
};

const renderTodos = (todos) => {
    allPosts.empty();

    todos.forEach((todoObj) => {
        allPosts.append(buildTodo(todoObj));
    });
};

const initApp = () => {
    fetchTodos()
        .then((todos) => {
            state.todos = todos;
            renderTodos(state.todos);
        })
        .catch(() => {
            $("h1").text("Failed to load todos... please refresh!");
        });
};

searchForm.on("submit", (event) => {
    event.preventDefault();
    console.log("prevented");
    
    const searchValue = searchField.val();

    if (!searchValue) {
        renderTodos(state.todos);
        return;
    }

    const searchTerms = searchValue
        .toLowerCase()
        .split(" ");

    // Array.from(allPosts.children()).forEach((child, idx) => {
    // use Jquery .each instead of .forEach
    // allPosts.children().each((idx, li) => {
    //     const listItemWords = li
    //         .text()
    //         .toLowerCase()
    //         .split(" ");

    //     const isMatch = listItemWords.some((word) => {
    //         return searchTerms.some(
    //             (searchTerm) => searchTerm === word
    //         );
    //     });

    //     if (isMatch) {
    //         li.css("display", "block");
    //     } else {
    //         li.css("display", "none");
    //     }
    // });

    const matches = state.todos.filter((todoObj) => {
        const titleWords = todoObj
            .title
            .toLowerCase()
            .split(" ");

        const isMatch = titleWords.some((word) => {
            return searchTerms.some(
                (searchTerm) => searchTerm === word
            );
        });

        return isMatch;
    });

    renderTodos(matches);
});

initApp();
