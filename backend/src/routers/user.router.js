import { Router } from 'express';
import { sample_users } from '../data.js';
import jwt from 'jsonwebtoken';
import { BAD_REQUEST } from '../constants/httpStatus.js';
import handler from 'express-async-handler';
import { UserModel } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import auth from '../middleware/auth.mid.js';
import admin from '../middleware/admin.mid.js';

const PASSWORD_HASH_SALT_ROUNDS = 10;

const router = Router();

router.post('/login', handler(async (req, res) => {
    const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.send(generateTokenResponse(user));
        return;
    }

    res.status(BAD_REQUEST).send('Username or password is invalid');
    })
);

router.post(
    '/register',
    handler(async (req, res) => {
        const { name, email, password } = req.body;
        
        const user = await UserModel.findOne({ email });

        if (user) {
            res.status(BAD_REQUEST).send('User already exists. Please login instead!');
            return;
        }

        const hashedPassword = await bcrypt.hash(
            password,
            PASSWORD_HASH_SALT_ROUNDS,
        );

        const newUser = {
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
        };

        const result = await UserModel.create(newUser);
        res.send(generateTokenResponse(result));
    })
);

router.put('/updateProfile', auth, handler(async (req, res) => {
    const { name } = req.body;
    const user = await UserModel.findByIdAndUpdate(
        req.user.id,
        { name },
        { new: true },
    );

    res.send(generateTokenResponse(user));

    })
);

router.put('/changePassword', auth, handler(async (req, res) => {
    
    const { currentPassword, newPassword } = req.body;
    const user = await UserModel.findById(req.user.id);

    if (!user) {
        res.status(BAD_REQUEST).send('Password change has failed');
        return;
    }

    const equal = await bcrypt.compare(currentPassword, user.password);

    if (!equal) {
        res.status(BAD_REQUEST).send('Current password is incorrect');
        return;
    }

    user.password = await bcrypt.hash(newPassword, PASSWORD_HASH_SALT_ROUNDS);
    await user.save();

    res.send();

    })
);

router.get('/getAll/:searchTerm?', admin, handler(async (req, res) => {

    const { searchTerm } = req.params;

    const filter = searchTerm 
    ? { name: { $regex: new RegExp(searchTerm, 'i') } }
    : {};

    const users = await UserModel.find(filter, { password: 0 });
    res.send(users);

    })
);

router.put('/toggleBlock/:userId', admin, handler(async (req, res) => {

    const { userId } = req.params;
    
    if(userId === req.user.id) {
        res.status(BAD_REQUEST).send("Error: You cannot block yourself.");
        return;
    }

    const user = await UserModel.findById(userId);
    user.isBlocked = !user.isBlocked;
    user.save();

    res.send(user.isBlocked);

    })
);

router.get('/getById/:userId', admin, handler(async (req, res) => {

    const { userId } = req.params;
    const user = await UserModel.findById(userId, { password: 0 });
    res.send(user);

    })
);

router.put('/update/', admin, handler(async (req, res) => {

    const { id, name, email, isAdmin } = req.body;
    await UserModel.findByIdAndUpdate(id, { 
        name,
        email,
        isAdmin,
    });
    res.send();

    })
);

const generateTokenResponse = user => {

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,  
        },
        process.env.JWT_SECRET, 
        {
            expiresIn: '30d',
        },
    );

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
        token,
    };
};


export default router;
