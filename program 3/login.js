const form=document.querySelector("#login-form");
let reg_email=localStorage.getItem("username");
let reg_password=localStorage.getItem("password");
const email=document.querySelector('#email');
const password=document.querySelector('#password');

form.addEventListener('submit', (event)=>{
    
    validateLogin();
    console.log(isFormValid());
    if(isFormValid()==true){
        form.submit();
     }else {
         event.preventDefault();
     }
});

function isFormValid(){
    const inputContainers = form.querySelectorAll('.input-group');
    let result = true;
    inputContainers.forEach((container)=>{
        if(container.classList.contains('error')){
            result = false;
        }
    });
    return result;
}

function validateLogin()
{
    if(reg_email!=email.value)
    {
        setError(email,"user not found");
    } 
    else
    {
        setSuccess(email);
    }
    if(reg_password!=password.value)
    {
        setError(password,"Wrong password");
    }
    else
    {
        setSuccess(password);
    }
}

function setError(element, errorMessage) {
    const parent = element.parentElement;
    if(parent.classList.contains('success')){
        parent.classList.remove('success');
    }
    parent.classList.add('error');
    const paragraph = parent.querySelector('p');
    paragraph.textContent = errorMessage;
}

function setSuccess(element){
    const parent = element.parentElement;
    if(parent.classList.contains('error')){
        parent.classList.remove('error');
    }
    parent.classList.add('success');
}
