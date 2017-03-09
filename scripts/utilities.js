function forEach(array, callback) {
    for(var i = 0; i < array.length; i++) {
        var picture = callback(array[i]);
        console.log(picture);
    }
}