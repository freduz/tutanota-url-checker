const urlInput:HTMLInputElement = document.getElementById('url') as HTMLInputElement;
const alertBox = document.getElementById("alert-box");
const statusblock = document.getElementById("status");
const urlInfoBlock = document.getElementById('url-info-card');

const PATTERN = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
urlInput.addEventListener('input',
processURL)




const thorottleURL = handleRequest(checkExistence,3000);

async function processURL(this:HTMLInputElement) {
    if(!URLChecker(this.value)){
        urlInfoBlock!.style.display='none';
        alertBox!.style.display = 'block';
        statusblock!.textContent = "Invalid URL provided";
        return;
    }
    alertBox!.style.display = 'none';
   try {
    await thorottleURL(this.value);
   } catch (error) {
    
   }
    
}


const URLChecker :(url:string)=> boolean =  (url) => {
     return PATTERN.test(url);
}

function handleRequest(func: Function, limit: number) {
    let inThrottle = false;
    return async function (url: string) {
      const args = arguments;
      const context = url;
      if (!inThrottle) {
        await func(context);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

async function checkExistence(url:string):Promise<void>{
    await new Promise((resolve) => setTimeout(resolve, 1000));
    let message:string = '';
    let heading:string = '';
    const exists = Math.random() < 0.5; 
    if(exists){
         message = "The entered URL found on the server";
         heading =  "Healthy URL";
         urlInfoBlock!.children[0].children[1].classList.add('bg-teal-100')
         urlInfoBlock!.children[0].children[1].classList.add('border-teal-500')
         urlInfoBlock!.children[0].children[1].classList.remove('bg-red-100')
         urlInfoBlock!.children[0].children[1].classList.remove('border-red-500')
         urlInfoBlock!.children[0].children[1].children[0].children[0].children[0].classList.remove('text-red-500')
         urlInfoBlock!.children[0].children[1].children[0].children[0].children[0].classList.add('text-teal-500')
    }else{
        message = "Sorry! the entred URL is not found";
        heading =  "BAD URL";
        urlInfoBlock!.children[0].children[1].classList.remove('bg-teal-100')
        urlInfoBlock!.children[0].children[1].classList.remove('border-teal-500')
        urlInfoBlock!.children[0].children[1].classList.add('bg-red-100')
        urlInfoBlock!.children[0].children[1].classList.add('border-red-500')
        urlInfoBlock!.children[0].children[1].children[0].children[0].children[0].classList.remove('text-teal-500')
        urlInfoBlock!.children[0].children[1].children[0].children[0].children[0].classList.add('text-red-500')
        
    }
    urlInfoBlock!.style.display='flex';
    urlInfoBlock!.children[0].children[1].children[0].children[1].children[0].textContent = heading;
    urlInfoBlock!.children[0].children[1].children[0].children[1].children[1].textContent = message;
  

  }