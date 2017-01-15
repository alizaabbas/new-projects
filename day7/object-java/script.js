function Car(brand){
	this.brand = brand;
	"myFunc" : function(){
		return "it has 4 wheels";}
}
var myCar = new Car("toyota");
console.log(myCar.brand);
console.log(myCar[myFunc]);


var student = {
	name : "Aliza",
	hobby: function(){
		return "Reading is my hobby";
	}
}
 console.log(student.hobby());
 console.log(student.name);
