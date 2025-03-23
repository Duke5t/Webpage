document.addEventListener("DOMContentLoaded", function () {
    // Attach click listeners to chapter buttons dynamically
    document.querySelectorAll("#menu li").forEach((li, index) => {
        li.addEventListener("click", () => loadChapter(index + 1));
    });

    // Add event listener for success button (created dynamically later)
    document.body.addEventListener("click", function (event) {
        if (event.target.id === "next-problem-btn") {
            nextProblem();
        }
    });
});

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
            { text: "Find words in this sentence.", solution: /\w+/g },
            { text: "Spaces between words are important.", solution: /\s+/g },
            { text: "123 Main St.", solution: /\d+/ },
            { text: "Email me at hello@example.com", solution: /\w+@\w+\.\w+/ },
            { text: "Mix of letters and numbers: A1B2C3", solution: /\w+/g },
            { text: "Tab\tSeparated", solution: /\t/ },
            { text: "Capture all lowercase letters a-z", solution: /[a-z]+/g },
            { text: "Find capital letters A-Z", solution: /[A-Z]+/g },
            { text: "Extract special characters from *&^%$#@!", solution: /[^a-zA-Z0-9]/g }
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



document.addEventListener("DOMContentLoaded", function () {
    // Add click event listeners for chapter buttons
    document.querySelectorAll("#menu li").forEach((item, index) => {
        item.addEventListener("click", () => loadChapter(index + 1));
    });
});

let currentChapter = null;
let currentProblemIndex = 0;

function loadChapter(chapterNumber) {
    console.log("Loading chapter:", chapterNumber);
    if (!chapters[chapterNumber]) {
        console.error("Error: Chapter " + chapterNumber + " does not exist.");
        return;
    }

    currentChapter = chapters[chapterNumber];
    currentProblemIndex = 0;
    document.getElementById("chapter-title").textContent = `Chapter ${chapterNumber}: ${currentChapter.title}`;
    document.getElementById("chapter-description").textContent = currentChapter.description;
    loadProblem();
}

function loadProblem() {
    if (!currentChapter) return;
    
    const problem = currentChapter.problems[currentProblemIndex];
    const displayTextElem = document.getElementById("display-text");
    const problemDescriptionElem = document.getElementById("problem-description");
    
    // Highlight the matched portion
    const regex = problem.solution;
    const highlightedText = problem.text.replace(regex, match => `<mark>${match}</mark>`);
    
    problemDescriptionElem.innerHTML = `Match only: <strong>${regex}</strong>`;
    displayTextElem.innerHTML = highlightedText;
    
    document.getElementById("regex-input").value = "";
    document.getElementById("success-message").style.display = "none";
    document.getElementById("expected-answer").style.display = "none";
}

function checkAnswer() {
    if (!currentChapter) return;
    
    const problem = currentChapter.problems[currentProblemIndex];
    const userInput = document.getElementById("regex-input").value;
    const regex = problem.solution;
    const testString = problem.text;
    const expectedAnswerElem = document.getElementById("expected-answer");
    
    try {
        const userRegex = new RegExp(userInput);
        if (userRegex.test(testString) && userRegex.toString() === regex.toString()) {
            document.getElementById("success-message").style.display = "block";
            expectedAnswerElem.textContent = `Expected answer: ${regex}`;
            expectedAnswerElem.style.display = "block";
        } else {
            document.getElementById("success-message").style.display = "none";
            expectedAnswerElem.style.display = "none";
        }
    } catch (error) {
        console.error("Invalid regex input:", error);
    }
}

function nextProblem() {
    if (!currentChapter || currentProblemIndex >= currentChapter.problems.length - 1) return;
    currentProblemIndex++;
    loadProblem();
}
