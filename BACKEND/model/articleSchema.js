const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const articleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: [5, "Article must contain 5 or more characters!"],
      maxLength: [80, "Article can contain at most 80 characters!"],
    },
    description: {
      type: String,
      maxLength: [
        1000,
        "Article description can contain at most 1000 characters!",
      ],
    },
    address: {
      location: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [{ type: Number }],
    },
    city: { type: String, required: true },
    street: { type: String, required: true },
    area: Number,
    availible: {
      isAvailible: {
        type: Boolean,
        default: true,
      },
      rentedAt: Date,
      availibleAt: Date,
    },
    category: {
      type: String,
      enum: ["kuce", "stanovi", "poslovni", "apartmani", "sobe", "vikendice"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
        default: "default.jpeg",
      },
    ],
    mainImage: {
      type: String,
    },
    status: {
      type: String,
      enum: ["standard", "promoted", "premium"],
      default: "standard",
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    klima: {
      type: Boolean,
    },
    novogradnja: {
      type: Boolean,
    },
    namjesten: {
      type: Boolean,
    },
    kablovska: {
      type: Boolean,
    },
    internet: {
      type: Boolean,
    },
    bazen: {
      type: Boolean,
    },
    garaza: {
      type: Boolean,
    },
    kratkorocno: {
      type: Boolean,
    },
    dugorocno: {
      type: Boolean,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    slug: String,
    createdAt: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

articleSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  this.createdAt = new Date(Date.now());
  next();
});

articleSchema.virtual("rating").get(function () {
  if (this.reviews.length === 0) return 0;
  const numOfReviews = this.reviews.length;
  const sumOfReviews = this.reviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );

  const result = sumOfReviews / numOfReviews;

  return Math.round(result * 2) / 2;
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
