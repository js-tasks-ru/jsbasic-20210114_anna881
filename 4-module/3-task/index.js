/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
    let trList = table.querySelectorAll('tbody > tr');

    for (let tr of trList) {
        setAvailableClass(tr);
        setGenderClass(tr);
        setHighlight(tr);

        function setAvailableClass(tr) {
            let statusCell = tr.lastElementChild;
            let statusAttribute = statusCell.getAttribute('data-available');

            if (statusAttribute == null) {
                tr.setAttribute('hidden', true);
            } else if (statusAttribute == 'true') {
                tr.classList.add('available');
            } else if (statusAttribute == 'false') {
                tr.classList.add('unavailable');
            }
        }

        function setGenderClass(tr) {
            let genderCell = tr.cells[2];
            let className = '';
            let cellTest = genderCell.textContent;

            if (cellTest == 'm') {
                className = 'male';
            } else if (cellTest == 'f') {
                className = 'female';
            }

            tr.classList.add(className);
        }

        function setHighlight(tr) {
            let ageCell = tr.cells[1];
            let age = parseInt(ageCell.textContent);

            if (age < 18) tr.style.textDecoration = 'line-through';
        }
    }
}
