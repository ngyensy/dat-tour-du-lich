import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import StarRatings from "react-star-ratings";

const TourReviews = ({ tourId, setAverageRating }) => {
  const { user } = useAuth(); // Lấy user từ context xác thực
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Lấy danh sách đánh giá từ backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/v1/review/tour/${tourId}`);
        
        // Kiểm tra nếu dữ liệu là mảng, nếu không thì dùng response.data trực tiếp
        const reviewData = Array.isArray(response.data) ? response.data : response.data.$values;
        setReviews(reviewData);

        // Tính điểm trung bình nếu có đánh giá
        if (reviewData.length > 0) {
          const totalRating = reviewData.reduce((acc, review) => acc + review.rating, 0);
          const avgRating = totalRating / reviewData.length;
          setAverageRating(avgRating); // Truyền điểm trung bình về cha
        } else {
          setAverageRating(0); // Nếu không có đánh giá, điểm trung bình là 0
        }

      } catch (error) {
        console.error("Lỗi khi lấy danh sách đánh giá:", error);
        toast.error("Không thể tải đánh giá.");
      }
    };

    fetchReviews();
  }, [tourId, setAverageRating]);

  // Gửi đánh giá mới lên backend
  const handleAddReview = async () => {
    if (!rating || rating < 1 || rating > 5) {
      toast.error("Vui lòng nhập đánh giá hợp lệ (1-5 sao).");
      return;
    }
    if (!comment) {
      toast.error("Vui lòng nhập bình luận.");
      return;
    }

    try {
      const newReview = { tourId, userId: user.id, rating: parseInt(rating), comment };
      await axios.post("http://localhost:4000/v1/review", newReview);

      // Lấy lại danh sách đánh giá mới từ backend
      const response = await axios.get(`http://localhost:4000/v1/review/tour/${tourId}`);
      const reviewData = Array.isArray(response.data) ? response.data : response.data.$values;
      setReviews(reviewData);

      // Tính lại điểm trung bình sau khi thêm đánh giá mới
      const totalRating = reviewData.reduce((acc, review) => acc + review.rating, 0);
      const avgRating = totalRating / reviewData.length;
      setAverageRating(avgRating);

      toast.success("Đã thêm đánh giá thành công!");
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Lỗi khi thêm đánh giá:", error);
      toast.error("Không thể thêm đánh giá. Vui lòng thử lại.");
    }
  };

  return (
    <div className="container mx-auto p-4 border border-gray-600 rounded-lg">
      {/* Phần đánh giá */}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="border p-4 mb-4 bg-gray-200 rounded-lg">
            <div>
              <div>
                <strong>Đánh giá:</strong>{" "}
                <StarRatings
                  rating={review.rating}
                  starRatedColor="#FF8C00"
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                />
              </div>
              <p>
                <strong>Bình luận:</strong> {review.comment}
              </p>
              {/* Hiển thị tên người dùng cho từng đánh giá */}
              <p>
                <strong>Người dùng:</strong> {review.user?.name}
              </p>
              <p>
                <em>Ngày tạo: {new Date(review.createdAt).toLocaleDateString()}</em>
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>Chưa có đánh giá nào cho tour này.</p>
      )}

      {/* Kiểm tra xem người dùng đã đăng nhập chưa */}
      {user ? (
        <div className="mt-8">
          <h4 className="text-2xl font-semibold mb-4">Thêm đánh giá</h4>
          <div className="mb-4">
            <label className="block mb-2">Đánh giá (1-5 sao):</label>
            <StarRatings
              rating={rating}
              changeRating={(newRating) => setRating(newRating)}
              starRatedColor="#FF8C00"
              numberOfStars={5}
              name="rating"
              starDimension="20px"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Bình luận:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            onClick={handleAddReview}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Thêm
          </button>
        </div>
      ) : (
        <p className="mt-4">Vui lòng <a className="text-blue-600" href="/login">đăng nhập</a> để thêm đánh giá.</p>
      )}

      {/* Phần thông tin người dùng đăng nhập */}
      {user && (
        <div className="mt-4 text-right">
          <p><strong>Đăng nhập bởi:</strong> {user.name}</p>
        </div>
      )}
    </div>
  );
};

export default TourReviews;
