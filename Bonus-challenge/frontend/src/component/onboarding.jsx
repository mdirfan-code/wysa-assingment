import React,{useState,useEffect}  from "react";

import axios from 'axios';
import  config  from "../axios.config";
import convertTo12HourFormat from "../Helpers/util.help";

const {baseURL} = config();

const Card1 = ({setCurrentCard}) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        setCurrentCard(2);
      };

    return (
        <div className="card">
            <h2>Hey! I'm wysa</h2>
            <h4>I'm here to help you sleep better</h4>
            <button type="submit" onClick={handleSubmit}>Next</button>
        </div>
    )

}

const Card2 = ({setCurrentCard,requestParam,setRequestParam}) => {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [nicknameAvailable,setNicknameAvailable] = useState(false);
    const [submitStatus,setSubmitStatus] = useState(false);

    const handleNicknameChange = (event) => {
      setNickname(event.target.value);

      axios.get( baseURL+"/api/signup/available_nickname/" + event.target.value)
      .then(
            (response) =>
            {
                setNicknameAvailable(response.data.data.available)
            }
      )
      .catch(
            (error) => {
                console.log(error);
            }
      )

      if(event.target.value.length > 0 && password.length > 0)
      {
        setSubmitStatus(true);
      }
      else
      {
        setSubmitStatus(false);
      }
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
      if(event.target.value.length > 0 && nickname.length > 0)
      {
        setSubmitStatus(true);
      }
      else
      {
        setSubmitStatus(false);
      }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const newReq = {...requestParam};
      newReq.nickname = nickname;
      newReq.password = password;
      setRequestParam(newReq);
      setCurrentCard(3);
      
    };
    return (
        <div className="card">
            <h2>Hey! I'm wysa</h2>
            Choose Nickname and password
            <div>
                <label htmlFor="username">nickname:</label>
                <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={handleNicknameChange}
                />
                {nickname.length > 0 && (nicknameAvailable ? <h5 className="nickname available">Available</h5> : <h5 className="nickname notAvailable">Not available</h5>) }
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                />
            </div>
            {submitStatus && <button type="submit" onClick={handleSubmit}>Next</button>}

        </div>
    )

}

const Card3 = ({setCurrentCard}) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        setCurrentCard(4);
      };

    return (
        <div className="card">
            <h2>Let's start by calculating your sleep efficiency and examining you concerns.</h2>
            <h2>Over time, we will work together to improve these.</h2>
            <button type="submit" onClick={handleSubmit}>Next</button>
        </div>
    )

}

const Card4 = ({setCurrentCard, requestParam, setRequestParam}) => {

    const [sleep_easily, setSleep_easily] = useState(false);
    const [sleep_through_night, setSleep_through_night] = useState(false);
    const [wakeup_ontime_refreshed, setWakeup_ontime_refreshed] = useState(false);

    const handlesleep_easilyChange = () => {
      setSleep_easily(!sleep_easily);
    };
  
    const handlesleep_through_nightChange = () => {
      setSleep_through_night(!sleep_through_night);
      
    };
  
    const handlewakeup_ontime_refreshedChange = () => {
      setWakeup_ontime_refreshed(!wakeup_ontime_refreshed);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newReq = {...requestParam};
        newReq.well_sleep_changes.sleep_easily = sleep_easily;
        newReq.well_sleep_changes.sleep_through_night = sleep_through_night;
        newReq.well_sleep_changes.wakeup_ontime_refreshed = wakeup_ontime_refreshed;
        setRequestParam(newReq);
        setCurrentCard(5);
      };

    return (
        <div className="card">
            <h2>Let's say in a few weeks, you're sleeping well. What would change?</h2>
            <h4>Select all the changes you would like to see</h4>
            <div>
                <label>
                I would go to sleep easily:
                <input
                    type="checkbox"
                    checked={sleep_easily}
                    onChange={handlesleep_easilyChange}
                />
                </label>
            </div>
            <div>
                <label>
                I would sleep through the night:
                <input
                    type="checkbox"
                    checked={sleep_through_night}
                    onChange={handlesleep_through_nightChange}
                />
                </label>
            </div>
            <div>
                <label>
                I'd wake up on time, refreshed:
                <input
                    type="checkbox"
                    checked={wakeup_ontime_refreshed}
                    onChange={handlewakeup_ontime_refreshedChange}
                />
                </label>
            </div>
            {(sleep_easily || sleep_through_night || wakeup_ontime_refreshed) && <button type="submit" onClick={handleSubmit}>Next</button>}
        </div>
    )

}

