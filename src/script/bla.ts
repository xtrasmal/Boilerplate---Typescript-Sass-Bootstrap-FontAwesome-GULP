import {Test} from './test';

export class Bla {

	private bla: string;
	private test: Test;

	constructor(){
		this.test = new Test('Jo!');
		this.bla = "ratata!!!!";
	};

	yo(){
		console.log(this.bla + "!");
		this.test.say();
		$('div').html(this.bla);

	}
}