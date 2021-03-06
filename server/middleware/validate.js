const Joi = require('@hapi/joi');;

const registerAdminValidation=(data)=>{
    const schema ={
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),


    }
    return Joi.validate(data, schema);
}

const registerAuthorValidation=(data)=>{
    const schema ={
        fullName: Joi.string().min(2).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        image: Joi.string().min(4).required(),


    }
    return Joi.validate(data, schema);
}

const registerCategoryValidation=(data)=>{
    const schema ={
        category_name: Joi.string().min(2).required(),
        number_of_blogs: Joi.number().min(0).required(),
       
    }
    return Joi.validate(data, schema);
}

const registerTagValidation=(data)=>{
    const schema ={
        tag_name: Joi.string().min(2).required(),
       
       
    }
    return Joi.validate(data, schema);
}

const registerBlogValidation=(data)=>{
    const schema ={
        title: Joi.string().min(2).required(),
        description: Joi.string().min(2).required(),
        body: Joi.string().min(8).required(),
        image: Joi.string().min(4).required(),
        isPublished : Joi.boolean(),
        category_name:Joi.string(),
        author_names: Joi.array(),
        tag_names: Joi.array(),
        isFeatured : Joi.boolean(),


    }
    return Joi.validate(data, schema);
}

const loginAdminValidation=(data)=>{
    const schema ={
        email: Joi.string().min(6).required().email(),
        // password: Joi.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        password: Joi.string().min(6).required(),

    };

    return Joi.validate(data, schema);
}

module.exports = {registerAdminValidation, registerAuthorValidation, registerBlogValidation, registerCategoryValidation, loginAdminValidation, registerTagValidation};