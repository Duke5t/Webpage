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
        title: "Advanced Applications",
        description: "More complex regex problems to test your skills.",
        problems: [
            { text: "Contact us at support@example.com or admin@site.org.", solution: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g },
            { text: "<a href=\"https://example.com\">Click here</a>", solution: /href=\"(.*?)\"/g },
            { text: "She said, \"Hello world\" with excitement.", solution: /".*?"/g },
            { text: "MySecureP@ssword1!", solution: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ },
            { text: "The values are 1,200, 3,450, and 78,900.", solution: /\d{1,3}(,\d{3})*/g },
            { text: "Visit https://www.google.com or http://example.org", solution: /https?:\/\/(www\.)?([\w-]+\.\w+)/g },
            { text: "London and Paris are beautiful cities.", solution: /\b[A-Z][a-z]*\b/g },
            { text: "userName, total_price, getData", solution: /\b[a-z]+(?:[A-Z][a-z]*|_[a-z]+)*\b/g },
            { text: "192.168.1.1 is a valid IP.", solution: /\b(?:\d{1,3}\.){3}\d{1,3}\b/ },
            { text: "Rhythm myths crypts", solution: /\b\w*[aeiouAEIOU]\w*\b/g }
        ]
    }
};

// Reference to the relevant DOM elements
const chapterSelect = document.getElementById('chapterSelect');
const problemContainer = document.getElementById('problemContainer');
const regexInput = document.getElementById('regexInput');
const regexFeedback = document.getElementById('regexFeedback');
const expectedAnswer = document.getElementById('expectedAnswer');
const nextProblemButton = document.getElementById('nextProblemButton');
let currentChapterIndex = 1;
let currentProblemIndex = 0;

function loadProblem(chapterIndex, problemIndex) {
    const chapter = chapters[chapterIndex];
    const problem = chapter.problems[problemIndex];

    // Clear previous feedback and input
    regexFeedback.textContent = '';
    expectedAnswer.textContent = '';
    regexInput.value = '';
    nextProblemButton.style.display = 'none';

    // Highlight the portion of the text that needs to be matched
    const highlightedText = problem.text.replace(problem.solution, `<span class="highlight">${problem.solution.source}</span>`);
    problemContainer.innerHTML = `
        <p>Match only the highlighted part of the string below:</p>
        <p>${highlightedText}</p>
    `;

    // Set expected solution
    expectedAnswer.textContent = `Expected answer: ${problem.solution.source}`;

    regexInput.focus();
}

function checkAnswer() {
    const chapter = chapters[currentChapterIndex];
    const problem = chapter.problems[currentProblemIndex];
    const userRegex = new RegExp(regexInput.value);

    if (userRegex.test(problem.text)) {
        regexFeedback.textContent = 'Correct!';
        nextProblemButton.style.display = 'inline-block';
    } else {
        regexFeedback.textContent = 'Incorrect, try again.';
    }
}

// Move to the next problem
nextProblemButton.addEventListener('click', () => {
    currentProblemIndex++;
    if (currentProblemIndex >= chapters[currentChapterIndex].problems.length) {
        currentProblemIndex = 0; // Reset to the first problem in the chapter
    }
    loadProblem(currentChapterIndex, currentProblemIndex);
});

// Load the initial problem when the page loads
chapterSelect.addEventListener('change', () => {
    currentChapterIndex = parseInt(chapterSelect.value, 10);
    currentProblemIndex = 0;
    loadProblem(currentChapterIndex, currentProblemIndex);
});

// Initially load the first problem from Chapter 1
loadProblem(currentChapterIndex, currentProblemIndex);
