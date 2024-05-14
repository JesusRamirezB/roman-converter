import { Component } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';

@Component({
    selector: 'app-conversion',
    templateUrl: './conversion.component.html',
    styleUrl: './conversion.component.css'
})
export class ConversionComponent {
    invalidInput: boolean = false;
    romanNum: string = '';
    nums: { input: string; output: number }[] = [];

    onSubmit(form: NgForm) {
        const romanInput = form.controls['roman'].value;
        if (!this.isValidRoman(romanInput)) {
            this.invalidInput = true;
            return;
        }

        this.invalidInput = false;
        this.nums.push({ input: romanInput, output: romanToDecimal(romanInput) });
        this.romanNum = '';
        form.reset();
    }

    isValidRoman(roman: string): boolean {
        return /^[IVXLCDM]*$/.test(roman);
    }

    removeCard(index: number){
        this.nums.splice(index,1);
    }

}

function romanToDecimal(input: string): number {
    const romanNums: Record<string, number> = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };
    let sum = 0;

    for (let i = 0; i < input.length; i++) {
        const currentSymbol = romanNums[input[i]];
        const nextSymbol = romanNums[input[i + 1]];
        if (nextSymbol && currentSymbol < nextSymbol) {
            sum -= currentSymbol;
        } else {
            sum += currentSymbol;
        }
    }

    return sum;
}

