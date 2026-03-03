const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(response => response.json())
    .then(json => displayLessons(json.data))
}

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
        <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
        `

        // 4. Append into container
        levelContainer.appendChild(btnDiv);
    })
    
}

loadLessons();