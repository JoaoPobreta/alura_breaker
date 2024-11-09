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

    // Cria o título do menu
    const title = document.createElement('h3');
    title.textContent = 'Menu Flutuante';
    menu.appendChild(title);

    // Checkbox para iniciar o script
    const checkboxLabel = document.createElement('label');
    checkboxLabel.style.display = 'block';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'startScriptCheckbox';
    checkbox.style.accentColor = 'red';
    checkboxLabel.appendChild(checkbox);
    checkboxLabel.appendChild(document.createTextNode(' Iniciar Script'));
    menu.appendChild(checkboxLabel);

    // Barra para ajustar o delay
    const delayLabel = document.createElement('label');
    delayLabel.textContent = 'Delay para lições: ';
    const delayValue = document.createElement('span');
    delayValue.id = 'delayValue';
    delayValue.textContent = '4';
    delayLabel.appendChild(delayValue);
    delayLabel.appendChild(document.createTextNode('s'));
    menu.appendChild(delayLabel);

    const delaySlider = document.createElement('input');
    delaySlider.type = 'range';
    delaySlider.id = 'delaySlider';
    delaySlider.min = '1';
    delaySlider.max = '5';
    delaySlider.value = '4';
    delaySlider.style.width = '100%';
    delaySlider.style.marginTop = '10px';
    menu.appendChild(delaySlider);

    // Adiciona o menu ao corpo da página
    document.body.appendChild(menu);

    // Atualiza o valor do delay exibido
    delaySlider.addEventListener('input', () => {
        delayValue.textContent = delaySlider.value;
    });

    // Função para iniciar o script ao clicar na checkbox
    checkbox.addEventListener('change', function() {
        if (this.checked) {
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
                }).then(data => {
                    console.log("[DEBUG] Lesson Done!");
                });

                const delayTime = parseInt(delaySlider.value) * 1000;
                setTimeout(() => {
                    next_lesson_button.click();
                }, delayTime);
            } else {
                alert("Next Lesson Button not found :( are u sure that u are on the correct page?");
            }
        }
    });
}

// Chama a função para criar o menu ao carregar o script
createFloatingMenu();
