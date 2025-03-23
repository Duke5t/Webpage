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
        title: "Groups & Capturing",
        description: "Learn about capturing groups and backreferences.",
        problems: [
            { text: "Find duplicated words: go go go!", solution: /(\b\w+\b) \1/g },
            { text: "Extract area codes from (123) 456-7890", solution: /\((\d{3})\)/ },
            { text: "Match repeated sequences: abab, cdcd", solution: /(\w{2})\1/g },
            { text: "Extract name from 'Hello, my name is John'", solution: /name is (\w+)/ },
            { text: "Find HTML tags <b>bold</b>", solution: /<(\w+)>.*?<\/\1>/g },
            { text: "Capture repeated letters in 'bookkeeper'", solution: /(.)\1/g },
            { text: "Extract digits from 'Price: $12.99'", solution: /\$(\d+\.\d{2})/ },
            { text: "Find 'the' followed by a word: the cat", solution: /the (\w+)/ },
            { text: "Match parenthetical statements: (like this)", solution: /\((.*?)\)/g },
            { text: "Extract quoted words: 'Hello world'", solution: /'(.*?)'/g }
        ]
    },
    5: {
        title: "Assertions & Lookarounds",
        description: "Learn about lookaheads and lookbehinds.",
        problems: [
            { text: "Find words ending in 'ing': running, walking", solution: /\b\w+(?=ing)\b/g },
            { text: "Match numbers only if preceded by '$'", solution: /(?<=\$)\d+/g },
            { text: "Find 'foo' only if NOT preceded by 'bar'", solution: /(?<!bar)foo/g },
            { text: "Extract numbers only if followed by 'kg'", solution: /\d+(?=kg)/g },
            { text: "Capture words that are NOT 'apple'", solution: /(?!apple)\b\w+\b/g },
            { text: "Find letters only if followed by digits: A1, B2", solution: /[A-Za-z](?=\d)/g },
            { text: "Match 'hello' unless followed by 'world'", solution: /hello(?! world)/g },
            { text: "Extract phone area codes: (555) 123-4567", solution: /(?<=\()\d{3}(?=\))/g },
            { text: "Find words only at start of line", solution: /^\w+/gm },
            { text: "Extract domain from email: user@example.com", solution: /(?<=@)\w+\.\w+/g }
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
