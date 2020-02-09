var mE=false;
var rE=false;
var pE=false;
var cE=false;
var srE=false;
var skE=false;

document.addEventListener("DOMContentLoaded", function(event){
  //alert("It's loaded!");
  deleteInputValues();
  
  hideContainer('containerError');
  hideContainer('containerResult1');
  hideContainer('containerResult2');
  hideContainer('containerConclusion');
  
  //formating check
  document.getElementById("inputM").addEventListener("change", mChanged);
  document.getElementById("inputR").addEventListener("change", rChanged);
  document.getElementById("inputP").addEventListener("change", pChanged);
  document.getElementById("inputC").addEventListener("change", cChanged);
  document.getElementById("inputDobavljacRabat").addEventListener("change", srChanged);
  document.getElementById("inputDobavljacKolicina").addEventListener("change", sqChanged);
  
  //calculations
  document.getElementById("compareCost").addEventListener("click", calculateCosts);
  document.getElementById("deleteInputValues").addEventListener("click", deleteInputValues);
});
function deleteInputValues() {
    clearDataInputFields();
    clearDataInputFieldsSupplier();
    hideContainer('containerError');
    hideContainer('containerResult1');
    hideContainer('containerResult2');
    hideContainer('containerConclusion');
    //remove error msgs if any there
    clearAllErrorMessages();
    
}
function clearAllErrorMessages() {
  document.getElementById("errorM").innerHTML ="";
  document.getElementById("errorR").innerHTML ="";
  document.getElementById("errorP").innerHTML ="";
  document.getElementById("errorC").innerHTML ="";
  document.getElementById("errorDR").innerHTML ="";
  document.getElementById("errorDK").innerHTML ="";
  mE=false;
  rE=false;
  pE=false;
  cE=false;
  srE=false;
  skE=false;
}
function clearDataInputFields() {
  console.log("clearing input data");
  //var inputM = document.getElementById("inputM");
  //inputM.value = "";
  document.getElementById("inputM").value="";
  document.getElementById("inputR").value="";
  document.getElementById("inputP").value="";
  document.getElementById("inputC").value="";
}
function clearDataInputFieldsSupplier() {
  console.log("clearing input data Supplier");
  document.getElementById("inputDobavljacRabat").value="";
  document.getElementById("inputDobavljacKolicina").value="";
}
function clearResultData() {
  console.log("clearing result data");
  document.getElementById("optAm").value="";
  document.getElementById("totalMaterial").value="";
  document.getElementById("totalOrder").value="";
  document.getElementById("totalStorage").value="";
  document.getElementById("totalYearlyCost").value="";
  
  document.getElementById("totalMaterial2").value="";
  document.getElementById("totalOrder2").value="";
  document.getElementById("totalStorage2").value="";
  document.getElementById("totalYearlyCost2").value="";
  
  document.getElementById("conclusionMessage").value="";
}
function addConclusion() {
  console.log("Adding conclusion message");
}
function mChanged(){
    mE=false;
    var Mvalue = document.getElementById("inputM").value;
    if( isPositiveInteger(Mvalue ) && Mvalue>0 ){
        document.getElementById("errorM").innerHTML ="";
    }else{
        document.getElementById("errorM").innerHTML ="Pogrešan unos. Unesite cijeli broj (veći od 0)";
        mE=true;
    }
}
function rChanged(){
    //TODO TOČKA
    rE=false;
    var Mvalue = document.getElementById("inputR").value;
    if( !isNaN(Mvalue)&& parseFloat(Mvalue ) && parseFloat(Mvalue)>0 ){
        document.getElementById("errorR").innerHTML ="";
    }else{
        document.getElementById("errorR").innerHTML ="Pogrešan unos. Unesite decimalni broj (veći od 0)";
        rE=true;
    }
}
function pChanged(){
    //TODO TOČKA
    pE=false;
    var Mvalue = document.getElementById("inputP").value;
    if(!isNaN(Mvalue)&& parseFloat(Mvalue ) && parseFloat(Mvalue)>0 ){
        document.getElementById("errorP").innerHTML ="";
    }else{
        document.getElementById("errorP").innerHTML ="Pogrešan unos. Unesite decimalni broj (veći od 0)";
        pE=true;
    }
}
function cChanged(){
    cE=false;
    var Mvalue = document.getElementById("inputC").value;
    if( isPositiveInteger(Mvalue ) && Mvalue>0  ){
        document.getElementById("errorC").innerHTML ="";
    }else{
        document.getElementById("errorC").innerHTML ="Pogrešan unos. Unesite cijeli broj (veći od 0)";
        cE=true;
    }
}
function srChanged(){
    srE=false;
    var Mvalue = document.getElementById("inputDobavljacRabat").value;
    if( isPositiveInteger(Mvalue ) && Mvalue < 100 && Mvalue>0  ){
        document.getElementById("errorDR").innerHTML ="";
    }else{
        document.getElementById("errorDR").innerHTML ="Pogrešan unos. Unesite cijeli broj <0,100>";
        srE=true;
    }
}
function sqChanged(){
    //+
    skE=false;
    var Mvalue = document.getElementById("inputDobavljacKolicina").value;
    if( isPositiveInteger(Mvalue ) && Mvalue>0 ){
        document.getElementById("errorDK").innerHTML ="";
    }else{
        document.getElementById("errorDK").innerHTML ="Pogrešan unos. Unesite cijeli broj (veći od 0)";
        skE=true;
    }
}

