$(document).ready(() => {
  $.get("https://jsonplaceholder.typicode.com/posts", (posts) => {
    posts.slice(0, 3).forEach((post) => {
      var postId = post.id;
      var postTitle = post.title;
      var postBody =
        post.body.length > 30 ? post.body.substring(0, 30) + "..." : post.body;

      var tableRow = $("<tr>").append(
        $("<td>").text(postId),
        $("<td>").text(postTitle),
        $("<td>").text(postBody),
        $("<td>").addClass("comments-row")
      );
      $("#postTable").append(tableRow);

      var spinner = $("<div>")
        .addClass("spinner-border text-secondary")
        .attr("role", "status");
      spinner.append(
        $("<span>").addClass("visually-hidden").text("Loading...")
      );
      tableRow.find(".comments-row").append(spinner);

      $.get(
        "https://jsonplaceholder.typicode.com/comments?postId=" + postId,
        (comments) => {
          if (comments.length > 0) {
            var commentBody = comments[0].body;
            var commentDiv = $("<div>").addClass("post-comments");
            var commentRow = $("<div>").append($("<p>").text(commentBody));
            commentDiv.append(commentRow);
            spinner.remove();
            tableRow.find(".comments-row").append(commentDiv);
          } else {
            spinner.remove();
            tableRow.find(".comments-row").text("No comments");
          }
        }
      );
    });
  });
});
