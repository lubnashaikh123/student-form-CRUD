// alert("hello--");
let cl=console.log;
const stdForm = document.getElementById("stdForm");
const updateBtn = document.getElementById("updateBtn");
const submitBtn = document.getElementById("submitBtn");
const stdContainer = document.getElementById("stdContainer");
const fnameControl = document.getElementById("fname");
const lnameControl = document.getElementById("lname");
const emailControl = document.getElementById("email");
const contactControl = document.getElementById("contact");


const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};






//CRUD
// Create >>completed
// Read   >>completed 
// Update >>completed
// Delete >>completed
let stdArray=[
    {
    fname :"jhon",
    lname :"wick",
    email :"jhon@wick.com",
    contact :1234567890,
    
    }
];
stdArray=JSON.parse(localStorage.getItem("stdData"))??[];

const onEdit =(ele)=>{
   // cl(ele.closest(`tr`).getAttribute(`id`))
    let editId = ele.closest(`tr`).getAttribute(`id`);
    localStorage.setItem("editId",editId)
    let editObj=stdArray.find(std => std.id === editId )
    cl(editObj)
    fnameControl.value = editObj.fname;
    lnameControl.value = editObj.lname;
    emailControl.value = editObj.email;
    contactControl.value = editObj.contact;

    updateBtn.classList.remove(`d-none`);
    submitBtn.classList.add(`d-none`);
}
const onDelete =(ele)=>{
    // cl(ele);
    let deletedId = ele.closest("tr").id;
    // cl(deletedId);
    let deletedIndex =stdArray.findIndex(std => std.id === deletedId)
    cl(deletedIndex)
    stdArray.splice(deletedIndex,1);
    localStorage.setItem("stdData",JSON.stringify(stdArray));
    templating(stdArray);

}



const templating =(arr)=>{
    let result ='';
    arr.forEach((std ,i)=> {
        result +=`
             <tr id="${std.id}">
               <td>${i + 1}</td>
               <td>${std.fname}</td>
               <td>${std.lname}</td>
               <td>${std.email}</td>
               <td>${std.contact}</td>

               <td>
               <button class="btn btn-primary" onclick="onEdit(this)">
                 <i class="fa-solid fa-pen-to-square"></i>
               </button>
               </td>
               <td>
               <button class="btn btn-danger" onclick="onDelete(this)">
               <i class="fa-solid fa-trash"></i>
               </button>
               </td>
              </tr>
              `
                   
    });
    stdContainer.innerHTML=result;
}
// if(localStorage.getItem("stdData")){
//     stdArray=JSON.parse(localStorage.getItem("stdData"));
// }
// stdArray=JSON.parse(localStorage.getItem("stdData"))||[];

// cl(stdArray)
templating(stdArray)
const onstdAdd=(eve)=>{
    eve.preventDefault();
    let stdObj={
        fname:fnameControl.value,
        lname:lnameControl.value,
        email:emailControl.value,
        contact:contactControl.value,
        id:generateUuid()
    }
    eve.target.reset();
    stdArray.push(stdObj);
    localStorage.setItem("stdData",JSON.stringify(stdArray));
    templating(stdArray)
    cl(stdArray);
}

const onstdUpdate=()=>{    
let updateId =localStorage.getItem("editId")  
// cl(updateId)
stdArray.forEach(std =>{
    if(std.id ===updateId){
        std.fname=fnameControl.value;
        std.lname=lnameControl.value;
        std.email=emailControl.value;
        std.contact=contactControl.value;
    }
})
localStorage.setItem("stdData",JSON.stringify(stdArray));
templating(stdArray);
stdForm.reset();
}
stdForm.addEventListener("submit",onstdAdd);
 updateBtn.addEventListener("click",onstdUpdate)