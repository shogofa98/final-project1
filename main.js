let list = [];


let listFromStorage = localStorage.getItem("list"); 
if (listFromStorage) {
        list = JSON.parse(listFromStorage);
            for (let i = 0;  i < list.length; i++) {
             let currentItem = list[i];

            let color = "";
         if( currentItem.category === 'love') {
                 color = 'bg-pink-200';
                 }
         else if(currentItem.category === 'history') {
                         color = 'bg-green-200'
                     }
                 else if(currentItem.category === 'horror') {
                          color = 'bg-yellow-200'
                         }

                         let htmlString = `
                             <li class="border-b border-gray-200 border-solid py-2.5">
                                         <span>➡️</span>
                                     ${currentItem.name}
                                      <span class="rounded-full text-md  px-3 text-grey-600 py-1 ${color}">${currentItem.category}</span>
                                       </li>
                                   `;

                                     // Add the html string into the parent
                                         document.querySelector("#list-items").innerHTML += htmlString;

            }
}

document.querySelector("#form").addEventListener("submit", function(event) {
        event.preventDefault();
            add();
});

document.querySelector("#list-items").addEventListener("click", function(e) {
        if (e.target.tagName === "SPAN") {
                    console.log("clicked on emoji");
                            let listItem = e.target.parentNode;

                        // removing the element from the list
                      let children = listItem.parentNode.children;
                         let childrenArray = Array.from(children);
                     let index = childrenArray.indexOf(listItem);
                                 list.splice(index, 1);
                         let jsonString = JSON.stringify(list);
                            localStorage.setItem("list", jsonString);
                                        listItem.remove();
                                                                                                
        }
});
function isValidated() {
        let isValid = false;
            let item = document.querySelector("#item").value.trim();
                let category = document.querySelector("#category").value.trim();

                    if (item.length <= 0 && category.length <= 0) {
                                document.querySelector("#item").classList.add("border-pink-600");
                                        document.querySelector("#category").classList.add("border-pink-600");
                    } else if (item.length <= 0) {
                                document.querySelector("#item").classList.add("border-pink-600");
                                        document.querySelector("#category").classList.remove("border-pink-600");
                    } else if (category.length <= 0) {
                                document.querySelector("#category").classList.add("border-pink-600");
                                        document.querySelector("#item").classList.remove("border-pink-600");
                    } else {
                                document.querySelector("#item").classList.remove("border-pink-600");
                                        document.querySelector("#category").classList.remove("border-pink-600");
                                                isValid = true;
                    }
                        return isValid;
}

function add() {
        if (isValidated()) {
                    let item = document.querySelector("#item").value.trim();
                            let category = document.querySelector("#category").value.trim();
                                    let color = "";

                                            if (category === 'love') {
                                                            color = 'bg-blue-100';
                                            } else if (category === 'history') {
                                                            color = 'bg-yellow-100';
                                            } else if (category === 'horror') {
                                                            color = 'bg-black-100';
                                            }

                                                    let newItem = {
                                                                    name: item,
                                                                                category: category,
                                                    };

                                         list.push(newItem);

                                     let jsonString = JSON.stringify(list);

                                    localStorage.setItem("list", jsonString);

                                         let htmlString = `
                         <li class="border-b border-gray-200 border-solid py-2.5">
                             <span>➡️</span>
                                         ${item}
                                 <span class="rounded-full text-md  px-3 text-grey-600 py-1 ${color}">${category}</span>
                                        </li>
                                                                       `;

                                       document.querySelector("#list-items").innerHTML += htmlString;

                                                        document.querySelector("#item").value = "";
                                                        document.querySelector("#category").value = "";
        } else {
                    console.log("Invalid inputs");
        }
}