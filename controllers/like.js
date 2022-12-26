const Sauce = require('../models/Sauce');

exports.likeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
    .then((sauce)=> {
        console.log('contenu', sauce);
        // si le userliked est False et si like === 1 
        switch(req.body.like){
        
            case 1 :
            //like = 1 (likes =+ 1)
                if(!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1){
                    console.log("les instructions seront éxécutés")
                    //mise a jour de la base de données 
                    Sauce.updateOne({_id: req.params.id},
                        {
                            $inc: {likes: 1},
                            $push: {usersLiked: req.body.userId}
                        }
                        )
                        .then(() => res.status(201).json({message: "Sauce liked +1"}))
                        .catch((error) => res.status(400).json({ error}));
                    };
            break;
            
            case -1:        
            //like =-1 (dislikes =+ 1)
                if(!sauce.usersDisliked.includes(req.body.userId) && req.body.like === -1){
                console.log("les instructions seront éxécutés")
                //mise a jour de la base de données 
                Sauce.updateOne({_id: req.params.id},
                    {
                        $inc: {dislikes: 1},
                        $push: {usersDisliked: req.body.userId}
                    }
                    )
                .then(() => res.status(201).json({message: "Sauce disliked -1"}))
                .catch((error) => res.status(400).json({ error}));
                };
            break;
                
            case 0:
                //like = 0 (likes neutre, pas de vote)
                if(sauce.usersLiked.includes(req.body.userId) && req.body.like === 0){
                        //mise a jour de la base de données 
                    Sauce.updateOne({_id: req.params.id},
                        {
                            $inc: {likes: -1},
                            $pull: {usersLiked: req.body.userId}
                        }
                        )
                        .then(() => res.status(201).json({message: "Sauce no likes 0"}))
                        .catch((error) => res.status(400).json({ error}));
                    };
                    
                    //après un like = -1 on met un like = 0 (likes neutre, pas de vote, on enleve le dislike)
                if(sauce.usersDisliked.includes(req.body.userId) && req.body.like === 0){
                        //mise a jour de la base de données 
                    Sauce.updateOne({_id: req.params.id},
                        {
                            $inc: {dislikes: -1},
                            $pull: {usersDisliked: req.body.userId}
                        }
                        )
                        .then(() => res.status(201).json({message: "Sauce no dislikes 0"}))
                        .catch((error) => res.status(400).json({ error}));
                    };         
            break;
            }
    })
    .catch((error) => res.status(404).json({ error }))
};