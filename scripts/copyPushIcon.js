module.exports = function(ctx) {
    var deferral = ctx.requireCordovaModule('q').defer();
    var filestocopy = [{
        "../resources/android/icon/drawable-ic_push.png":
            "../platforms/android/res/drawable/ic_push.png"
    }];

    var fs = ctx.requireCordovaModule('fs');
    var path =  ctx.requireCordovaModule('path');

    var rootdir = process.argv[2];

    filestocopy.forEach(function(obj) {
        Object.keys(obj).forEach(function(key) {
            var val = obj[key];
            var srcfile = path.join(rootdir, key);
            var destfile = path.join(rootdir, val);
            //console.log("copying "+srcfile+" to "+destfile);
            var destdir = path.dirname(destfile);
            if(!fs.existsSync(destdir)){
                fs.mkdirSync(destdir);
            }
            
            if (fs.existsSync(srcfile)) {
                fs.createReadStream(srcfile).pipe(
                    fs.createWriteStream(destfile));
            }
            else if(!fs.existsSync(srcfile)){
                console.log("Create a custom silhouette icon for push notifications in android 21+ and save it in: " + srcfile);
            }
            else{
                console.log("Targer directory doesn't exist: " + destdir);
            }
        });
    });

    return deferral.promise;
};
