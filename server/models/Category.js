// Category.js - Mongoose model for blog categories

const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a category name'],
      trim: true,
      unique: true,
      maxlength: [50, 'Category name cannot be more than 50 characters'],
    },
    description: {
      type: String,
      maxlength: [200, 'Description cannot be more than 200 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    color: {
      type: String,
      default: '#6B7280', // Default gray color
      match: [/^#[0-9A-F]{6}$/i, 'Please provide a valid hex color'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Create slug from name before saving
CategorySchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    return next();
  }
  
  this.slug = this.name
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
    
  next();
});

// Virtual for category URL
CategorySchema.virtual('url').get(function () {
  return `/categories/${this.slug}`;
});

// Static method to get active categories
CategorySchema.statics.getActiveCategories = function () {
  return this.find({ isActive: true }).sort({ name: 1 });
};

module.exports = mongoose.model('Category', CategorySchema);
