const chapters = {
    1: {
        title: "Basics",
        description: "Learn basic regex syntax and simple matches.",
        problems: [
            { text: "Hello world!", solution: /Hello/ },
            { text: "Regex is fun!", solution: /Regex/ },
            { text: "I love learning regex!", solution: /regex/ },
            { text: "This is a simple sentence.", solution: /simple/ },
            { text: "Find the word apple in this sentence.", solution: /apple/ },
            { text: "Case matters in Regex", solution: /Regex/ },
            { text: "Match the word dog", solution: /dog/ },
            { text: "Capture the word Regex in this text.", solution: /Regex/ },
            { text: "Locate the word fun.", solution: /fun/ },
            { text: "The quick brown fox jumps over the lazy dog.", solution: /fox/ }
        ]
    },
    2: {
        title: "Character Classes",
        description: "Learn about digit, word, and whitespace classes.",
        problems: [
            { text: "The number is 12345.", solution: /\d+/ },
            { text: "Find words in this sentence.", solution: /\w+/ },
            { text: "Spaces between words are important.", solution: /\s+/ },
            { text: "123 Main St.", solution: /\d+/ },
            { text: "Email me at hello@example.com", solution: /\w+@\w+\.\w+/ },
            { text: "Mix of letters and numbers: A1B2C3", solution: /\w+/ },
            { text: "Tab\tSeparated", solution: /\t/ },
            { text: "Capture all lowercase letters a-z", solution: /[a-z]+/ },
            { text: "Find capital letters A-Z", solution: /[A-Z]+/ },
            { text: "Extract special characters from *&^%$#@!", solution: /[^a-zA-Z0-9]/ }
        ]
    },
    3: {
        title: "Quantifiers",
        description: "Learn how to match multiple occurrences of characters.",
        problems: [
            { text: "ha ha ha ha", solution: /(ha)+/g },
            { text: "Hellooooo there!", solution: /o+/g },
            { text: "Numbers: 1000, 20000, 300000", solution: /\d{3,}/g },
            { text: "Find optional s in color/colour", solution: /colou?r/ },
            { text: "Capture repeating words: go go go!", solution: /(go\s?)+/ },
            { text: "Find all double letters: look, feel, balloon", solution: /(\w)\1/g },
            { text: "Match 'abc' repeated 3 times: abcabcabc", solution: /(abc){3}/ },
            { text: "Find words with at least 5 letters", solution: /\b\w{5,}\b/g },
            { text: "Numbers: 5, 55, 555", solution: /5{2,}/g },
            { text: "Capture at least two vowels together", solution: /[aeiou]{2,}/g }
        ]
    },
    4: {
        title: "Anchors & Boundaries",
        description: "Learn how to use start (^), end ($), and word boundaries (\b).",
        problems: [
            { text: "Start and end markers", solution: /^Start|End$/ },
            { text: "Find words that start with T", solution: /\bT\w+/g },
            { text: "Capture numbers at the end: Order #1234", solution: /\d+$/ },
            { text: "Find lines starting with Hello", solution: /^Hello/gm },
            { text: "Match entire sentence", solution: /^.*$/ },
            { text: "Extract words alone: dog, cat, fish", solution: /\b\w+\b/g },
            { text: "Find question sentences?", solution: /^.*\?$/ },
            { text: "Match digits at the start: 123abc", solution: /^\d+/ },
            { text: "Capture words ending with 'ing'", solution: /\b\w+ing\b/g },
            { text: "Find hashtags: #regex", solution: /#\w+/g }
        ]
    },
    5: {
        title: "Groups & Lookarounds",
        description: "Learn how to use capturing groups, lookaheads, and lookbehinds.",
        problems: [
            { text: "Extract area codes: (123) 456-7890", solution: /\(\d{3}\)/ },
            { text: "Find repeated words: go go go", solution: /(\b\w+\b) \1/g },
            { text: "Find numbers not followed by a letter", solution: /\d+(?![a-zA-Z])/g },
            { text: "Capture words before 'is': This is fun", solution: /(\w+) is/g },
            { text: "Lookaheads: match dollar amounts: $500", solution: /(?<=\$)\d+/g },
            { text: "Lookbehinds: capture price values: $99.99", solution: /(?<=\$)\d+\.\d{2}/ },
            { text: "Match emails without capturing domain", solution: /\w+(?=@)/g },
            { text: "Capture words only when followed by 'ly'", solution: /\w+(?=ly)/g },
            { text: "Find text inside brackets [example]", solution: /\[.*?\]/g },
            { text: "Find words not preceded by 'not'", solution: /(?<!not )\b\w+\b/g }
        ]
    },
    6: {
        title: "Regex Challenges",
        description: "Tackle difficult regex challenges!",
        problems: [
            { text: "Extract all hashtags: #fun #regex", solution: /#\w+/g },
            { text: "Match dates in YYYY-MM-DD format", solution: /\d{4}-\d{2}-\d{2}/g },
            { text: "Find valid hex color codes: #FFA07A", solution: /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g },
            { text: "Extract quoted strings: \"Hello\" and 'World'", solution: /['\"](.*?)['\"]/g },
            { text: "Find valid IPv6 addresses", solution: /([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}/g },
            { text: "Extract time from '14:30:59'", solution: /\b\d{2}:\d{2}:\d{2}\b/g },
            { text: "Match URLs starting with http:// or https://", solution: /https?:\/\/[\w.-]+/g }
        ]
    }
};

let currentChapter = null;
let currentProblemIndex = 0;
let caseSensitive = true;

function loadChapter(chapterNumber) {
    if (!chapters[chapterNumber]) return;
    currentChapter = chapters[chapterNumber];
    currentProblemIndex = 0;
    document.getElementById("chapter-title").textContent = "Chapter " + chapterNumber + ": " + currentChapter.title;
    document.getElementById("chapter-description").textContent = currentChapter.description;
    loadProblem();
}

function loadProblem() {
    if (!currentChapter) return;
    const problem = currentChapter.problems[currentProblemIndex];
    document.getElementById("display-text").innerHTML = problem.text;
    document.getElementById("problem-description").textContent = "Match the required pattern in the text above.";
    document.getElementById("regex-input").value = "";
    document.getElementById("regex-input").style.backgroundColor = "white";
    document.getElementById("success-message").style.display = "none";
    highlightMatches();
}

function updateHighlighting() {
    highlightMatches();
}

function highlightMatches() {
    const problem = currentChapter?.problems[currentProblemIndex];
    if (!problem) return;
    
    const inputRegex = document.getElementById("regex-input").value;
    if (!inputRegex) {
        document.getElementById("display-text").innerHTML = problem.text;
        document.getElementById("regex-input").style.backgroundColor = "white";
        return;
    }
    
    try {
        const flags = caseSensitive ? "g" : "gi";
        const regex = new RegExp(inputRegex, flags);
        const highlightedText = problem.text.replace(regex, match => `<span style='background:yellow; border-radius: 5px;'>${match}</span>`);
        document.getElementById("display-text").innerHTML = highlightedText;
        checkSolution(regex);
    } catch (e) {
        console.error("Invalid regex input");
    }
}

function checkSolution(userRegex) {
    const problem = currentChapter.problems[currentProblemIndex];
    const correctRegex = problem.solution;
    
    if (userRegex.toString() === correctRegex.toString()) {
        document.getElementById("success-message").style.display = "block";
        document.getElementById("regex-input").style.backgroundColor = "#99BC85";
    } else {
        document.getElementById("success-message").style.display = "none";
        document.getElementById("regex-input").style.backgroundColor = "white";
    }
}

function toggleCaseSensitivity() {
    caseSensitive = !caseSensitive;
    highlightMatches();
}

function showHint() {
    alert("Hint: Try looking for the key word or pattern mentioned in the sentence.");
}

function updateHighlighting() {
    let regexInput = document.getElementById("regex-input");
    let successMessage = document.getElementById("success-message");
    
    try {
        let userRegex = new RegExp(regexInput.value);
        let solution = getCurrentSolution(); // Assuming this function returns the expected regex solution

        if (userRegex.source === solution.source) { 
            regexInput.classList.add("correct"); // Apply green background
            successMessage.style.display = "block"; // Show success message
        } else {
            regexInput.classList.remove("correct"); // Revert to default background
            successMessage.style.display = "none"; // Hide success message
        }
    } catch (e) {
        regexInput.classList.remove("correct"); // Revert to default if regex is invalid
        successMessage.style.display = "none"; // Hide success message
    }
}

// Function to hide the success message when moving to the next problem
function nextProblem() {
    document.getElementById("success-message").style.display = "none"; 
    loadNextProblem(); // Assuming this function handles loading the next problem
}

// function nextProblem() {
//     if (currentProblemIndex < currentChapter.problems.length - 1) {
//         currentProblemIndex++;
//         loadProblem();
//     }
// }

function previousProblem() {
    if (currentProblemIndex > 0) {
        currentProblemIndex--;
        loadProblem();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const interactiveArea = document.getElementById("interactive-area");
    interactiveArea.insertAdjacentHTML("beforeend", `
        <button class="styled-button" onclick="previousProblem()">Previous</button>
        <button class="styled-button" onclick="nextProblem()">Next</button>
        <button class="styled-button" onclick="showHint()">Hint</button>
        <label><input type="checkbox" onchange="toggleCaseSensitivity()"> Case Sensitive</label>
    `);
});
