var fs = require('fs');
var dbPath1 = './public/account.json';

//獲取所有學生列表
exports.find = function(callback) {
    fs.readFile(dbPath1,'utf8', function(err, data) {
        if(err) {
            //有err的話，給調用者去處理
            return callback(err);
        }
        callback(null, JSON.parse(data).account);
    })
};

exports.findById = function (id,callback) {
    fs.readFile(dbPath1,'utf8', function(err, data) {
        if(err) {
            //有err的話，給調用者去處理
            return callback(err);
        }
        var account = JSON.parse(data).account;
        var result = account.find(function (x){return x.id === parseInt(id)})
        callback(null, result);
    })
};



//更新學生
exports.updateById = function(account1, callback) {
    fs.readFile(dbPath1,'utf8', function(err, data) {
        if(err) {
            return callback(err);
        }
        var account = JSON.parse(data).account;  //拿到[]

        //注意: 表單req.query得到的id為Strung，但db.json的id為Number，因此要轉成一樣型態
        account1.id = parseInt(account1.id);

        //要修改誰，就把他找出來
        var stu = account.find(function(x) { return x.id === account1.id });
        //遍歷所有屬性並覆蓋
        for(var key in account1) {
            stu[key] = account1[key];
        };

        var result = JSON.stringify({   //為了還原成db.json，要用{}包起來，並轉為string
            account: account
        });
        
        fs.writeFile(dbPath1, result, function(err) {
            if(err) {
                return callback(err);
            }
            //成功就沒錯，所以err物件是null
            callback(null);
        });
    })
}

