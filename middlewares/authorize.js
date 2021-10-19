const authorize = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authorize based on user role
        (req, res, next) => {
            if (!res.locals.role) {
                next();
            } else {
                var found = false;
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i] === res.locals.role) {
                        found = true;
                    }
                }


                if (roles.length && !found) {
                    // user's role is not authorized
                    return res.status(401).json({ message: 'Unauthorized' });
                }

                // authentication and authorization successful
                next();
            }
        }
    ];
};

module.exports = authorize;