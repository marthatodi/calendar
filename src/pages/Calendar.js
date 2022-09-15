import React,{useState,useEffect} from 'react';
import "./calendarStyle.css";
import { Box,
  Button,
  Heading,
  Text} from 'rebass';

  import { Input,
    Select,
    Label,Textarea} from '@rebass/forms';
  

function Calendar(props) {
  // your calendar implementation Goes here!
  // Be creative
  const days =['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] ;
  //const time = ['00:00','01:00'] for select time
  const [reminder, setReminder] = useState({'28-Sunday':[{time:'00:00', day:'28-Sunday',city:'Athens',reminder:'GoToMAS'}]});
  const [openReminder, setOpenReminder] = useState(false);
  const [thisopenReminder, setthisopenReminder] = useState('28-Sunday');
  useEffect(() => {
    localStorage.setItem('reminder', JSON.stringify(reminder));
  }, [reminder]);
// const items = JSON.parse(localStorage.getItem('items'));
  let getDaysArray = (year, month) =>{
    var monthIndex = month - 1; // 0..11 instead of 1..12
    var names = days;
    var date = new Date(year, monthIndex, 1);
    var result = [];
    while (date.getMonth() == monthIndex) {
      result.push(date.getDate() + '-' + names[date.getDay()]);
      date.setDate(date.getDate() + 1);
    }
    return result;
  }
  const handleReminderChange = (event,index) => {
    console.log(reminder);
    let editReminder={...reminder};
    editReminder[thisopenReminder][index]={ ...editReminder[thisopenReminder][index],[event.target.id]:event.target.value}
    setReminder(editReminder)
    console.log(reminder);

  }

  const addNewReminder = () =>{
    let newReminder={...reminder};
    if(newReminder[thisopenReminder] === undefined){
      newReminder={...newReminder,[thisopenReminder]:[{time:'',city:'',reminder:''}]};
    }else{
      newReminder[thisopenReminder].push({time:'',city:'',reminder:''});
    }
    setReminder(newReminder); 
 
  }
  let daysofMonth = getDaysArray(2022,9);
  let daysofPastMonth = getDaysArray(2022,8);
  let daysofNextMonth = getDaysArray(2022,10);
let firstDay;
let nextDaysMonth=0;
  return (
    <div className="container">
      
        <h1>Calendar</h1> 
        <h3>September</h3> 
        <div style={{display: 'flex',height: '100%'}}>
          {days.map((day,placement)=>{
            let thisweekdays=daysofMonth.filter((d,ind)=>d.split('-')[1]===day)
            if(parseInt(thisweekdays[0].split('-')[0])===1){
              firstDay=placement;
            }
            if(firstDay===undefined){
              thisweekdays= [daysofPastMonth[daysofPastMonth.findLastIndex((t) => (t.split('-')[1]===day))],...thisweekdays]
            //  pastDaysMonth--;
            }else if(placement>firstDay && thisweekdays.length<5){
              thisweekdays= [...thisweekdays,daysofNextMonth[nextDaysMonth]]
              nextDaysMonth++;
            }
        
            return (
              <div className='header'>
            <div className='header-titles'>
            {day}
            </div>
            { thisweekdays.map((week,w)=>{
            return (
            <div className='buttonDays'
             style={{
              color:week.split('-')[1]==='Sunday' || week.split('-')[1]==='Saturday'?'blue':'black',
              backgroundColor:week.split('-')[1]==='Sunday' || week.split('-')[1]==='Saturday'?'lightgrey':'white'
             }}
             onClick={() => {
              setOpenReminder(true)
              setthisopenReminder(week)
            }}
            >
             <div>
            {week ?week.split('-')[0]:''}
            </div>
            {reminder && reminder[week] && reminder[week].map((dot)=>{
              return <Text label='dd' onMouseOver={'dfdv'} style={{color:'yellow'}} >{dot.time} <br/></Text>
            })}
           {/*   {reminder && reminder[week] ?
             <a style={{color:'yellow'}} label={'dvd'}>reminder[week].length+ ' Reminder(s)'
              </a>
              :null} */}
            </div>)
            })}
          
            </div>
            )
          })}
          
<Box
  display={openReminder?'block':'none'}
  style={{
    backgroundColor:'yellow',
    position: 'absolute',
    maxHeight: '40%',
    padding: '1%',
    overflowY: 'scroll'
  }}
  sx={{
    mx: 'auto',
    px: 3
  }}>
   <Heading> Reminder for {thisopenReminder}<Button variant='outline' mr={1} onClick={e=>setOpenReminder(false)}>X</Button></Heading> 
{console.log(reminder[thisopenReminder])} 
{reminder && reminder[thisopenReminder] && reminder[thisopenReminder].map((day,index)=>{
 return <React.Fragment>
  <div style={{display:'flex'}}>
  <Input
    id='time'
    name='time'
    type='string'
    key={'time'+thisopenReminder+index}
    sx={{
      maxWidth: 100,
      mx: 'auto',
      px: 3
    }}
    maxLength={5}
    placeholder='etc 01:12'
    value={day.time}
    onChange = {e=>handleReminderChange(e,index)}
  />

{/*   <Select
    id='timeh'
    name='timeh'
    sx={{
      width: 80
    }}
    defaultValue='pm'>
      <option
        key='pm'>
        pm
      </option>
      <option
        key='am'>
        am
      </option>
  </Select> */}
  </div>
  <Input
    id='city'
    name='city'
    type='string'
    key={'city'+thisopenReminder+index}
    sx={{
      maxWidth: 300,
      mx: 'auto',
      px: 3
    }}
    placeholder='Athens'
    value={day.city}
    onChange = {e=>handleReminderChange(e,index)}
  />
  <Label htmlFor='reminder'>Reminder</Label>
  <Textarea
    id='reminder'
    name='reminder'
    key={'reminder'+thisopenReminder+index}
    type='string'
    value={day.reminder}
    maxLength={30}
    onChange = {e=>handleReminderChange(e,index)}
  />
  </React.Fragment>
})}

  <Button variant='outline' mr={2} onClick={addNewReminder}>Add Reminder</Button>
</Box>
      </div>

    </div>
    
  )
}

export default Calendar;