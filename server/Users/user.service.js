const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const pagination = require('../_helpers/pagination');


module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    changepassword,
    isTrueAdmin
};

async function authenticate({ username, password }) { 
    const user = await db.User.scope('withPasswordHash').findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) { 
        throw 'Username atau password tidak sesuai';
    }
    //success
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '1d' });
    return { ...omitHash(user.get()), token };
}

async function getAll(rq) {
    const req = rq.query;
    const role = rq.headers.userrole;

    var pageIndex = req.pageIndex;
    var pageSize = req.pageSize;
    var sortColumn = req.sortColumn;
    var sortOrder = req.sortOrder;
    var filterColumn = req.filterColumn;
    var filterQuery = req.filterQuery;
    var model = db.User; 
    if (role === "Admin") {
        return await pagination.userpaging(model, pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery);
    }
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { username: params.username } })) {
        throw 'Uname "' + params.username + '" sudah terdaftar';
    }
   
    // hash password
    if (params.password) {
        params.passwordHash = await bcrypt.hash(params.password, 10);
    }
    // save user
    await db.User.create(params);
}

async function update(id, params) {
    const user = await getUser(id);

    // validate
    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" sudah digunakan';
    }

    // hash password if it was entered
    if (params.password) {
        params.passwordHash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();

    return omitHash(user.get())
}
async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}
async function changepassword(body) {
    const user = await db.User.scope('withPasswordHash').findOne({ where: { id: body.id } });
    if (user) {
        let oldpwd = body.oldpwd;
        let newpwd = await bcrypt.hash(body.newpwd,10);
        if (bcrypt.compareSync(oldpwd, user.passwordHash)) {
            db.User.update({passwordHash : newpwd}, {where: {id: user.id}});
            return 'Berhasil ubah password';
        } else {
            return 'invalid: password lama salah';
        }
    } else {
        return 'invalid user';
    }
}
async function resetPassword(body){
    const user = await db.User.scope('withPasswordHash').findOne({ where: { id: body.id } });
    if (user) {
        const npwd = bcrypt.hash(user.username, 10);
        db.User.update({passwordHash : npwd}, {where: {id: user.id}});
        return "sukses reset";
    } else {
        return "gagal reset";
    }
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User tidak ditemukan';
    return user;
}

async function isTrueAdmin(userId) {
    const user = await db.User.findByPk(userId);
    return user.role === 'Admin';
}

function omitHash(user) { 
    const { passwordHash, ...userWithoutPasswordHash } = user;
    return userWithoutPasswordHash;
}