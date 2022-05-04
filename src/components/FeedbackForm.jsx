import { useState, useContext, useEffect } from 'react';
import RatingSelect from './RatingSelect';
import Card from './shared/Card';
import Button from './shared/Button';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm({ handleAdd }) {
  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);
  const [text, setText] = useState('');
  const [rating, setRating] = useState(10);

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (feedbackEdit.edit === false) return;
    setBtnDisabled(false);
    setText(feedbackEdit.item.text);
    setRating(feedbackEdit.item.rating);
  }, [feedbackEdit]);

  const handleTextChange = (e) => {
    if (e.target.value === '') {
      setBtnDisabled(true);
      setMessage(null);
    } else if (e.target.value.length < 11) {
      setBtnDisabled(true);
      setMessage('Please leave a review of at least 10 characters.');
    } else {
      setBtnDisabled(false);
      setMessage(null);
    }
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim().length < 10) return;
    const newFeedback = {
      text,
      rating,
    };

    if (feedbackEdit.edit === true)
      updateFeedback(feedbackEdit.item.id, newFeedback);
    else addFeedback(newFeedback);
    setText('');
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would rate your service with us?</h2>
        <RatingSelect select={setRating} selected={rating} />
        <div className='input-group'>
          <input
            type='text'
            onChange={handleTextChange}
            placeholder='Write a review'
            value={text}
          />
          <Button type='submit' isDisabled={btnDisabled}>
            Send
          </Button>
        </div>

        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  );
}
export default FeedbackForm;
