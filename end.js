document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

finalScore.innerText = "Socre: " + mostRecentScore + " pts";
