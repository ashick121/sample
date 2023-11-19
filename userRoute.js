const express = require('express');
var router = express.Router()


var UserModel = require('./userModel');


//Insert data
router.get('/reg',async(req,res)=>{
    try{
        var { name,email,phone,password,address } = req.query;
        if(!name){
            return res.status(401).json({msg:'Please enter your Name'})
        }
        if(!email){
            return res.status(401).json({msg:'Please enter your Email'})
        }
        if(!phone){
            return res.status(401).json({msg:'Please enter your Phone Number'})
        }
        if(!password){
            return res.status(401).json({msg:'Please enter your Password'})
        }
        if(!address){
            return res.status(401).json({msg:'Please enter your Address'})
        }
        var user = new UserModel();
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.password = password;
        user.address = address;
        await user.save();
        res.status(200).json({
            status:true,
            msg:"User Registered Successfully",
            data:user
        })
        return;
    }catch (e) {
            console.log(e)
            res.status(500).json({
                status: false,
                msg: 'Something went wrong!'
            });
        }
})


router.get('/getDetails',async(req,res)=>{
    try{
       var data = await UserModel.find();
        res.status(200).json({
            status:true,
            msg:"User Registered Successfully",
            data:data
        })
        return;
    }catch (e) {
            console.log(e)
            res.status(500).json({
                status: false,
                msg: 'Something went wrong!'
            });
        }
})



const { validationResult } = require('express-validator');

router.get('/delete', async (req, res) => {
    try {
        var { email } = req.query;

        // Check if the email parameter is provided
        if (!email) {
            return res.status(400).json({
                status: false,
                msg: 'Email parameter is missing'
            });
        }

        var user = await UserModel.findOne({ email: email });

        // Check if the user with the specified email exists
        if (user) {
            await UserModel.deleteOne({ email: email });
            return res.status(200).json({
                status: true,
                msg: 'User deleted successfully'
            });
        } else {
            return res.status(404).json({
                status: false,
                msg: 'User not found',
                email: email
            });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            status: false,
            msg: 'Internal server error',
            error: e.message
        });
    }
});





router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.query;

        if (!email || !password) {
            return res.status(400).json({ msg: 'Please provide both email and password' });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ msg: 'Invalid credentials' });
        }

        // You should use a secure method to compare passwords, for example, bcrypt.compare
        if (user.password !== password) {
            return res.status(401).json({ msg: 'Invalid credentials' });
        }

        res.status(200).json({
            status: true,
            msg: 'Login successful',
            data: user,
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            status: false,
            msg: 'Something went wrong!',
        });
    }
});



router.post('/search', async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ msg: 'Please provide both email and password' });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ msg: 'Invalid credentials' });
        }

        // You should use a secure method to compare passwords, for example, bcrypt.compare
        // if (user.password !== password) {
        //     return res.status(401).json({ msg: 'Invalid credentials' });
        // }

        res.status(200).json({
            status: true,
            msg: 'Login successful',
            data: user,
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            status: false,
            msg: 'Something went wrong!',
        });
    }
});







//edit*///////////////////////////////////
router.get('/editDetails',async(req,res)=>{
    try{
        var { studentId,name,email,phone,password,address } = req.query;
        if(!studentId){
            return res.status(401).json({msg:'Invalid id'})
        }
        if(!name){
            return res.status(401).json({msg:'Please enter your Name'})
        }
        if(!email){
            return res.status(401).json({msg:'Please enter your Email'})
        }
        if(!phone){
            return res.status(401).json({msg:'Please enter your Phone Number'})
        }
        if(!address){
            return res.status(401).json({msg:'Please enter your Address'})
        }
        var user = await UserModel.findById(studentId)
        if(!user){
            return res.status(401).json({msg:'Invalid data'})
        }
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.address = address;
        await user.save();
        res.status(200).json({
            status:true,
            msg:"User edited Successfully",
            data:user
        })
        return;
    }catch (e) {
            console.log(e)
            res.status(500).json({
                status: false,
                msg: 'Something went wrong!'
            });
        }
})

router.get('/getDetailsById',async(req,res)=>{
    try{
        var { id } = req.query;
        if(!id){
            return res.status(401).json({msg:'Invalid Id'})
        }
        var data = await UserModel.findById(id)
        if(!data){
            return res.status(401).json({msg:'Invalid data'})
        }
        res.status(200).json({
            status:true,
            msg:"User Registered Successfully",
            data:data
        })
        return;
    }catch (e) {
            console.log(e)
            res.status(500).json({
                status: false,
                msg: 'Something went wrong!'
            });
        }
})





module.exports = router;