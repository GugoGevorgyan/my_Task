let data;
let search;
let time1;
const submit = document.getElementById('submit');
const search_content = document.getElementById('search_content');
const count_res = document.getElementById('count_res');
submit.addEventListener("click", prepareSearch, false);

function prepareSearch(event) {
    event.preventDefault();
    if (search) search.clearClass();
    // if (searchText) searchText.remove();
    const input = document.getElementById('search').value;
    // if (input.length > 1) {
    time1 = new Date();
    getZapros(input);
// }
}

function getZapros(input) {
    const promise = fetch('php/getFile.php', {
        method: 'GET',
    }).then((r) => {
        if (r.ok) {
            return r;
        }
        throw new Error('invalid status code');
    });

    promise.then(r => r.json())
        .then((r) => {
            data = r;
            search = new Search(input, data);
        })
        .catch(error => console.log(error));

}

class Search {
    constructor(input, data) {
        this.arr = data;
        this.input = input;
        this.strictEqual = []; //++++
        this.middleEqual = []; //+++
        this.weakEqual = [];   //++
        this.lastEqual = [];   //+
        this.inputLength = this.input.length;
        this.countAddResult = 0;
        this.countDrawSearch = 0;
        this.getSearch();
    }

    editMatch(search, data, m, n) {

        if (m === 0) return n;

        if (n === 0) return m;

        if (search[m - 1] === data[n - 1]) {
            return this.editMatch(search, data, m - 1, n - 1);
        }

        return 1 + Math.min(
            this.editMatch(search, data, m, n - 1), // Insert
            this.editMatch(search, data, m - 1, n), // Remove
            this.editMatch(search, data, m - 1, n - 1)); // Replace
    }

    getSearch() {
        this.arr.forEach((data, i) => {
            setTimeout((i) => {
                let inputLen = this.inputLength;
                let d = data.length;
                let dataLength = data.length;
                let checkNotMatch = this.editMatch(this.input, data, this.inputLength, dataLength);// chhamnkac
                if (this.inputLength < dataLength) [d, inputLen] = [inputLen, d];
                let quantityMatch = inputLen - checkNotMatch; //hamnkac
                if (quantityMatch > 1) this.checkValidResult(quantityMatch, data);
                if (this.arr.length - 1 === i) this.drawSearchResult();

            }, 0, i);
        });

        // this.drawSearchResult();
    }

    static classificationSearch = {
        0: 'strictEqual',
        1: 'middleEqual',
        2: 'weakEqual',
        3: 'lastEqual'
    };

    async checkValidResult(quantityMatch, conformity) {
        if (Math.floor(this.inputLength / 2) < quantityMatch) {
            this.addValidResult(quantityMatch, conformity);
        }
    }

    addValidResult(quantityMatch, conformity) {
        let myArray = this.inputLength - quantityMatch;
        myArray = Search.classificationSearch[myArray];
        if (myArray) {
            this[myArray].push(conformity);
            this.countAddResult += 1;
            if (this.countAddResult === 15) {
                this.drawSearchResult();
            }
        }
    }

    clearClass() {
        let searchText = document.querySelectorAll('.searchContent');
        searchText.forEach(element => element.remove());
    }

    drawSearchResult() {
        for (let i = 0; i <= 3; i++) {
            let arr = Search.classificationSearch[i];
            this[arr].forEach(result => {
                if (this.countDrawSearch === 15) return;
                let searchText = document.createElement('p');
                searchText.innerText = result;
                searchText.classList.add('searchContent');
                search_content.appendChild(searchText);
                this.countDrawSearch++
            });
        }
        let time2 = new Date();
        let time = time2 - time1;
        console.log('ttt', this.countAddResult, time);
        count_res.innerText = `Results: approximately ${this.countAddResult} (0,00${time} msc)`;
    }
}
