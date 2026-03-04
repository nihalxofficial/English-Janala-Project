const createElements = (arr) => {
    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`);
    return htmlElements.join(" ");
}


function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner = (status) => {
    if(status ===true){
        document.getElementById("spinner").classList.remove('hidden');
        document.getElementById("word-container").classList.add('hidden');
    }else{
        document.getElementById("spinner").classList.add('hidden');
        document.getElementById("word-container").classList.remove('hidden');
    }
}

const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(response => response.json())
    .then(json => displayLessons(json.data))
}


const removeActive = () => {
    const lessonButtons = document.querySelectorAll('.lesson-btn');
    lessonButtons.forEach(btn =>  btn.classList.remove("active"))
    
}

const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(response => response.json())
    .then(json => {

        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        clickBtn.classList.add('active');
        
        displayLevelWord(json.data)
    })
    
}

const loadWordDetail = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    
    const response = await fetch(url);
    const details = await response.json();
    displayWordDetail(details.data);
    
}

const displayWordDetail = (word) => {
    const detailsBox = document.getElementById('details-container');
    detailsBox.innerHTML= `
     <div class="">
            <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>    : ${word.pronunciation})</h2>
        </div>
        <div class="">
            <h2 class=" font-bold">Meaning</h2>
            <p>${word.meaning}</p>
        </div>
        <div class="">
            <h2 class=" font-bold">Example </h2>
            <p>${word.sentence}</p>
        </div>
        <div class="">
            <h2 class=" font-bold">Synonyms </h2>
           <div class="">${createElements(word.synonyms)}</div>
        </div>
    `;
    document.getElementById('word_modal').showModal();
}

const displayLevelWord = (words) =>{
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";

    if(words.length <= 0){
        wordContainer.innerHTML =  `
        <div class="text-center col-span-full py-10 space-y-6 font-bangla">
            <img src="./assets/alert-error.png" alt="" class="mx-auto">
            <p class="text-sm font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
            <h2 class="font-bold text-3xl">নেক্সট Lesson এ যান</h2>
        </div>
        `;
        manageSpinner(false);
    }else{
    words.forEach(word => {
        
        const card = document.createElement('div');
        card.classList = "bg-white rounded-xl shadow-md text-center py-10 px-5 space-y-4"
        card.innerHTML = `
        <h2 class="text-2xl font-bold">${word.word ? word.word : "Word Not Found"}</h2>
            <p class="font-semibold">Meaning/Pronunciation</p>
            <div class="font-medium font-bangla text-2xl">"${word.meaning ? word.meaning : "Meaning Not Found"} / ${word.pronunciation ? word.pronunciation : "Pronunciation Not Found"}"</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-blue-50 hover:bg-blue-200"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${word.word}')" class="btn bg-blue-50 hover:bg-blue-200"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        `;
    wordContainer.appendChild(card);
        
    })
    manageSpinner(false);
}}

const displayLessons = (lessons) => {
    // console.log(lessons);
    // 1. Get the container & empty 
    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML = "";
    // 2. Get into every lessons
    lessons.forEach(lesson => {
        // 3. Create Element 
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
        `
        // 4. Append into container
        levelContainer.appendChild(btnDiv);
    })
    
}

loadLessons();


document.getElementById("btn-search").addEventListener("click", () => {
    removeActive();
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    fetch('https://openapi.programming-hero.com/api/words/all')
    .then(res => res.json())
    .then(data => {
        const allWords = data.data;
        const filterWords = allWords.filter(word=> word.word.toLowerCase().includes(searchValue))
        displayLevelWord(filterWords);
    })
    
    
})