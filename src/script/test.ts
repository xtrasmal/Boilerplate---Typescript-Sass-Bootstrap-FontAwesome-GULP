export class Test {

	test: string;

	constructor(private name: string){
		this.test = name;
	}

	say(){
		console.log(this.name);
	}
}