const Card5 = ({setCurrentCard,requestParam,setRequestParam}) => {


    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
  

    const handleSubmit = (event) => {
        event.preventDefault();
        const newReq = {...requestParam};
        newReq.struggling_with_sleep_since = selectedOption;
        setRequestParam(newReq);
        setCurrentCard(6);
      };

    return (
        <div className="card">
            <h2>That's a great goal. How long have you been struggling with your sleep?</h2>
            <div>
                <label>
                Less than 2 weeks:
                <input
                    type="radio"
                    name="radioOptions"
                    value="<2"
                    checked={selectedOption === '<2'}
                    onChange={handleOptionChange}
                />
                </label>
            </div>
            <div>
                <label>
                2 to 8 weeks:
                <input
                    type="radio"
                    name="radioOptions"
                    value="2-8"
                    checked={selectedOption === '2-8'}
                    onChange={handleOptionChange}
                />
                </label>
            </div>
            <div>
                <label>
                More than 8 weeks:
                <input
                    type="radio"
                    name="radioOptions"
                    value=">8"
                    checked={selectedOption === '>8'}
                    onChange={handleOptionChange}
                />
                </label>
            </div>
            {selectedOption != '' && <button type="submit" onClick={handleSubmit}>Next</button>}
        </div>
    )

}

const Card6 = ({setCurrentCard, requestParam, setRequestParam}) => {
    const [selectedTime, setSelectedTime] = useState('');

    const handleTimeChange = (event) => {
      setSelectedTime(event.target.value);

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newReq = {...requestParam};
        newReq.bed_time = convertTo12HourFormat(selectedTime);
        setRequestParam(newReq);
        setCurrentCard(7);
      };

    return (
        <div className="card">
            <h2>What time do you go to bed for sleep?</h2>
            <div>
                <label htmlFor="timeInput1">Select a Time:</label>
                <input
                type="time"
                id="timeInput1"
                value={selectedTime}
                onChange={handleTimeChange}
                />
            </div>
            <button type="submit" onClick={handleSubmit}>Next</button>
        </div>
    )

}


const Card7 = ({setCurrentCard, requestParam, setRequestParam}) => {
    const [selectedTime2, setSelectedTime2] = useState('');

    const handleTimeChange = (event) => {
      setSelectedTime2(event.target.value);

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newReq = {...requestParam};
        newReq.wakeup_time = convertTo12HourFormat(selectedTime2);
        setRequestParam(newReq);
        setCurrentCard(8);
      };

    return (
        <div className="card">
            <h2>wake up time</h2>
            <div>
                <label htmlFor="timeInput2">Select a Time:</label>
                <input
                type="time"
                id="timeInput2"
                value={selectedTime2}
                onChange={handleTimeChange}
                />
            </div>
            <button type="submit" onClick={handleSubmit}>Next</button>
        </div>
    )

}

