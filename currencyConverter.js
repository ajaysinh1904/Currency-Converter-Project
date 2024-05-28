const base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
let fromcurr=document.querySelector(".from select");
let tocurr=document.querySelector(".to select")
const msg=document.querySelector(".msg");

window.addEventListener("load",()=>{
    updateExchange();

});

const btn=document.querySelector("form button");
for (let select of dropdowns){
    for(currcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        
        if(select.name=="From"&&currcode=="USD"){
            newOption.selected="selected";
        }
        else if(select.name=="To"&&currcode=="INR"){
            newOption.selected="selected";
        }
            select.append(newOption);
    } 
    select.addEventListener("click",(evt)=>{
        updateFlag(evt.target);
    })  
}
const updateFlag=(ele)=>{
     let curcode=ele.value;
     let countrycode=countryList[curcode];
     let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
     let img=ele.parentElement.querySelector("img");
     img.src =newSrc;


}
btn.addEventListener  ("click",(evt)=>{
    evt.preventDefault();
    updateExchange();
})



const updateExchange=async()=>{
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if (amtval==""||amtval<=1){
        amtval=1;
        amount.value="1";
    }

    const url=`${base_url}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response= await fetch(url);
    let data= await response.json();
    let rate=data[tocurr.value.toLowerCase()];
    let finalamt=rate * amtval;
    msg.innerText=`${amtval}${fromcurr.value}=${finalamt}${tocurr.value}`;




}





