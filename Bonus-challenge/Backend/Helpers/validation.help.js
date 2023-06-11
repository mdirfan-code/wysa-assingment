const { response } = require("express");

const user_data = require('../Models/user_data.model');

module.exports = {
    validateOnboardingData : async (request,response,next) =>
    {
        try
        {
            let missingParams = [];
            let validationErrors = [];
    
            // Validating nickname
            if(request.body.hasOwnProperty("nickname"))
            {
                if(request.body.nickname.length < 3){
                    validationErrors.push("Parameter 'nickname' has character lenght less than 3")
                } 

                await user_data.findOne(
                    {nickname: request.body.nickname}
                )
                .then(
                    async (user_data_document) =>
                    {
                        if(user_data_document){
                            validationErrors.push("Entered nickname already exist.")
                        }
                    }
                )
                .catch(
                    (error) =>
                        {
                            response.status(500).json(
                                {
                                    success:0,
                                    message:"Error occured!",
                                    data:{
                                        error
                                    }
        
                                }
                            );
                        }
                ) 
            }
            else{
                missingParams.push('nickname')
            }
    
            // validating password
            if(request.body.hasOwnProperty("password"))
            {
                let passPattern = /^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^!#%@_ ]*[!#%@_ ])[A-Za-z0-9!#@%_ ]{8,32}$/;
                if( !passPattern.test(request.body.password) ){
                    let errorMessage = "Entered password is not satisfying password guidelines which are:"
                    errorMessage += "\n\t- Password length should be equal or greater than 8."
                    errorMessage += "\n\t- Must Include lowercase letters and uppercase letters."
                    errorMessage += "\n\t- Must Include digit."
                    errorMessage += "\n\t- Must Include special character (!#%@_)"

                    validationErrors.push()
                } 
            }
            else{
                missingParams.push('password')
            }
    
            // validating well sleep changes
            if(request.body.hasOwnProperty("well_sleep_changes"))
            {
                let well_sleep_prop = ["sleep_easily","sleep_through_night","wakeup_ontime_refreshed"];
                let flag1 = true;
                let flag2 = false;
                for (let prop in well_sleep_prop)
                {
                    if(! request.body.well_sleep_changes.hasOwnProperty(well_sleep_prop[prop]) ){
                        missingParams.push(prop + " <- well_sleep_changes");
                        flag1 = false;
                    } 
                    else{
                        flag2 = flag2 || request.body.well_sleep_changes[well_sleep_prop[prop]] ;
                    }
                }
                
                if(flag1 && !flag2)
                {
                    validationErrors.push("JSON object 'Well_sleep_changes' should contain atleast one true parameter.")
                }
            }
            else{
                missingParams.push('well_sleep_changes')
            }
    
            // validating struggling_with_sleep_since
            if(request.body.hasOwnProperty("struggling_with_sleep_since"))
            {
                let validValues = {"<2":1,"2-8":1,">8":1}
                if( !(request.body.struggling_with_sleep_since in validValues) ){
                    validationErrors.push("Invalid value given for 'struggling_with_sleep_since' parameter")
                } 
            }
            else{
                missingParams.push('struggling_with_sleep_since');
            }
    
            // validating bed time
            if(request.body.hasOwnProperty("bed_time"))
            {
                let timePattern = /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/;
                if(! timePattern.test(request.body.bed_time) ){
                    validationErrors.push("Invalid time format given for parameter 'bed_time'.");
                } 
            }
            else{
                missingParams.push('bed_time');
            }
    
            // validating wakeup time
            if(request.body.hasOwnProperty("wakeup_time"))
            {
                let timePattern = /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/;
                if(! timePattern.test(request.body.wakeup_time) ){
                    validationErrors.push("Invalid time format given for parameter 'wakeup_time'.");
                } 
            }
            else{
                missingParams.push('wakeup_time');
            }
    
            // validating sleeping hours
            if(request.body.hasOwnProperty("sleeping_hours"))
            {
                if(! (request.body.sleeping_hours >= 1 &&  request.body.sleeping_hours <= 10)){
                    validationErrors.push("'sleeping_hours' parameter is out of range(1-10).");
                } 
            }
            else{
                missingParams.push('sleeping_hours');
            }
    
            if(missingParams.length === 0 && validationErrors.length === 0)
            {
                next();
            }
            else{
                response.status(200).json({
                    success:0,
                    message:"Validation Error",
                    data: {
                        missingParams,
                        validationErrors
                    }
                });
            }
            
        }
        catch (error)
        {
            response.status(500).json({
                success:0,
                error
            });
        }

    }
}