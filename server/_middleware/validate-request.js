module.exports = validateRequest;

function validateRequest(req, next, schema) { 
    const options = {
        abortEarly: false, //include semua err
        allowUnknown: true, //ignore unk prop
        stripUnknown: true //remove unk prop
    };

    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next(`Validasi error: ${error.details.map(x => x.message).join(', ')}`);
    } else { 
        req.body = value;
        next();
    }
}