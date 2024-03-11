// Comment form submission
form = document.getElementById("comment-form")

form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get the values from the form inputs
  const name = document.getElementById("name-input").value;
  const comment = document.getElementById("comment-input").value;

  let data = {
    "name": name,
    "comment": comment
}

  fetch("http://127.0.0.1:5000/comments", {
    method : "POST", 
    headers: {"Content-Type": "application/json"},
    body : JSON.stringify(data)
  })
  .then((rensponse) => rensponse.json())
  .then((resp) => {

    // se deu tudo certo ok 
    // create new name to comment
    const newName = document.createElement("div");
    newName.classList.add("comment_name");
    newName.innerHTML = `
    <h4> ${name}</h4>
      `;

    // Create a new comment element
    const newComment = document.createElement("div");
    newComment.classList.add("comment");
    newComment.innerHTML = `
    
      <p>${comment}</p>
    `;

    // Append the new comment to the comment list
    const commentList = document.getElementById("comment-list");
    commentList.appendChild(newName);
    commentList.appendChild(newComment);

    // Clear the form inputs
    document.getElementById("name-input").value = "";
    document.getElementById("comment-input").value = "";

  })
  .catch((error) => console.error(error))
});

