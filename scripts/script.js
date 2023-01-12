const addCourseBtn = document.getElementById("add-course-btn");
const inputTable = document.getElementById("input-table");

let counter = 1;

addCourseBtn.addEventListener("click", function () {
    const tr = document.createElement("tr");
    tr.setAttribute("class", "input-row");
    const td1 = document.createElement("td");
    const input = document.createElement('input');
    input.setAttribute("class", "form-control course-input" + counter);
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Course Code");
    td1.appendChild(input);
    tr.appendChild(td1);

    const td2 = document.createElement("td");
    td2.appendChild(getDropDown("day", "Select Day(s)", ["ST", "MW", "RA", "S", "M", "T", "W", "R", "A"], "day-input"));
    tr.appendChild(td2);

    const td3 = document.createElement("td");
    td3.appendChild(getDropDown("start", "Select Start Time", startArray, "start-input"));
    tr.appendChild(td3);

    const td4 = document.createElement("td");
    td4.appendChild(getDropDown("end", "Select End Time", endArray, "end-input"));
    tr.appendChild(td4);
    inputTable.appendChild(tr);
    dropDownEventListener();

    counter++;
});


function getDropDown(value, description, list, type) {
    const div1 = document.createElement("div");
    div1.setAttribute("class", "dropdown");

    const btn = document.createElement("button");
    btn.setAttribute("class", "btn btn-secondary dropdown-toggle " + type + counter);
    btn.setAttribute("type", "text");
    btn.setAttribute("id", "dropdownMenuButton");
    btn.setAttribute("data-toggle", "dropdown");
    btn.setAttribute("aria-haspopup", "true");
    btn.setAttribute("aria-expanded", "false");
    btn.innerText = description;
    div1.appendChild(btn);

    const div2 = document.createElement("div");
    div2.setAttribute("class", "dropdown-menu");
    div2.setAttribute("aria-labelledby", "dropdownMenuButton");

    for (let i = 0; i < list.length; i++) {
        const options = document.createElement("a");
        const className = "dropdown-item " + value;
        options.setAttribute("class", className);
        options.setAttribute("href", "#");
        options.innerText = list[i];
        div2.appendChild(options);
    }

    div1.appendChild(div2);

    return div1;
}

function dropDownEventListener() {
    const dropDownItems = document.getElementsByClassName("dropdown-item");

    for (let i = 0; i < dropDownItems.length; i++) {
        dropDownItems[i].addEventListener("click", function () {
            const parent = dropDownItems[i].parentElement.parentElement;
            const btn = parent.querySelector("button");
            btn.innerText = dropDownItems[i].innerText;
        })
    }
}

dropDownEventListener();

const generateBtn = document.getElementById("generate-btn");

const startArray = ["8:00AM", "9:40AM", "11:20AM", "1:00PM", "2:40PM", "4:20PM"];
const endArray = ["9:30AM", "11:10AM", "12:50PM", "2:30PM", "4:10PM", "5:50PM"];

const routineContainer = document.getElementsByClassName("routine-container")[0];
const landing = document.getElementsByClassName("landing")[0];

generateBtn.addEventListener("click", function () {
    routineContainer.style.display = "block"
    landing.style.display = "none";

    const totalInputs = document.getElementsByClassName("form-control");

    for (let i = 0; i < totalInputs.length; i++) {
        let courseCode = document.getElementsByClassName("course-input" + i)[0].value;
        let days = document.getElementsByClassName("day-input" + i)[0].innerText;
        let startTime = document.getElementsByClassName("start-input" + i)[0].innerText;
        let endTime = document.getElementsByClassName("end-input" + i)[0].innerText;

        for (let j = 0; j < days.length; j++) {
            let searchKey = days[j] + startTime[0];
            if (startTime[1] == "1") {
                searchKey += "1";
            }

            let box = document.getElementById(searchKey);
            box.innerText = courseCode;

            for (let k = 0; k < endArray.length; k++) {
                if (startTime == startArray[k] && endTime != endArray[k]) {
                    box.setAttribute("colspan", "2");
                    let removeStartTime = days[j] + startArray[k + 1][0];
                    if (startArray[k + 1][1] == "1") {
                        removeStartTime += "1";
                    }
                    let node = document.getElementById(removeStartTime);
                    if (node.parentNode) {
                        node.parentNode.removeChild(node);
                    }
                }
            }
        }
    }
})

const goBackBtn = document.getElementById("go-back-btn");

goBackBtn.addEventListener("click", function () {
    landing.style.display = "block";
    routineContainer.style.display = "none";
})


const printBtn = document.getElementById("print-btn");
printBtn.addEventListener("click", function () {
    window.print();
})

const themeBtn = document.getElementById("theme-switch");
themeBtn.addEventListener("click", function () {
    const printArea = document.getElementById("print-area");
    if (themeBtn.innerText.startsWith("L")) {
        printArea.setAttribute("class", "table table-striped table-bordered");
        themeBtn.setAttribute("class", "btn btn-dark");
        themeBtn.innerText = "Dark mode";
    }
    else {
        printArea.setAttribute("class", "table table-striped table-dark table-bordered");
        themeBtn.setAttribute("class", "btn btn-light");
        themeBtn.innerText = "Light mode";
    }
})