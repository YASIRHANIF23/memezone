// Memes list
const memes = [
    { name: "Acha Ji Aisa Hai Kya", file: "acha-ji-aisa-hai-kya.mp3" },
    { name: "108 Sound", file: "1-108.mp3" },
    { name: "Tuco Get Out", file: "tuco-get-out.mp3" },
    { name: "Huh Meme", file: "huh_37bAoRo.mp3" },
    { name: "Galaxy Meme", file: "galaxy-meme.mp3" },
    { name: "A Few Moments Later", file: "a-few-moments-later-sponge-bob-sfx-fun.mp3" },
    { name: "Vine Boom", file: "vine-boom-sound-effect_KT89XIq.mp3" },
    { name: "Aayein Meme", file: "aayein-meme.mp3" },
    { name: "Cat Laugh", file: "cat-laugh-meme-1.mp3" },
    { name: "Chalo", file: "chalo.mp3" },
    { name: "Chachaa", file: "chachaa.mp3" },
    { name: "Gop Gop Gop", file: "gopgopgop.mp3" },
    { name: "Ab Tu Gaya Beta", file: "ab-tu-gaya-beta-ab-dekh-tu-puneet.mp3" },
    { name: "Ek Jhaat Bhar Ka Aadmi", file: "ek-jhaat-bhar-ka-aadmi.mp3" },
    { name: "Phir Teri Maiya C...", file: "phir-teri-maiya-chodta-hu-cid.mp3" },
    { name: "Abhi Maza Aayega", file: "abhi-maza-ayagga.mp3" },
    { name: "Anime Girl Voice", file: "anime-girl-voice.mp3" },
    { name: "Ale Le Le", file: "ale-le-le.mp3" },
    { name: "Sad Meow Song", file: "sad-meow-song.mp3" },
    { name: "Dun Dun Dun Brass", file: "dun-dun-dun-sound-effect-brass_8nFBccR.mp3" },
    { name: "Subway Surfers Theme", file: "subway-surfers.mp3" },
    { name: "Sparrow Ouch", file: "sparrowusa24-ouch.mp3" },
    { name: "Vaste Gana Hoinn", file: "vaste-gana-hoiyeinn.mp3" },
    { name: "Oh My God Bro", file: "oh-my-god-bro-oh-hell-nah-man.mp3" },
    { name: "Gunshot Budden", file: "gunshotjbudden.mp3" },
    { name: "Romanceeeee", file: "romanceeeeeeeeeee.mp3" },
    { name: "Chicken Screaming", file: "chicken-on-tree-screaming.mp3" },
    { name: "Perfect Fart", file: "perfect-fart.mp3" },
    { name: "Spiderman Meme", file: "spiderman-meme-song.mp3" },
    { name: "Punch Gaming SFX", file: "punch-gaming-sound-effect-hd_RzlG1GE.mp3" },
    { name: "Baby Laughing 1", file: "baby-laughing-meme (1).mp3" },
    { name: "Baby Laughing 2", file: "baby-laughing-meme.mp3" },
    { name: "Error Sound", file: "error_CDOxCYm.mp3" },
    { name: "Among Us Reveal", file: "among-us-role-reveal-sound.mp3" },
    { name: "TF Nemesis", file: "tf_nemesis.mp3" },
    { name: "Faaah Sound", file: "faaah.mp3" }
];

const colorClasses = ['btn-red', 'btn-green', 'btn-black', 'btn-brown', 'btn-pink', 'btn-yellow', 'btn-blue'];
let currentAudio = null;
let favorites = JSON.parse(localStorage.getItem('myInstantsFavs')) || [];

const soundGrid = document.getElementById('soundGrid');
const searchInput = document.getElementById('searchInput');

function renderGrid() {
    soundGrid.innerHTML = '';
    const query = searchInput.value.toLowerCase();

    const filtered = memes.filter(m => m.name.toLowerCase().includes(query));

    filtered.forEach((meme, index) => {
        const isFav = favorites.includes(meme.file);
        const colorClass = colorClasses[index % colorClasses.length];

        // Memes folder ka path
        const audioPath = `memes/${meme.file}`;

        const card = document.createElement('div');
        card.className = 'instant-card';
        card.innerHTML = `
            <button class="instant-btn ${colorClass}" onclick="playAudio('${audioPath}')"></button>
            <div class="instant-title" title="${meme.name}">${meme.name}</div>
            <div class="instant-actions">
                <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart action-icon fav ${isFav ? 'active' : ''}" 
                   onclick="toggleFavorite('${meme.file}', this)"></i>
                <a href="${audioPath}" download="${meme.name}.mp3" class="action-icon">
                    <i class="fa-solid fa-download"></i>
                </a>
            </div>
        `;
        soundGrid.appendChild(card);
    });
}

function playAudio(filePath) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    
    console.log("Attempting to play sound from:", filePath);
    currentAudio = new Audio(filePath);
    
    currentAudio.play().then(() => {
        console.log("Playing successfully!");
    }).catch(error => {
        console.error("Error playing audio:", error);
        alert(`File play nahi ho saki: "${filePath}"\n\nCheck karein ke 'memes' folder me is naam ki file mojood hai.`);
    });
}

function toggleFavorite(fileName, iconEl) {
    if (favorites.includes(fileName)) {
        favorites = favorites.filter(f => f !== fileName);
    } else {
        favorites.push(fileName);
    }
    localStorage.setItem('myInstantsFavs', JSON.stringify(favorites));
    renderGrid();
}

searchInput.addEventListener('input', renderGrid);

// Initial Load
renderGrid();