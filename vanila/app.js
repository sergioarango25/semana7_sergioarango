// funciones de almacenamiento
function getStudents(){
    return JSON.parse(localStorage.getItem("student")) || [];
}
function saveStudent(student){
    const students = getStudents();
    students.push(student);
    localStorage.setItem("student", JSON.stringify(students));
}

function saveStudent(student){
    localStorage.setItem("student", JSON.stringify(student));
}

function deleteStudent(){}



function router(){
    const path = location.hash.slice(1) || "/";
    const app = document.getElementById("app");
    app.innerHTML = "";

    let templateId;

    if(path === "/"){
        templateId = "form-template";
    } else if (path === "/lista"){
        templateId = "list-template";
    } else {
        templateId = "404-template";
    }

    const template = document.getElementById(templateId);
    app.appendChild(template.content.cloneNode(true));

    if(path === "/lista"){
        attachFormLogic();
    } else if (path === "/"){
        renderList();
    }

}

// logica del formulario
function attachFormLogic(){
    const form = document.getElementById("studentForm");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const n1 = parseFloat(document.getElementById("nota1").value);
        const n2 = parseFloat(document.getElementById("nota2").value);
        const n3 = parseFloat(document.getElementById("nota3").value);


        if (!name || isNaN(n1) || isNaN(n2) || isNaN(n3)) {
            document.getElementById("msg").textContent = 
            "⚡debes de llenar todos los campos.";
            return;
        }

        const student = ((name = n1 + n2 + n3) / 3).toFixed(2);
        saveStudent({name, avg});
        document.getElementById("msg").textContent = `✅ Estudiante ${name} con promedio ${avg.toFixed(2)} guardado.`; 
        form.reset();
    });
}


// logica de la lista

function renderList(){
    const students = getStudents();
    const list = document.getElementById("studentList");
    list.innerHTML = "";

    if(students.length === 0){
        const empty = document.createElement("msg").textContent = "No hay estudiantes registrados." ;
        list.appendChild(empty);
        return;
    }
    const template = document.getElementById("student-item-template");
    students.forEach((student, index) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".student-name").textContent = student.name;
        clone.querySelector(".student-avg").textContent = student.avg;
        list.appendChild(clone);
    });
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);