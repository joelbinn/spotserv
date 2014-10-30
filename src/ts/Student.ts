class Student {
    fullname : string;
    constructor(public firstname, public middleinitial, public lastname) {
        this.fullname = firstname + " " + middleinitial + " " + lastname;
    }
}

var s: Student = new Student('kalle', 'p', 'banan');

var g = (f) => f(42);

console.log(g((n)=>n*2));