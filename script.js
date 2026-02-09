const loveQuotes = [
    { text: "You are my today and all of my tomorrows.", author: "Leo Christopher" },
    { text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.", author: "Maya Angelou" },
    { text: "I love you not only for what you are, but for what I am when I am with you.", author: "Roy Croft" },
    { text: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn" },
    { text: "Love is composed of a single soul inhabiting two bodies.", author: "Aristotle" },
    { text: "I have found the one whom my soul loves.", author: "Song of Solomon 3:4" },
    { text: "You know you're in love when you can't fall asleep because reality is finally better than your dreams.", author: "Dr. Seuss" },
    { text: "Love is not about how many days, months, or years you have been together. It's about how much you love each other every single day.", author: "Unknown" },
    { text: "I would rather spend one lifetime with you, than face all the ages of this world alone.", author: "J.R.R. Tolkien" },
    { text: "You are my sun, my moon, and all of my stars.", author: "E.E. Cummings" },
    { text: "To love and be loved is to feel the sun from both sides.", author: "David Viscott" },
    { text: "Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope.", author: "Maya Angelou" },
    { text: "I fell in love the way you fall asleep: slowly, and then all at once.", author: "John Green" },
    { text: "Whatever our souls are made of, his and mine are the same.", author: "Emily Brontë" },
    { text: "I love you more than I have ever found a way to say to you.", author: "Ben Folds" },
    { text: "If I know what love is, it is because of you.", author: "Herman Hesse" },
    { text: "Love is friendship that has caught fire.", author: "Ann Landers" },
    { text: "You are every reason, every hope, and every dream I've ever had.", author: "Nicholas Sparks" },
    { text: "In your smile, I see something more beautiful than the stars.", author: "Unknown" },
    { text: "I seem to have loved you in numberless forms, numberless times, in life after life, in age after age, forever.", author: "Rabindranath Tagore" },
    { text: "Love is when the other person's happiness is more important than your own.", author: "H. Jackson Brown Jr." },
    { text: "You are my heart, my life, my one and only thought.", author: "Arthur Conan Doyle" },
    { text: "Meeting you was fate, becoming your friend was a choice, but falling in love with you was beyond my control.", author: "Unknown" },
    { text: "When I saw you I fell in love, and you smiled because you knew.", author: "Arrigo Boito" },
    { text: "Love doesn't make the world go round. Love is what makes the ride worthwhile.", author: "Franklin P. Jones" },
    { text: "I love you begins by I, but it ends up by you.", author: "Charles de Leusse" },
    { text: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.", author: "Lao Tzu" },
    { text: "You are the finest, loveliest, tenderest, and most beautiful person I have ever known.", author: "F. Scott Fitzgerald" },
    { text: "I would find you in any lifetime.", author: "Unknown" },
    { text: "Every love story is beautiful, but ours is my favorite.", author: "Unknown" }
];

let currentQuoteIndex = -1;
const STORAGE_KEY_PREFIX = 'quote_likes_';
const TOTAL_LIKES_KEY = 'total_likes_given';

function initializeStorage() {
    if (!localStorage.getItem(TOTAL_LIKES_KEY)) {
        localStorage.setItem(TOTAL_LIKES_KEY, '0');
    }
    
    loveQuotes.forEach((quote, index) => {
        const key = STORAGE_KEY_PREFIX + index;
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, '0');
        }
    });
}

function getLikes(index) {
    const likes = localStorage.getItem(STORAGE_KEY_PREFIX + index);
    return parseInt(likes) || 0;
}

function addLike(index) {
    const currentLikes = getLikes(index);
    const newLikes = currentLikes + 1;
    localStorage.setItem(STORAGE_KEY_PREFIX + index, newLikes.toString());
    
    const totalLikes = parseInt(localStorage.getItem(TOTAL_LIKES_KEY)) || 0;
    localStorage.setItem(TOTAL_LIKES_KEY, (totalLikes + 1).toString());
    
    return newLikes;
}

function removeLike(index) {
    const currentLikes = getLikes(index);
    if (currentLikes > 0) {
        const newLikes = currentLikes - 1;
        localStorage.setItem(STORAGE_KEY_PREFIX + index, newLikes.toString());
        
        const totalLikes = parseInt(localStorage.getItem(TOTAL_LIKES_KEY)) || 0;
        if (totalLikes > 0) {
            localStorage.setItem(TOTAL_LIKES_KEY, (totalLikes - 1).toString());
        }
        
        return newLikes;
    }
    return currentLikes;
}

function isQuoteLiked(index) {
    return localStorage.getItem('quote_liked_' + index) === 'true';
}

function setQuoteLiked(index, liked) {
    localStorage.setItem('quote_liked_' + index, liked.toString());
}

function getRandomQuote() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * loveQuotes.length);
    } while (newIndex === currentQuoteIndex && loveQuotes.length > 1);
    
    currentQuoteIndex = newIndex;
    return { ...loveQuotes[currentQuoteIndex], index: currentQuoteIndex };
}

