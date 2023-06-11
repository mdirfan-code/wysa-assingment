const router = require('express').Router();
require('dotenv').config();

const user_data = require('../Models/user_data.model');
const sleep_data = require('../Models/sleep_data.model');

const {calculateSleepEfficiency} = require('../Helpers/sleep_analysis.help')
const {validateOnboardingData} = require('../Helpers/validation.help');


router.route('/available_nickname/:entered_nickname').get(async (request, response) =>
    {

        await user_data.findOne(
            {nickname: request.params.entered_nickname}
        )
        .then(
            async (user_data_document) =>
            {
                if(user_data_document){
                    response.status(200).json(
                        {
                            success:1,
                            data:{
                                available:false
                            }
                        }
                    )
                }
                else{
                    response.status(200).json(
                        {
                            success:1,
                            data:{
                                available:true
                            }
                        }
                    )
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
)

router.route('/user_sleep_data').post(validateOnboardingData, async (request, response) =>
    {
        // Calculating the efficiency of sleep
        // the used function is dummy function hardcoded
        const sleep_efficiency = calculateSleepEfficiency(request.body.sleeping_hours);

        let sleep_data_obj = new sleep_data({
            "well_sleep_changes":request.body.well_sleep_changes,
            "struggling_with_sleep_since":request.body.struggling_with_sleep_since,
            "bed_time":request.body.bed_time,
            "wakeup_time":request.body.wakeup_time,
            "sleeping_hours":request.body.sleeping_hours,
            "sleep_efficiency":sleep_efficiency
        })

        await sleep_data_obj.save()
        .then(async (sleep_data_document) => 
            {
                
                let user_data_obj = new user_data(
                    {
                        "nickname":request.body.nickname,
                        "password":request.body.password,
                        "sleep_data_id":sleep_data_document._id
                    }
                )

                await user_data_obj.save()
                .then(async (user_data_document) =>
                    {
                        response.status(200).json(
                            {
                                success:1,
                                message:"Onboarding Successfull.",
                                data:{
                                    sleep_efficiency
                                }
                            }
                        )
                    }
                )
                .catch(
                    (error) =>
                        {
                            response.status(500).json(
                                {
                                    success:0,
                                    message:"Onboarding Failed!",
                                    data:{
                                        error
                                    }

                                }
                            );
                        }
                )
            }
        )
        .catch(
            (error) =>
                {
                    response.status(500).json(
                        {
                            success:0,
                            message:"Onboarding Failed!",
                            data:{
                                error
                            }

                        }
                    );
                }
        ) 

    }
)

module.exports = router;