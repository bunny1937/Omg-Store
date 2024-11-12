// ReviewSection.js
import React, { useState } from "react";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleReviewChange = (e) => {
    setNewReview(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const review = {
      text: newReview,
      rating: rating,
    };
    setReviews((prevReviews) => [...prevReviews, review]);
    setNewReview("");
    setRating(0);
  };

  return (
    <div>
      <h2>Reviews</h2>
      <form onSubmit={handleSubmitReview}>
        <textarea
          value={newReview}
          onChange={handleReviewChange}
          placeholder="Write a review"
        />
        <select value={rating} onChange={handleRatingChange}>
          <option value="0">Select a rating</option>
          <option value="1">1 star</option>
          <option value="2">2 stars</option>
          <option value="3">3 stars</option>
          <option value="4">4 stars</option>
          <option value="5">5 stars</option>
        </select>
        <button type="submit">Post Review</button>
      </form>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <p>{review.text}</p>
            <p>Rating: {review.rating} stars</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewSection;