const Card8 = ({setCurrentCard, requestParam, setSleepEfficiency}) => {
    const [selectedHours, setSelectedHours] = useState('');

    const handleHoursChange = (event) => {
      setSelectedHours(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newReq = {...requestParam};
        newReq.sleeping_hours = parseInt(selectedHours);
        console.log(newReq)
        axios.post(baseURL+"/api/signup/user_sleep_data" ,{...newReq})
        .then(
            (response) =>
            {
                console.log(response)
                if(response.data.success)
                {
                    setSleepEfficiency(response.data.data.sleep_efficiency)
                    setCurrentCard(9)
                }
                else {
                    let message = response.data.message + "\n------\n";
                    if(response.data.message === 'Validation Error')
                    {
                        if(response.data.data.missingParams.length > 0)
                        {
                            message += "\nMissing Params:\n"
                            for (let i in response.data.data.missingParams ) {
                                message+= response.data.data.missingParams[i]+"\n";
                            }
                        }
                        if(response.data.data.validationErrors.length > 0)
                        {
                            message += "\nValidation Error:"
                            for (let i in response.data.data.validationErrors)
                            {
                                message+= "\n" + response.data.data.validationErrors[i];
                            }
                        }
                    }
                    alert(message);
                    setCurrentCard(2);
                }
            }
        )
        .catch(
            (error) =>
            {
                alert(error);
                setCurrentCard(1);
            }
        )
      };

    return (
        <div className="card">
            <h2>Ok. How many hours sleep do you get in a typical night?</h2>
            <div>
                <select
                id="integer"
                value={selectedHours}
                onChange={handleHoursChange}
                >
                    <option value="">-- Select Hours --</option>
                    {[...Array(10)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                        {index + 1}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" onClick={handleSubmit}>Next</button>
        </div>
    )

}

const Card9 = ({setCurrentCard, sleepEfficiency}) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        setCurrentCard(10);
      };

    return (
        <div className="card">
            <h2>Your account gets created successfully.</h2>
            <h2>You seem to have a sleep efficiency of {sleepEfficiency}%. We'll get this up to 100%.</h2>
            <h2>A Higher sleep efficiency score means a more refreshing and energizing sleep, which can help you move into your day with a sense of lightness and ease.</h2>
            <button type="submit" onClick={handleSubmit}>Next</button>
        </div>
    )

}
const Card10 = () => {


    return (
        <div className="card">
            <h2>Welcome to Wysa Website!!!</h2>
        </div>
    )

}

const mainCard = () => {
    
    const [requestParam,setRequestParam] = useState({
        "nickname" : "",
        "password" : "",
        "well_sleep_changes" : {
            "sleep_easily":false,
            "sleep_through_night":false,
            "wakeup_ontime_refreshed":false
        },
        "struggling_with_sleep_since" : "",
        "bed_time" : "",
        "wakeup_time" : "",
        "sleeping_hours" : 0
    })
    const [currentCard,setCurrentCard] = useState(1);
    const [sleepEfficiency, setSleepEfficiency] = useState(0);

    return (
        <>
        {currentCard == 1 && <Card1 setCurrentCard={(val)=>{setCurrentCard(val)}} />}
        {currentCard == 2 && <Card2 setCurrentCard={(val)=>{setCurrentCard(val)}} requestParam={requestParam} setRequestParam={(val)=>{setRequestParam(val)}}/>}
        {currentCard == 3 && <Card3 setCurrentCard={(val)=>{setCurrentCard(val)}} />}
        {currentCard == 4 && <Card4 setCurrentCard={(val)=>{setCurrentCard(val)}} requestParam={requestParam} setRequestParam={(val)=>{setRequestParam(val)}}/>}
        {currentCard == 5 && <Card5 setCurrentCard={(val)=>{setCurrentCard(val)}} requestParam= {requestParam} setRequestParam={(val)=>{setRequestParam(val)}}/>}
        {currentCard == 6 && <Card6 setCurrentCard={(val)=>{setCurrentCard(val)}} requestParam= {requestParam} setRequestParam={(val)=>{setRequestParam(val)}}/>}
        {currentCard == 7 && <Card7 setCurrentCard={(val)=>{setCurrentCard(val)}} requestParam= {requestParam} setRequestParam={(val)=>{setRequestParam(val)}}/>}
        {currentCard == 8 && <Card8 setCurrentCard={(val)=>{setCurrentCard(val)}} requestParam= {requestParam} setSleepEfficiency={(val)=>{setSleepEfficiency(val)}}/>}
        {currentCard == 9 && <Card9 setCurrentCard={(val)=>{setCurrentCard(val)}} sleepEfficiency={sleepEfficiency}/>}
        {currentCard == 10 && <Card10 />}
        </>
    )
}

export default mainCard;
