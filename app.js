const dictionary = [
    {
        word: "Привет",
        pronunciation: "[prʲɪˈvʲet]",
        definitions: [
            "1. (ru) Форма дружеского приветствия",
            "2. (ro) Formă de salut prietenos"
        ],
        examples: {
            ru: [
                "Привет, как дела?",
                "Привет всем участникам встречи!"
            ],
            ro: [
                "Salut, ce mai faci?",
                "Salut tuturor!"
            ]
        }
    },
    // ... остальные слова
];
        
// Инициализация
function init() {
    renderWordList();
    updateWordCount();
    if(dictionary.length > 0) showWordDetails(dictionary[0]);
    setupEventListeners();
}

// Рендер списка слов
function renderWordList() {
    const container = document.getElementById('wordList');
    container.innerHTML = '';
    
    dictionary.forEach(word => {
        const div = document.createElement('div');
        div.className = 'word-item';
        div.textContent = word.word;
        div.onclick = () => {
            document.querySelectorAll('.word-item').forEach(item => 
                item.classList.remove('active'));
            div.classList.add('active');
            showWordDetails(word);
        };
        container.appendChild(div);
    });
}

// Показать детали
function showWordDetails(word) {
    document.getElementById('wordTitle').textContent = word.word;
    document.getElementById('wordPronunciation').textContent = word.pronunciation;
    
    const definitionContainer = document.getElementById('wordDefinition');
    definitionContainer.innerHTML = word.definitions
        .map(d => `<div class="definition-item">${d}</div>`)
        .join('');

    const examplesContainer = document.getElementById('usageExamples');
    examplesContainer.innerHTML = [
        ...word.examples.ru.map(e => `
            <div class="example-item">
                <span class="lang-badge">RU</span>
                ${e}
            </div>
        `),
        ...word.examples.ro.map(e => `
            <div class="example-item">
                <span class="lang-badge">RO</span>
                ${e}
            </div>
        `)
    ].join('');
}

// Настройка обработчиков событий
function setupEventListeners() {
    document.getElementById('searchInput').addEventListener('input', function(e) {
        const term = e.target.value.toLowerCase();
        Array.from(document.getElementsByClassName('word-item')).forEach(item => {
            const match = item.textContent.toLowerCase().includes(term);
            item.style.display = match ? 'block' : 'none';
        });
    });
}

// Обновление счетчика
function updateWordCount() {
    document.getElementById('wordCount').textContent = dictionary.length;
}

// Запуск при загрузке
window.addEventListener('DOMContentLoaded', init);