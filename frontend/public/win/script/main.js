
document.addEventListener('DOMContentLoaded', function() {
  const playAgainButton = document.getElementById('playagain-button');
  playAgainButton.addEventListener('click', function() {

    console.log("enter event listener")

    localStorage.setItem("roomcode", "")
  });
});