import validator from 'validator';

// Validate the profile inputs

const profileInputValidator = body => {

    let err = false;
    const errMsg = {}
    const profile = {}
    
    if (validator.isEmpty(body.firstName)){
        errMsg.firstName =  'First name is required!'
        err = true;
    } else {
        profile.firstName = body.firstName
    }

    if (validator.isEmpty(body.lastName)){
        errMsg.lastName = 'Last name is required!'
        err = true;
    } else {
        profile.lastName = body.lastName
    }

    if (validator.isEmpty(body.email)){
        errMsg.email = 'Email is required!'
        err = true;
    } else if (!validator.isEmail(body.email)){
        errMsg.email = 'Enter a valid Email address'
        err = true;
    } else {
        profile.email = body.email
    }

    if (validator.isEmpty(body.gender)){
        profile.gender = ''
    } else {
        profile.gender = body.gender
    }

    if (validator.isDate(body.birthDate)){
        profile.birthDate = body.birthDate
    } else {
        profile.birthDate = ''
        errMsg.birthDate = 'BirthDate either not given or format is wrong!'
    }

    if (validator.isMobilePhone(body.phone, 'en-CA')){
        profile.phone = body.phone
    } else {
        profile.phone = ''
        errMsg.phone = 'Phone number either not given or format is wrong!'
    }

    if (validator.isEmpty(body.address)){
        profile.address = ''
    } else {
        profile.address = body.address
    }

    if (validator.isEmpty(body.description)){
        profile.description = ''
    } else {
        profile.description = body.address
    }

    if (validator.isBoolean(body.available)){
        profile.available = body.available
    } else {
        profile.available = ''
    }
    
    return {err, errMsg, profile};
}

export default profileInputValidator;