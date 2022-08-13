let notes;
      let savedNotes = JSON.parse(localStorage.getItem("notes"));
      if (Array.isArray(savedNotes)) {
        notes = savedNotes;
      } else {
        notes = [
          {
            title: "First Note",
            content:
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam hic tempore fugiat cum atque, quaerat itaque laboriosam ratione illum sit.",
            id: "id1",
          },
          {
            title: "Second Note",
            content:
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam hic tempore fugiat cum atque, quaerat itaque laboriosam ratione illum sit.",
            id: "id2",
          },
          {
            title: "Third Note",
            content:
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam hic tempore fugiat cum atque, quaerat itaque laboriosam ratione illum sit.",
            id: "id3",
          },
        ];
      }


      let notesDiv = document.querySelector(".notes");

      function addNote() {
        let titleBox = document.querySelector("#input_title");
        let contentBox = document.querySelector("#input_content");
        let newInputDiv = document.querySelector("#input_div");
        let addNoteBtn = document.querySelector("#addBtn");
        let editBtns = document.querySelectorAll(".fa-pen-to-square");
        let deleteBtns = document.querySelectorAll(".fa-trash");

        let title = titleBox.value;
        let content = contentBox.value;
        let id = "" + new Date().getTime();
        notes.push({
          title: title,
          content: content,
          id: id,
        });
        newInputDiv.remove();
        saveNotes();
        render();
      }

      function updateNote(e) {
        let titleBox = document.querySelector("#input_title");
        let title = titleBox.value;
        let contentBox = document.querySelector("#input_content");
        let content = contentBox.value;

        notes.forEach((note) => {
          if (e.target.id == note.id) {
            note.title = title;
            note.content = content;
          }
        });
        saveNotes();
        render();
      }

      function removeNote(id) {
        console.log(id);
        notes = notes.filter((note) => {
          if (note.id == id) {
            return false;
          } else {
            return true;
          }
        });
      }

      function createNote() {
        let addNoteBtn = document.querySelector("#addBtn");
        addNoteBtn.setAttribute("disabled", "disabled");

        let updateBtns = document.querySelectorAll(".fa-solid");
        updateBtns.forEach((btn) => (btn.onclick = ""));

        let newDiv = document.createElement("div");
        newDiv.classList.add("note", "input");
        newDiv.id = "input_div";

        let header = document.createElement("div");

        let titleBox = document.createElement("input");
        titleBox.type = "text";
        titleBox.placeholder = "Enter Note Title";
        titleBox.id = "input_title";

        let addBtn = document.createElement("button");
        addBtn.innerHTML = "+";

        header.appendChild(titleBox);
        header.appendChild(addBtn);

        let textArea = document.createElement("textarea");
        textArea.placeholder = "Enter Note Content";
        textArea.id = "input_content";

        newDiv.appendChild(header);
        newDiv.appendChild(textArea);

        let addDiv = document.querySelector(".add");

        notesDiv.insertBefore(newDiv, addDiv);

        addBtn.onclick = addNote;
      }

      function editNote(e) {
        let noteDiv = document.getElementById(e.target.id);
        let titlePara = noteDiv.querySelector("p");
        let title = titlePara.querySelector("span").innerText;

        let updateBtns = document.querySelectorAll(".fa-solid");
        updateBtns.forEach((btn) => (btn.onclick = ""));

        let content = noteDiv.querySelectorAll("p")[1].innerText;

        let newDiv = document.createElement("div");
        newDiv.classList.add("note", "input");
        newDiv.id = "input_div";

        let header = document.createElement("div");

        let titleBox = document.createElement("input");
        titleBox.type = "text";
        titleBox.value = title;
        titleBox.id = "input_title";

        let addBtn = document.createElement("button");
        addBtn.innerHTML = "+";
        addBtn.id = e.target.id;

        header.appendChild(titleBox);
        header.appendChild(addBtn);

        let textArea = document.createElement("textarea");
        textArea.value = content;
        textArea.id = "input_content";

        newDiv.appendChild(header);
        newDiv.appendChild(textArea);

        noteDiv.replaceWith(newDiv);
        addBtn.onclick = updateNote;
      }

      function deleteNote(e) {
        let idToDelete = e.target.id;

        let updateBtns = document.querySelectorAll(".fa-solid");
        updateBtns.forEach((btn) => (btn.onclick = ""));

        removeNote(idToDelete);
        saveNotes();
        render();
      }

      function saveNotes() {
        localStorage.setItem("notes", JSON.stringify(notes));
      }

      function render() {
        notesDiv.innerHTML = "";
        notes.forEach(function (note) {
          let div = document.createElement("div");
          div.classList.add("note");
          div.id = note.id;

          let title = document.createElement("p");
          title.classList.add("title");

          let titleSpan = document.createElement("span");
          titleSpan.innerHTML = note.title;

          let iconSpan = document.createElement("span");

          let editIcon = document.createElement("i");
          editIcon.classList.add("fa-solid", "fa-pen-to-square");
          editIcon.id = note.id;
          editIcon.onclick = editNote;

          let deleteIcon = document.createElement("i");
          deleteIcon.classList.add("fa-solid", "fa-trash");
          deleteIcon.id = note.id;
          deleteIcon.onclick = deleteNote;

          iconSpan.appendChild(editIcon);
          iconSpan.appendChild(deleteIcon);

          title.appendChild(titleSpan);
          title.appendChild(iconSpan);

          let content = document.createElement("p");
          content.classList.add("content");
          content.innerHTML = note.content;

          div.appendChild(title);
          div.appendChild(content);

          notesDiv.appendChild(div);
        });

        let addDiv = document.createElement("div");
        addDiv.classList.add("note", "add");

        let addNoteBtn = document.createElement("button");
        addNoteBtn.id = "addBtn";
        addNoteBtn.innerText = "+";
        addNoteBtn.onclick = createNote;

        let addNoteContent = document.createElement("p");
        addNoteContent.innerText = "Click to add a Note";

        addDiv.appendChild(addNoteBtn);
        addDiv.appendChild(addNoteContent);

        notesDiv.appendChild(addDiv);
      }

      render();