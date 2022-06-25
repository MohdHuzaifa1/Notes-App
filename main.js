const notesarea = document.getElementsByClassName('notesarea')[0];
const saveNote = document.getElementById('saveNote');
const titleBox = document.getElementsByTagName('h2')[1];
const timeBox = document.getElementsByClassName('timeBox')[0];
const noteBox = document.getElementsByClassName('noteBox')[0];
const toast = document.getElementsByClassName('toast')[0];
const toolbar = document.getElementsByClassName('toolbar')[0];
const tools = document.getElementsByClassName('tools');
const wide = document.getElementsByClassName('wide');
const colorText = document.getElementById('color-text');
const colorTextFill = document.getElementById('color-text-fill');
const loader = document.getElementsByClassName('loaderContainer')[0];
const overlay = document.getElementsByClassName('overlay')[0];
const data = [];

window.onload = function() {
  if (localStorage && localStorage.getItem('data')) {
    notesarea.innerHTML = localStorage.getItem('data');
  }
}

function toggleElement(element) {
  element.classList.toggle('active');
}
for (var i = 0; i < tools.length; i++) {
  tools[i].addEventListener('click', function() {
    this.classList.toggle('active');
    document.execCommand(this.id);
    noteBox.focus()
  })
}
wide[0].onclick = function() {
  document.execCommand('foreColor', false, colorText.value);
  toggleToast('Text Color set to ' + colorText.value)
  //noteBox.focus()
}
wide[1].onclick = function() {
  document.execCommand('backColor', false, colorTextFill.value);
  toggleToast('Highlight Color set to ' + colorTextFill.value)
  noteBox.focus()
}

function toggleToast(text) {
  toast.innerText = text;
  toast.classList.add('active');
  setTimeout(function() {
    toast.classList.remove('active');
  }, 2000);
}
saveNote.onclick = function() {
  if (titleBox.innerText == '' && noteBox.innerText == '') {
    alert('Both fields are empty')
  } else if (titleBox.innerText == '') {
    alert('Title field is empty')
  } else if (noteBox.innerText == '') {
    alert('Note field is empty')
  } else {
    notesarea.innerHTML += `<div class="notes" ondblclick="deleteNote(this)"><div class="title">${titleBox.innerHTML}</div><div class="note">${noteBox.innerHTML}</div></div>`;
    titleBox.innerHTML = '';
    noteBox.innerHTML = '';
    /*setTimeout(function() {
      loader.classList.remove('active');
      overlay.classList.remove('active');
      titleBox.innerHTML = '';
      noteBox.innerHTML = '';
    }, 2000);*/
    //setTimeout(function() {
      document.getElementsByClassName('newNoteBox')[0].classList.remove('active');
    //}, 1000);
    saveToLocalStorage();
  }
}

function deleteNote(element) {
  notesarea.removeChild(element);
  saveToLocalStorage();
}

function saveToLocalStorage() {
  if (localStorage) {
    localStorage.setItem('data', notesarea.innerHTML)
  } else {
    alert('Your browser cannot store your data');
  }
}
