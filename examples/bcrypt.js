const bcrypt = require('bcrypt');
const {hash} = require("bcrypt");

const saltRounds = 10;
const plainPassword = 'mat khau chua ma hoa';

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
    if (err) throw err;
    console.log('Mật khẩu đã mã hóa:', hash);
});

bcrypt.compare('mat khau chua ma hoa', hash, (err, result) => {
    if (result) {
        console.log('Mật khẩu đúng!');
    } else {
        console.log('Mật khẩu sai!');
    }
});