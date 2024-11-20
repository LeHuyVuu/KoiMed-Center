import React, { useEffect, useState } from 'react'
import './datepicker.css'
import { fetchScheduleByAppimentTypeAPI } from '../../../apis';
import { useSelector, useDispatch } from 'react-redux';
import { setBookingData } from '../../../store/bookingSlice';
import PreLoader from '../../../components/Preloader/Preloader';

const DatePickStep = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const selectedDate = useSelector(state => state.booking.bookingData.date) // ngày đc chọn
  const [schedule, setSchedule] = useState([])
  const type = useSelector(state => state.booking.bookingData.type)
  const vetId = useSelector(state => state.booking.bookingData.vetId)
  const dispatch = useDispatch();
  const bookingData = useSelector(state => state.booking.bookingData);
  const [isLoading, setIsLoading] = useState(true);
  // Lấy dữ liệu schedul theo appointmentType và vetId
  useEffect(() => {

    const fetchSchedule = async (type, vetId) => {
      try {
        setIsLoading(true);
        const response = await fetchScheduleByAppimentTypeAPI(type, vetId);
        setSchedule(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSchedule(type, vetId);
  }, [type, vetId])


  // Lấy ngày tháng theo định dạng yyyy-MM-dd
  const getLocalDateString = (date) => {
    const year = new Date(date).getFullYear();
    const month = (new Date(date).getMonth() + 1).toString().padStart(2, '0'); // Adjust for zero-based month
    const day = new Date(date).getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const days = [];
    const weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    weekDays.forEach(day => {
      days.push(<div key={`weekday-${day}`} className="weekday">{day}</div>);
    });

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="disabled"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${month + 1}-${day < 10 ? '0' + day : day}`;
      const isToday = date === getLocalDateString(new Date());
      const isSelected = bookingData && date === bookingData.date;
      const isAvailable = new Date(date) > new Date(new Date().toDateString()) &&
        schedule.some(item => item.day === getLocalDateString(date));
      days.push(
        <div
          key={day}
          className={`
                    ${isAvailable ? 'day' : 'disabled'}
                    ${isToday ? 'current-day' : ''}
                    ${isSelected ? 'chooosed-day' : ''}
                `.trim()}
          onClick={() => isAvailable && handleDateClick(date)}
        >
          {day}
        </div>
      );
    }

    return days;
  }

  const handleDateClick = (date) => {
    // thêm ngày vào bookingData
    dispatch(setBookingData({
      date: date,
    }));
    resetTime();
  }

  const handlePreviousMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    resetDate();
    resetTime();
  }

  const handleNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    resetDate();
    resetTime();
  }

  const resetDate = () => {
    dispatch(setBookingData({
      selectedDate: null,
      date: null,
    }));
  }
  const resetTime = () => {
    dispatch(setBookingData({
      startAt: null,
      endAt: null,
    }));
  }

  const formatMonth = (date) => {
    return date.toLocaleString('vi-VN', { month: 'long', year: 'numeric' });
  }

  const handleTimeSlotClick = (startTime, endTime) => {
    dispatch(setBookingData({
      date: getLocalDateString(selectedDate),
      selectedDate: selectedDate,
      startAt: startTime,
      endAt: endTime
    }));
  };


  const renderTimeSlots = () => {
    if (!selectedDate) return null;
    console.log(selectedDate)
    const selectedDayData = schedule.find(item => item.day === selectedDate);

    // if (!selectedDayData) return <p>No available slots for this date.</p>;

    return (
      <div className="slots text-start">
        {/* <h3>Available time slots for {selectedDate.toLocaleDateString('vi-VN')}:</h3> */}
        {selectedDayData?.slots?.map((slot, index) => (
          <div
            key={index}
            className={`slot ${bookingData.startAt === slot.startTime && bookingData.endAt === slot.endTime ? 'slot-picked' : ''}`}
            onClick={() => handleTimeSlotClick(slot.startTime, slot.endTime)}
          >
            {slot.startTime.slice(0, 5)} - {slot.endTime.slice(0, 5)}
          </div>
        ))}
        {bookingData.startAt === null && bookingData.endAt === null &&
          <p>Please select a time slot to continue booking</p>
        }
      </div>
    );
  }


  return (
    <div style={{ minHeight: '500px' }}>
      <div className="calendar-container ">
        {/* Header với nút điều hướng tháng */}
        {!isLoading && schedule.length > 0 && (
          <>
            <div className="calendar-header">
              <button onClick={handlePreviousMonth}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-square-fill previous-month-btn" viewBox="0 0 16 16">
                  <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1" />
                </svg>
              </button>
              <h2>{formatMonth(currentDate)}</h2>
              <button onClick={handleNextMonth}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right-square-fill next-month-btn" viewBox="0 0 16 16">
                  <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1" />
                </svg>
              </button>
            </div>
            <div className="days-grid">
              {renderDays()}
            </div>
            <hr />
            {renderTimeSlots()}
          </>
        )}
        {isLoading ? <PreLoader /> : null}
        {!isLoading && schedule.length === 0 && <h3>We are sorry ! Your chosen veterinarian is not available.</h3>}
      </div >
    </div>
  )
}

export default DatePickStep
