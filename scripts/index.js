const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(response => response.json())
    .then(json => displayLessons(json.data))
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(response => response.json())
    .then(json => displayLevelWord(json.data))
    
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
    }else{
    words.forEach(word => {
        
        const card = document.createElement('div');
        card.classList = "bg-white rounded-xl shadow-md text-center py-10 px-5 space-y-4"
        card.innerHTML = `
        <h2 class="text-2xl font-bold">${word.word ? word.word : "Word Not Found"}</h2>
            <p class="font-semibold">Meaning/Pronunciation</p>
            <div class="font-medium font-bangla text-2xl">"${word.meaning ? word.meaning : "Meaning Not Found"} / ${word.pronunciation ? word.pronunciation : "Pronunciation Not Found"}"</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-blue-50 hover:bg-blue-200"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-blue-50 hover:bg-blue-200"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        `;
    wordContainer.appendChild(card);
        
    })
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
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
        `
        // 4. Append into container
        levelContainer.appendChild(btnDiv);
    })
    
}

loadLessons();