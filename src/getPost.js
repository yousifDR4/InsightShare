export default async function getPost (){
    try{
 const req= await fetch("http://api.localhost/sanctum/csrf-cookie", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    credentials: "include"

})
 const data=req;

console.log(data);
    }
    catch(e){
        
    }
}