function isPositiveInteger(n) {
    return 0 === n % (!isNaN(parseFloat(n)) && 0 <= ~~n);
}
//
function calculateQ(M,P,R,C){
    //TODO ZAOKRUZITI NA VECI INTEGER PRVI GORNJI+popravljeno valjda
    return Math.round(Math.sqrt((2*M*P)/(R*C))  );
}
function calculateMaterialValue(M,R,DiscountRate){
    //DiscountRate for material value 0-1
    //1 is 0 discount
    return M*R*DiscountRate;
}
function calculateOrderCost(M,Q,P){
    return M/Q*P;
}
function calculateStorageCost(R,Q,C,DiscountRate){
     //DiscountRate for material value 0-1
    return R*Q*C*0.5*DiscountRate;
}
function calculateTotalYearlyCost(Material, Order, Storage){
    return Material+Order+Storage;
}

function hideContainer(name){
  var elem = document.getElementById( name );
  if ( !elem.classList.contains('sakrij') ) {
    elem.classList.add('sakrij');
    }
}
function showContainer(name){
  var elem = document.getElementById( name );
  if ( elem.classList.contains('sakrij') ) { 
    elem.classList.remove('sakrij');
    }
}
function calculateCosts(){
    if( emptyValueDoesnNotExist() && allValuesFormatedOK() ){
        console.log("Doing calculation");
        hideContainer('containerError');
        var M = document.getElementById("inputM").value;
        var P = document.getElementById("inputP").value;
        var R = document.getElementById("inputR").value;
        var C = formatPercentage(document.getElementById("inputC").value);

        var Q2 = document.getElementById("inputDobavljacKolicina").value;
        var DiscountRate = 1 - parseInt(document.getElementById("inputDobavljacRabat").value )/100;

        var Q1 = calculateQ(M,P,R,C);
        document.getElementById("optAm").innerHTML =Q1;
        var totalMaterial = calculateMaterialValue(M,R,1);
        document.getElementById("totalMaterial").innerHTML = totalMaterial;
        var totalOrder = calculateOrderCost(M,Q1,P);
        document.getElementById("totalOrder").innerHTML = totalOrder;
        var totalStorage = calculateStorageCost(R,Q1,C,1);
        document.getElementById("totalStorage").innerHTML = totalStorage;
        var totalYearlyCost = calculateTotalYearlyCost(totalMaterial, totalOrder, totalStorage);
        document.getElementById("totalYearlyCost").innerHTML = totalYearlyCost;

        var totalMaterial2 = calculateMaterialValue(M,R,DiscountRate);
        document.getElementById("totalMaterial2").innerHTML = totalMaterial2;
        var totalOrder2 = calculateOrderCost(M,Q2,P);
        document.getElementById("totalOrder2").innerHTML = totalOrder2;
        var totalStorage2  = calculateStorageCost(R,Q2,C,DiscountRate);
        document.getElementById("totalStorage2").innerHTML = totalStorage2;
        var totalYearlyCost2 = calculateTotalYearlyCost(totalMaterial2, totalOrder2, totalStorage2);
        document.getElementById("totalYearlyCost2").innerHTML = totalYearlyCost2;

        var conclusionMessage = "";
        if(totalYearlyCost<totalYearlyCost2){
            conclusionMessage = 'Ponuda s rabatom se ne isplati. <i class="fas fa-thumbs-down"></i>';
        }
        if(totalYearlyCost==totalYearlyCost2){
            conclusionMessage = 'Ponude su jednako isplative. <i class="fas fa-check-double"></i>';
        }
        if(totalYearlyCost>totalYearlyCost2){
            conclusionMessage = 'Ponuda s rabatom je isplativija. <i class="fas fa-thumbs-up"></i>';
        }
        document.getElementById("conclusionMessage").innerHTML = conclusionMessage;

        console.log("Showing results of calculation");
        showContainer('containerResult1');
        showContainer('containerResult2');
        showContainer('containerConclusion');
    }else{
        showContainer('containerError');
        var errorMsg = "";
        if(!emptyValueDoesnNotExist()){
            errorMsg += '<p>Unesite sve potrebne vrijednosti<br></p>';
        }
        if(!allValuesFormatedOK()){
            errorMsg += '<p>Popravite krivo unešene podatke<br></p>';
        }
        document.getElementById("errorList").innerHTML = errorMsg;
    }
    
    
    
}
function formatPercentage(percentage){
    return percentage/100;
}
function emptyValueDoesnNotExist(){
    //no empty value
    var M = document.getElementById("inputM").value;
    var P = document.getElementById("inputP").value;
    var R = document.getElementById("inputR").value;
    var C = document.getElementById("inputC").value;
    var Q2 = document.getElementById("inputDobavljacKolicina").value;
    var DiscountRate = document.getElementById("inputDobavljacRabat").value ;
    if(M!=""&&P!=""&&R!=""&&C!=""&&Q2!=""&&DiscountRate!=""){return true;} 
    else{return false;} 
}
function allValuesFormatedOK(){
    //no error msgs
    if(mE==false&&pE==false&&rE==false&&cE==false&&skE==false&&srE==false){return true;} 
    else{return false;} 
}