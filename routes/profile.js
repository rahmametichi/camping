const router = require("express").Router();
const Profile = require ("../models/Profile");
const {verifyToken} = require("../middlewares/verifyToken");
const User = require ("../models/User");

router.get("/me",  verifyToken,async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["fullName", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "there is no profile for this user" });
    }
  } catch (err) {
    console.log("errooooooooooor");
    res.status(500).send("server error");
  }
});
router.post('/create',[auth,[
        check('status','Status is required')
         .not()
        .isEmpty()
            ]
                    ],
        async (req,res) => {
        const errors = validationResult(req);
             if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
                                                            }
            const {
                        age,
                        contactNumber,
                        bio,
                        Address,
                        follows,
                        pays,
                        tags,
                        facebook,
                        instagram,
                    } = req.body;

            // bulid profile object
            const profileFields ={};
            profileFields.user = req.user.id;
            if (age) profileFields.age = age;
            if (contactNumber) profileFields. contactNumber =  contactNumber;
            if (bio) profileFields.bio = bio;
            if (Address) profileFields.Address = Address;
            if (follows) profileFields.follows = follows;
            if (pays) profileFields.  pays =   pays;
            if (tags) profileFields.  tags =   tags;
            // bulid social object
            profileFields.social = {};
            if (facebook) profileFields.facebook = facebook;
            if (instagram) profileFields.instagram = instagram;
 try{
     let profile = await Profile.findOne({ user : req.user.id});
     if (profile){
         //update
         profile = await Profile.findOneAndUpdate (
             { user : req.user.id},
             {$set : profileFields},
             {new : true}
          
         );
         return  res.json(profile);
     }
     // create
     profile = new Profile(profileFields);
     await profile.save();
     res.json(profile);


    }
    catch(err)
    {console.log(err.message);
    res.status(500).send('server Error');}
        }
   
    )
    // @router router api/profile
//@desc get all profiles
router.get('/allprofile', async(req, res)=> {
    try{
       
        const profiles = await Profile.find().populate('user',['fullName','avatar'])
    res.json(profiles);
    }catch (err){
        console.error(err.message);
        res.status(500).send('server error');

    }
})
        
    
// @router Get profile/user/:user_id
// @desc get profile by user ID
router.get('/user/:user_id', async (req,res) => {
    try{
        const profile = await Profile.findOne().populate('user',['fullName','avatar']);
        if (!profile)
        return res.status(400).json ({msg :'there is no profile for this user'});
        res.json(profiles);

    }catch (err){
        console.log(err.message);
        if(err.kind == 'objectID'){
            return res.status(400).json({ msg:'Profile not found '});
        }
        res.status(500).send('server Error');

    }
});
// @route delete profile
// @desc delete profile , user, posts
router.delete('/', async (req,res) =>{
    try {
        // @todo = remove users posts
        //Remove profile
      await Profile.findOneAndRemove({ user: req.user.id });
        // remove users
        await User.findByIdAndRemove({_id: req.user.id});
      res.json({msg:'user deleted'});
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
})




module.exports = router;