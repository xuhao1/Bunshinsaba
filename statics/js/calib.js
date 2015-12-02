function calib_mouse_with_lines(src_lines) {
    var lines = new Array();
    console.log(src_lines);
    for (var i in src_lines)
    {
        if (src_lines[i].length > 9)
        {
            lines.push(src_lines[i]);
        }
    }
    
    console.log(lines.length);
    x0 = lines[0][0][0];
    y0 = lines[0][0][1];
    var correline = new Array();
    for (var i in lines)
    {
        var aline = lines[i];
        var ax0 = aline[0][0];
        var ay0 = aline[0][1];
        for (k in aline)
        {
            correline.push ( [aline[k][0] - ax0,aline[k][1] - ay0]);
        }
    }
    var ks = fit_a_line(correline);
    var k = ks[1];
    var ro = Math.sqrt(k*k+1);
    mapping_A = [[1/ro,k/ro],[-k/ro,1/ro]];
    mapping_B = numeric.minus(
        [[x0],[y0]] - dot(A,[[x0],[y0]])
                         );
}

function fit_a_line(aline)
{
    var A = new Array(aline.length) 
    var B = new Array(aline.length);
    for (var i in aline)
    {
        A[i] = new Array(2);
        A[i][0] = 1;
        A[i][1] = aline[i][0];
        
        B[i] = aline[i][1];
    }
    //A = new Matrix(A);
    //B = new Matrix(B);
    trans([B]);
    
    //console.log("A:"+A);
    //console.log("B:"+B);
    //console.log(A);
    var X = dot(trans(A),A);
    console.log(X);
    X = inv(X);
    X = dot(X,trans(A));
    X = dot(X,B);
    console.log(X);
    var a0 = X[0];
    var a1 = X[1];
    line(aline[0][0] + x0,a0+a1*aline[0][0] + y0,
        aline[aline.length-1][0] + x0,a0+a1*aline[aline.length-1][0]+y0
        );
    return [a0,a1];
}