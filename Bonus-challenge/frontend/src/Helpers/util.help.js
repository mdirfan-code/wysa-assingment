export default function convertTo12HourFormat(time24) {
    // Extract hours and minutes from the input time
    const [hours, minutes] = time24.split(':').map(Number);
  
    // Validate the input time
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      return 'Invalid time format';
    }
  
    // Determine the period (AM or PM)
    const period = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours to 12-hour format
    let hours12 = hours % 12;
    hours12 = hours12 === 0 ? 12 : hours12;
  
    // Create the formatted time string
    const time12 = `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
  
    return time12;
  }