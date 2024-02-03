import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Name is mandatory"],
  },
  email: {
    type: String,
    required: [true, "E-mail is mandatory"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is mandatory"],
  },
  dob: {
    type: Date,
    required: [true, "Date of Birth is mandatory"],
    default: Date.now(),
  },
  gender: {
    type: String,
    // enum: ["Male", "Female", "Other"],
    required: [true, "Gender is mandatory"],
  },
  personalInformation: {
    height: {
      type: Number,
      required: [true, "Height is mandatory"],
      default: 0,
    },
    weight: {
      type: Number,
      required: [true, "Weight is mandatory"],
      default: 0,
    },
    neck: {
      type: Number,
      required: [true, "Neck is mandatory"],
      default: 0,
    },
    waist: {
      type: Number,
      required: [true, "Waist is mandatory"],
      default: 0,
    },
    bmi: {
      type: Number,
      default: 0,
    },
    bodyFat: {
      type: Number,
      default: 0,
    },
  },
  activityLevel: {
    type: String,
    // enum: ["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Extra Active"],
    required: [true, "Activity level is mandatory"],
  },
  allergies: {
    type: String,
  },
  medicalHistory:{
    type: String,
  },
  medications: 
  {
    type: String,
  },
  foodPreference: {
    type: String,
  },
  goals: {
    goalType: {
      type: String,
      required: [true, "Goal is mandatory"],
    },
    targetWeight: {
      type: Number,
      default:0,
    },
    targetCalories: {
      type: Number,
      default:0,
    },
  },
  streak: {
    type: Number,
    default: 0,
  },
  dailyMeals: [
    {
      date: {
        type: Date,
        required: true,
        default: Date.now(),
      },
      meals: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Meal",
        },
      ],
    },
  ],
});

userSchema.pre("save", function (next) {
  const { height, weight, neck, waist } = this.personalInformation;
  if (height && weight) {
    const heightInMeters = height / 100;
    this.personalInformation.bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
  }

  if (height && neck && waist) {
    this.personalInformation.bodyFat =
      (495 /
        (1.0324 -
          0.19077 * Math.log10(waist - neck) +
          0.15456 * Math.log10(height)) -
      450).toFixed(2);
  }
  next();
});

export default mongoose.model("User", userSchema);
