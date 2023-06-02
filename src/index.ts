const urlInput:HTMLInputElement = document.getElementById('url') as HTMLInputElement;
const alertBox = document.getElementById("alert-box");
const statusblock = document.getElementById("status");
const urlInfoBlock = document.getElementById('url-info-card');
const checkResult = document.getElementById("check-status")


const PATTERN = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
urlInput.addEventListener('input',
processURL)




const thorottleURL = debounceAndThrottle(checkExistence,300,1000);

async function processURL(this:HTMLInputElement) {
    if(!URLChecker(this.value)){
        urlInfoBlock!.style.display='none';
        alertBox!.style.display = 'block';
        statusblock!.textContent = "Invalid URL provided";
        return;
    }
    alertBox!.style.display = 'none';
   try {
    thorottleURL(this.value);
   } catch (error) {
    
   }
    
}


const URLChecker :(url:string)=> boolean =  (url) => {
     return PATTERN.test(url);
}


  function debounceAndThrottle(func:any, delay:number, limit:number) {
    let timerId:any;
    let lastCallTime = 0;
    let isThrottled = false;
  
    return (...args:any[]) => {
      const currentTime = Date.now();
      clearTimeout(timerId);
  
      if (currentTime - lastCallTime >= limit) {
        func(args);
        lastCallTime = currentTime;
      } else {
        timerId = setTimeout(() => {
          func(args);
          lastCallTime = currentTime;
        }, delay);
      }
    };
  }


  async function checkExistence(url:string) {
    try {
      const status:any = await checkingServer(url)
      const result = status.exists ? (status.isFile ? 'File exists' : 'Folder exists') : 'URL does not exist';
      urlInfoBlock!.style.display="flex";
      checkResult!.textContent = result;
    } catch (error) {
      alert(error)
    }
   
  }


  function checkingServer(url:string){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const response = { exists: Math.random() >= 0.5, isFile: Math.random() >= 0.5 };
        resolve(response);
      }, 1000);
    });
  }


