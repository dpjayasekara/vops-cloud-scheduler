module.exports = function(){
    var validateAdmin = require('./adminValidator');
    var jf = require('jsonfile');
    var confFile = process.env.PWD + '/config/globalConfig.json';
    var readConfig = function (callback) {
        jf.readFile(confFile, function (err, obj) {
            if(err){
                callback(err);
            }
            else{
                if(obj){
                    callback(null, obj);
                }
                else{
                    callback("No configuration info available !");
                }
            }
        });
    }

    var writeConfig = function (adminSessID, configObj, callback){
        if(validateAdmin(adminSessID)){
            jf.writeFile(confFile, configObj, function (err) {
                if(err){
                    callback(err);
                }
                else{
                    callback(null, "Configuration saved successfully!");
                }
            })
        }
    }

    return {
        readConfig: readConfig,
        writeConfig: writeConfig
    }
    
}