function updateLikeButton() {
    const likeBtn = document.getElementById('likeBtn');
    const heartIcon = document.getElementById('heartIcon');
    const likeCount = document.getElementById('likeCount');
    
    const likes = getLikes(currentQuoteIndex);
    const liked = isQuoteLiked(currentQuoteIndex);
    
    likeCount.textContent = likes;
    heartIcon.textContent = liked ? '❤️' : '🤍';
    
    if (liked) {
        likeBtn.classList.add('liked');
    } else {
        likeBtn.classList.remove('liked');
    }
}

function displayQuote() {
    const quote = getRandomQuote();
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    
    quoteText.style.opacity = '0';
    quoteAuthor.style.opacity = '0';
    
    setTimeout(() => {
        quoteText.textContent = quote.text;
        quoteAuthor.textContent = `- ${quote.author}`;
        quoteText.style.transition = 'opacity 0.5s ease-in';
        quoteAuthor.style.transition = 'opacity 0.5s ease-in';
        quoteText.style.opacity = '1';
        quoteAuthor.style.opacity = '1';
        
        updateLikeButton();
        updateStats();
    }, 300);
}

function handleLike() {
    const likeBtn = document.getElementById('likeBtn');
    const heartIcon = document.getElementById('heartIcon');
    const likeCount = document.getElementById('likeCount');
    
    const liked = isQuoteLiked(currentQuoteIndex);
    
    if (liked) {
        const newLikes = removeLike(currentQuoteIndex);
        likeCount.textContent = newLikes;
        heartIcon.textContent = '🤍';
        likeBtn.classList.remove('liked');
        setQuoteLiked(currentQuoteIndex, false);
    } else {
        const newLikes = addLike(currentQuoteIndex);
        likeCount.textContent = newLikes;
        heartIcon.textContent = '❤️';
        likeBtn.classList.add('liked');
        setQuoteLiked(currentQuoteIndex, true);
        
        likeBtn.classList.add('liked');
        setTimeout(() => {
            likeBtn.classList.remove('liked');
        }, 600);
    }
    
    updateStats();
}

function updateStats() {
    document.getElementById('totalQuotes').textContent = loveQuotes.length;
    const totalLikes = localStorage.getItem(TOTAL_LIKES_KEY) || '0';
    document.getElementById('totalLikes').textContent = totalLikes;
}

function copyQuote() {
    const quoteText = document.getElementById('quoteText').textContent;
    const quoteAuthor = document.getElementById('quoteAuthor').textContent;
    const fullQuote = `${quoteText} ${quoteAuthor}`;
    
    navigator.clipboard.writeText(fullQuote).then(() => {
        const copyBtn = document.getElementById('copyBtn');
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span>Copied!</span><span class="btn-icon">✓</span>';
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
        }, 2000);
    }).catch(err => {
        alert('Failed to copy quote');
    });
}

function shareQuote() {
    const quoteText = document.getElementById('quoteText').textContent;
    const quoteAuthor = document.getElementById('quoteAuthor').textContent;
    const fullQuote = `${quoteText} ${quoteAuthor}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Love Quote',
            text: fullQuote
        }).catch(err => console.log('Error sharing:', err));
    } else {
        copyQuote();
        alert('Quote copied to clipboard! You can now paste it anywhere.');
    }
}

initializeStorage();

document.getElementById('nextQuoteBtn').addEventListener('click', displayQuote);
document.getElementById('likeBtn').addEventListener('click', handleLike);
document.getElementById('copyBtn').addEventListener('click', copyQuote);
document.getElementById('shareBtn').addEventListener('click', shareQuote);

displayQuote();