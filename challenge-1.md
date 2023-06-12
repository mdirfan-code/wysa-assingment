# REST API Interection Flow and DataBase Schema

### Database Schema
For this particular task I am selecting NoSQL DB MongoDB. NoSQL database in beneficial for analytic purposes due to flexible data models which provides the benefits of storing diverse data and evolving data structure without predefined rigid schemas. 

Scalibility is also a big reason behind this choice as Wysa is thinking of scaling system from 5 million users to 50 million users. This means if it's needed to scale up storage in future it, one can easily scale horizontally i.e. it would be easy to create distributed server which we can also use for availing ETL support using technology like Hadoop, AWS Redshift Spectrum. 

That's why I think, NoSQL Database is quite efficient for particular task.

Moving towards modeling data I think for particular task we can have various models but here I have most efficient data model.

```
--------------------Document-1---------------------------------
user_data = 
{
    "Nickname" : String
                 Unique
                 allowed chars(A-Za-z0-9_),
    "Password" : String
                 min-length
    "sleep_data_id" : reference to respective users sleep data,

}

--------------------Document-2---------------------------------
sleep_data =
{
    "_id":ObjectId,
    "Well_sleep_changes" : Json Object(
        {
            "sleep_easily" : Boolean,
            "sleep_through_night" : Boolean,
            "wakeup_ontime_refreshed" : Boolean
        }
    ),

    "struggling_since" : String
                         allowed values("<2","2-8",">8"),

    "bed_time" : Datetime,

    "wakeup_time" : Datetime,
    
    "sleep_hours" : Integer
                    Range(1-10) 
    "sleep_efficiency" : Integer
}

```

Right now as I found, currently if application gets close or crashed during onboarding, whole onboarding process trigger from start i.e. wysa application don't save states. But for this short process it's best because saving states would adds unnecessary complexity to model which is inefficient for analytics task. 

`Password` field is not available in current application so we can skip that.

### REST API Flow

We are going to use two APIs 
* available_nickname - GET
* user_sleep_data - POST

Before explaining APIs Interection, let me brief why I selected single API for sending user sleep data, it's because if we will create API for each data, it would become computationally expensive and may hinder user expirience in high traffic (it will ease wysa to scale up from 5 million users to 50 million users) hours.

Also, I want `available_nickname` API as a part of our system because in case where system validate nickname after whole onboarding process and found duplicate nickname whole effort of user will get waste. Again, bad user expirience. It will reduce multiple request from single user in the similar case, which will save our resources. 

#### available_nickname
* Function : This API we will use to validate the enter nickname is unique among other nicknames present in database.
* End point : `/signup/available_nickname/:<entered_nickname>`
* request body:  None
* Parameter: `entered_nickname` 
* Response: API will return `True` if entered nickname is already present in the database and `False` if it's unique.
* security measures : 
    - We will verify requested parameters our in proper format and have required datatype.
    - We will check whether given parameters contains any aggregation function which may cause SQL Injection or not. If yes we sanitize it. 

![API.available_nickname.Interaction (1).jpg](<attachment:API.available_nickname.Interaction (1).jpg>)


#### user_sleep_data
* Functions : This API first validate the constraints and format, then it would pass data into any function and API responsible for analysing sleep efficiency. After getting an efficiency value, it would create sleep_data document and then it would create user_data document with reference to sleep_data document's objectId. and the API will respone with sleep efficiency percentage. 
* End point : `/signup/user_sleep_data`
* request body: 
    ``` 
        {
            "Nickname":String,
            "Password":String,
            "Well_sleep_changes" : Json Object(
                {
                    "sleep_easily" : Boolean,
                    "sleep_through_night" : Boolean,
                    "wakeup_ontime_refreshed" : Boolean
                }
            ),
            "struggling_since" : String
            "bed_time" : Datetime,
            "wakeup_time" : Datetime,
            "sleep_hours" : Integer
        }
    ```
* Parameters:
    - Nickname
    - Password
    - well_sleep_changes
    - struggling_since
    - bed_time
    - wakeup_time
    - sleep_hours
* Responds: API will return the calculated sleep efficiency percentage.
* security measures : 
    - We will verify requested parameters our in proper format and have required datatype.
    - We will check whether given parameters contains any aggregation function which may cause SQL Injection or not. If yes we sanitize it. 

![API.user_sleep_data.Interaction (1).jpg](<attachment:API.user_sleep_data.Interaction (1).jpg>)
