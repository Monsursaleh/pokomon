console.log("testing");
fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
  .then((response) => response.json())
  .then((json) => {
    datalist(json);
  });

let list = document.querySelector(".list");
const datalist = (data) => {
  console.log(data);
  //   list.innerHTML= data.map((item,i)=>{
  // return `<li></li>
  // img sric`

  // })
};
