module.exports = function(roles) {
    return async function(req, res, next) {
        let user = req.user;
        let isPermitted = false;
        roles.map((role) => {
            if(user.roles.includes(role)) isPermitted = true;
        });

        if(!isPermitted)
            return res.status(403).send({message: "Permission Denied"})
        return next();
    };
};