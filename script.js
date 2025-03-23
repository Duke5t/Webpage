const chapters = {
    1: {
        title: "Basics",
        description: "Learn basic regex syntax and simple matches.",
        problems: [
            { text: "Hello world!", solution: /Hello/ },
            { text: "Regex is fun!", solution: /Regex/ }
        ]
    },
    2: {
        title: "Character Classes",
        description: "Learn about digit, word, and whitespace classes.",
        problems: [
            { text: "The number is 12345.", solution: /\d+/ },
            { text: "Find words in this sentence.", solution: /\w+/g }
        ]
    }
};

let currentChapter = null;
let currentProblemIndex = 0;

function loadChapter(chapterNumber) {
    currentChapter = chapters[chapterNumber];
    currentProblemIndex = 0;
    document.getElementById("chapter-title").textContent = "Chapter " + chapterNumber + ": " + currentChapter.title;
    document.getElementById("chapter-description").textContent = currentChapter.description;
    loadProblem();
}

function loadProblem() {
    if (!currentChapter) return;
    const problem = currentChapter.problems[currentProblemIndex];
    document.getElementById("display-text").textContent = problem.text;
    document.getElementById("problem-description").textContent = "Match the required pattern in the text above.";
    document.getElementById("regex-input").value = "";
    document.getElementById("success-message").style.display = "none";
}

function updateHighlighting() {
    const regexInput = document.getElementById("regex-input").value;
    const displayText = document.getElementById("display-text");
    const problem = currentChapter.problems[currentProblemIndex];
    
    try {
        const regex = new RegExp(regexInput, "g");
        const matches = displayText.textContent.match(regex);
        
        if (matches && JSON.stringify(matches) === JSON.stringify(problem.text.match(problem.solution))) {
            document.getElementById("regex-input").style.backgroundColor = "lightgreen";
            document.getElementById("success-message").style.display = "block";
        } else {
            document.getElementById("regex-input").style.backgroundColor = "white";
            document.getElementById("success-message").style.display = "none";
        }
    } catch (e) {
        document.getElementById("regex-input").style.backgroundColor = "white";
        document.getElementById("success-message").style.display = "none";
    }
}
