const toDoForm = document.querySelector('#todo-form');
const toDoList = document.querySelector('#todo-list');
const toDoInput = document.querySelector('#todo-form input');
let toDos = []; //let으로 해줘서 새로고침했을때 덮어써지지 않게 해준다
const TODOS_KEY = 'todos';

function saveToDo() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); //JSON을 이용해 문자열로 저장해줌
}

function toDoSubmit(event) {
  event.preventDefault(); //폼에서 서브밋되는 새로고침 방지
  const newValue = toDoInput.value; //newValue에 입력값 저장
  toDoInput.value = ''; //공백으로 만들어주고 입력창을
  const newValueObj = {
    text: newValue,
    id: Date.now(),
  };

  toDos.push(newValueObj); //객체로 보내줌 id를 받기 위해서
  paintToDo(newValueObj);
  saveToDo();
}

function removeButton(event) {
  const li = event.target.parentElement; //event로 정보를 받아서 target.parentElement에 접근하면
  toDos = toDos.filter((toDo) => toDo.id != parseInt(li.id)); //filter() 함수를 이용해 삭제한 것 빼고 유지해서 배열에 다시 넣어줌
  li.remove(); //부모에 접근이 가능해 해당하는 li를 삭제 가능
  saveToDo(); //저장하기 위해서
}

function paintToDo(newValue) {
  const li = document.createElement('li'); //html에 요소 생성시키는 작업
  li.id = newValue.id; //id
  const span = document.createElement('span');
  span.innerText = newValue.text; //객체로 받았으니까 .text를 붙여줘야함
  const button = document.createElement('button');
  button.innerText = '삭제';
  li.appendChild(span); //append 즉 추가하는건 다꾸미고 나서 해줘야함
  li.appendChild(button); //li에 내가 입력한 span과 버튼을 추가
  toDoList.appendChild(li); //todo-list에 li추가
  button.addEventListener('click', removeButton); //버튼클릭하면 이벤트 발생
}

toDoForm.addEventListener('submit', toDoSubmit);
const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;

  //forEach는 배열에 있는 각각의 요소에 대해 함수 실행해줌
  parsedToDos.forEach(paintToDo);
}
