// Inclua o Toastify antes, com um import ou adicione via CDN no HTML
// <script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">

// Função para criar o menu flutuante no DOM
function createFloatingMenu() {
    // Cria o contêiner principal do menu
    const menu = document.createElement('div');
    menu.id = 'floatingMenu';
    menu.style.position = 'fixed';
    menu.style.top = '10px';
    menu.style.right = '10px';
    menu.style.width = '200px';
    menu.style.padding = '15px';
    menu.style.backgroundColor = 'black';
    menu.style.color = 'white';
    menu.style.border = '1px solid red';
    menu.style.borderRadius = '5px';
    menu.style.zIndex = '1000';
    menu.style.cursor = 'move';

    // Função para tornar o menu arrastável
    let isDragging = false, offsetX, offsetY;
    menu.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - menu.offsetLeft;
        offsetY = e.clientY - menu.offsetTop;
    });
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            menu.style.left = `${e.clientX - offsetX}px`;
            menu.style.top = `${e.clientY - offsetY}px`;
        }
    });
    document.addEventListener('mouseup', () => isDragging = false);

    // Botão para abrir/fechar o menu
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Khan Breaker';
    toggleButton.style.backgroundColor = 'black';
    toggleButton.style.color = 'white';
    toggleButton.style.border = 'none';
    toggleButton.style.cursor = 'pointer';
    toggleButton.addEventListener('click', () => {
        menuContent.style.display = menuContent.style.display === 'none' ? 'block' : 'none';
        toggleButton.textContent = menuContent.style.display === 'none' ? 'Khan Breaker' : '⬆️';
    });
    menu.appendChild(toggleButton);

    // Conteúdo do menu (exibido e ocultado pelo botão)
    const menuContent = document.createElement('div');
    menuContent.style.display = 'block';

    // Cria o título do menu
    const title = document.createElement('h3');
    title.textContent = 'Alura Breaker';
    menuContent.appendChild(title);

    // Checkbox para ativar/desativar o script
    const checkboxLabel = document.createElement('label');
    checkboxLabel.style.display = 'block';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'keepRunningCheckbox';
    checkbox.checked = true;  // Define o script como ativo por padrão
    checkbox.style.accentColor = 'red';
    checkboxLabel.appendChild(checkbox);
    checkboxLabel.appendChild(document.createTextNode(' Script Ativo'));
    menuContent.appendChild(checkboxLabel);

    // Barra para ajustar o delay
    const delayLabel = document.createElement('label');
    delayLabel.textContent = 'Delay para lições: ';
    const delayValue = document.createElement('span');
    delayValue.id = 'delayValue';
    delayValue.textContent = '4';
    delayLabel.appendChild(delayValue);
    delayLabel.appendChild(document.createTextNode('s'));
    menuContent.appendChild(delayLabel);

    const delaySlider = document.createElement('input');
    delaySlider.type = 'range';
    delaySlider.id = 'delaySlider';
    delaySlider.min = '1';
    delaySlider.max = '5';
    delaySlider.value = '4';
    delaySlider.style.width = '100%';
    delaySlider.style.marginTop = '10px';
    menuContent.appendChild(delaySlider);

    menu.appendChild(menuContent);
    document.body.appendChild(menu);

    // Atualiza o valor do delay exibido
    delaySlider.addEventListener('input', () => {
        delayValue.textContent = delaySlider.value;
    });

    // Função para executar o script automaticamente
    const runScript = () => {
        if (!checkbox.checked) return;  // Só executa se a checkbox estiver marcada

        const water_mark = document.querySelector('.formattedText');
        if (water_mark) {
            water_mark.innerHTML = 'sussy baka amongus';
        }
        
        const cookies = document.cookie;
        const actual_url = window.location.href;
        const next_lesson_button = document.getElementsByClassName("bootcamp-next-button")[0];

        if (next_lesson_button) {
            const next_lesson_link = next_lesson_button.getAttribute('href');
            const parts = actual_url.split('/');
            const lessonName = parts[4];
            const lessonId = parts[6];
            console.log(`[DEBUG] Lesson_Name: ${lessonName} Lesson_Id: ${lessonId}`);

            fetch(`https://cursos.alura.com.br/course/${lessonName}/task/${lessonId}/mark-video`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': cookies
                }
            }).then(() => {
                console.log("[DEBUG] Lesson Done!");

                // Exibe a notificação Toastify
                Toastify({
                    text: "Lição concluída com sucesso!",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "green",
                }).showToast();
            });

            const delayTime = parseInt(delaySlider.value) * 1000;
            setTimeout(() => {
                next_lesson_button.click();
                runScript();  // Reexecuta o script após clicar na próxima lição
            }, delayTime);
        } else {
            alert("Next Lesson Button not found :( are u sure that u are on the correct page?");
        }
    };

    // Executa o script automaticamente em cada carregamento de página
    runScript();
}

// Chama a função para criar o menu ao carregar o script
createFloatingMenu();
