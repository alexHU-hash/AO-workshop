const THEME_STORAGE_KEY="ao-gear-workshop-theme-v1";
const AVAILABLE_THEMES=["crimson","blue","dark"];

function setTheme(theme){
  const selected=AVAILABLE_THEMES.includes(theme)?theme:"crimson";
  document.documentElement.dataset.theme=selected;
  document.body.dataset.theme=selected;
  const selector=document.getElementById("theme-select");
  if(selector)selector.value=selected;
}

let savedTheme="crimson";
try{
  const storedTheme=localStorage.getItem(THEME_STORAGE_KEY);
  if(storedTheme&&AVAILABLE_THEMES.includes(storedTheme))savedTheme=storedTheme;
}catch(error){
  console.warn("Could not read the saved color theme.",error);
}
document.documentElement.dataset.theme=savedTheme;
document.addEventListener("DOMContentLoaded",()=>{
  setTheme(savedTheme);
  const selector=document.getElementById("theme-select");
  if(!selector)return;
  selector.addEventListener("change",()=>{
    setTheme(selector.value);
    try{
      localStorage.setItem(THEME_STORAGE_KEY,selector.value);
    }catch(error){
      console.warn("Could not save the color theme.",error);
    }
  });
});
