// A Naive recursive Python program
// to find minimum number operations
// to convert str1 to str2
 new Search();
class Search {
    constructor() {
        this.arr = ['karmir', 'kapuyt', 'kanach', 'dexina', "rozvia"];
        this.input = 'a';
        this.  StrictEqual = [];
            this.middleEqual = [];
            this. weakEqual = [];
            this.lastEqual = [];
            this.inputLength = this.input.length;
            this.dataLength = null;
            this.getSearch();
    }
    editMatch(str1, str2,
              m, n) {
        // If first string is empty,
        // the only option is to insert.
        // all characters of second
        // string into first
        if (m === 0)
            return n;

        // If second string is empty,
        // the only option is to
        // remove all characters of
        // first string
        if (n === 0) return m;

        // If last characters of two
        // strings are same, nothing
        // much to do. Ignore last
        // characters and get count
        // for remaining strings.
        if (str1[m - 1] === str2[n - 1]) {
            return this.editMatch(str1, str2,
                m - 1, n - 1);
        }

        // If last characters are not same,
        // consider all three operations on
        // last character of first string,
        // recursively compute minimum cost
        // for all three operations and take
        // minimum of three values.

        return 1 + Math.min(
            this.editMatch(str1, str2, m, n - 1), // Insert
            this.editMatch(str1, str2, m - 1, n), // Remove
            this.editMatch(str1, str2, m - 1, n - 1)
        ); // Replace
    }

// Driver Code
    getSearch(){
    this.arr.forEach(data => {this.dataLength = data.length;
    let checkNotMatch = this.editMatch(this.input, data, this.inputLength, this.dataLength);
    if(this.dataLength < this.inputLength) [this.dataLength, this.inputLength] = [this.inputLength,this.dataLength];
    let quantityMatch = this.dataLength - checkNotMatch;
    this.addResult(quantityMatch, data)
    })
}
;
static classificationSearch = {
    0: 'StrictEqual',
    1: 'middleEqual',
    2: 'weakEqual',
    3: 'lastEqual'
}

addResult(quantityMatch, data) {
    let myFunction ;
    console.log(data)
    // if (quantityMatch < 4) self.classificationSearch[quantityMatch](data);

}

 StrictEqual(data) {
     this.StrictEqual.unshift(data);

}

 middleEqual(data) {
     this.middleEqual.unshift(data);
}

 weakEqual(data) {
     this.weakEqual.unshift(data);

}

 lastEqual(data) {

     this.lastEqual.unshift(data);
}

// This code is contributed
// by Shivi_Aggarwal
}
