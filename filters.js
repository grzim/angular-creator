/**
 * Created by Grzegorz on 2014-08-10.
 */
mainApp.filter('range', function() {
    return function(val, range) {
        range = parseInt(range);
        for (var i=0; i<range; i++)
            val.push(i);
        return val;
    };
});
