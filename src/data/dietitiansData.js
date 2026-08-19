// src/data/dietitiansData.js
//
// TEMPORARY MOCK DATA
// ---------------------------------------------------------------------
// There is currently no `/Dietitians` endpoint on the backend, so the
// Dietitians feature is wired up against this local mock array instead
// (same pattern as `recipesData.js`). Once the backend team ships the
// real endpoints described in `dietitianService.js`, swap the mock
// import inside `useDietitians` / `useDietitianDetails` for the real
// service calls — the shape below already matches what those hooks and
// components expect, so no other file should need to change.
// ---------------------------------------------------------------------

export const dietitiansData = [
  {
    id: "dietitian-001",
    name: "Dr. Ahmed Reda",
    specialty: "Sports Dietitian",
    avatarUrl: "https://i.pravatar.cc/150?img=13",
    rating: 4.8,
    reviewsCount: 120,
    yearsExperience: 12,
    consultationFee: 110,
    currency: "EGP",
    tags: ["Weight Mgmt", "Muscle Gain"],
    specialties: [
      "Weight Management",
      "Muscle Gain",
      "Sports Nutrition",
      "Performance Nutrition",
      "Meal Planning",
    ],
    availableToday: false,
    videoCall: true,
    topRated: true,
    calories: 700,
    nextAvailable: {
      label: "Tomorrow, 10:00 AM",
      day: "Wed",
      date: 14,
      time: "10:00 AM",
    },
    about:
      "Dr. Ahmed Reda is a Sports Dietitian specializing in performance nutrition, healthy weight management, and personalized meal planning. He helps clients build practical nutrition habits that fit their lifestyle and goals without breaking their monthly budget.",
    credentials: [
      "12+ Years Experience in Sports Nutrition",
      "Certified Sports Nutrition Specialist (Egyptian Medical Syndicate)",
      "PureBite Premium Dietitian Partner",
    ],
    availableDates: [
      { day: "Tue", date: 13 },
      { day: "Wed", date: 14 },
      { day: "Thu", date: 15 },
      { day: "Fri", date: 16 },
      { day: "Sat", date: 17 },
    ],
    availableTimes: ["9:00 AM", "10:00 AM", "2:00 PM", "5:00 PM"],
    reviews: [
      {
        id: "review-001",
        name: "Tarek Mansour",
        rating: 5.0,
        comment:
          "Dr. Ahmed is incredible. He designed a high-protein menu that fits my budget using local ingredients.",
        timeAgo: "2 days ago",
      },
      {
        id: "review-002",
        name: "Fatma Hassan",
        rating: 4.6,
        comment:
          "Very professional and realistic goals. He did not ask for expensive supplements, just real Egyptian market whole foods.",
        timeAgo: "1 week ago",
      },
    ],
  },

  {
    id: "dietitian-002",
    name: "Dr. Sarah Hassan",
    specialty: "Clinical Nutritionist",
    avatarUrl: "https://i.pravatar.cc/150?img=47",
    rating: 4.9,
    reviewsCount: 96,
    yearsExperience: 8,
    consultationFee: 85,
    currency: "EGP",
    tags: ["Weight Mgmt", "Diabetes"],
    specialties: [
      "Weight Management",
      "Diabetes",
      "Clinical Nutrition",
      "Meal Planning",
    ],
    availableToday: true,
    videoCall: true,
    topRated: true,
    calories: 750,
    nextAvailable: {
      label: "Today, 2:30 PM",
      day: "Tue",
      date: 13,
      time: "2:30 PM",
    },
    about:
      "Dr. Sarah Hassan is a Clinical Nutritionist focused on diabetes-friendly meal planning and sustainable weight management. She works closely with patients to build routines that fit around their medical needs.",
    credentials: [
      "8+ Years Experience in Clinical Nutrition",
      "Certified Diabetes Educator (Egyptian Medical Syndicate)",
      "PureBite Premium Dietitian Partner",
    ],
    availableDates: [
      { day: "Tue", date: 13 },
      { day: "Wed", date: 14 },
      { day: "Thu", date: 15 },
      { day: "Fri", date: 16 },
      { day: "Sat", date: 17 },
    ],
    availableTimes: ["9:00 AM", "11:00 AM", "2:30 PM", "4:00 PM"],
    reviews: [
      {
        id: "review-003",
        name: "Mona Kamal",
        rating: 5.0,
        comment:
          "She helped me manage my blood sugar with a plan that actually fits my daily routine.",
        timeAgo: "3 days ago",
      },
    ],
  },

  {
    id: "dietitian-003",
    name: "Dr. Ahmed Maher",
    specialty: "Senior Clinical Dietitian",
    avatarUrl: "https://i.pravatar.cc/150?img=59",
    rating: 4.9,
    reviewsCount: 210,
    yearsExperience: 15,
    consultationFee: 250,
    currency: "EGP",
    tags: ["Weight Mgmt", "Clinical Care"],
    specialties: [
      "Weight Management",
      "Clinical Nutrition",
      "Meal Planning",
    ],
    availableToday: true,
    videoCall: true,
    topRated: true,
    calories: 650,
    nextAvailable: {
      label: "Thursday, 7:00 PM",
      day: "Thu",
      date: 15,
      time: "7:00 PM",
    },
    about:
      "Dr. Ahmed Maher is a Senior Clinical Dietitian with a focus on long-term, medically-informed nutrition plans for patients managing chronic conditions.",
    credentials: [
      "15+ Years Experience in Clinical Dietetics",
      "Certified Clinical Nutrition Specialist (Egyptian Medical Syndicate)",
      "PureBite Premium Dietitian Partner",
    ],
    availableDates: [
      { day: "Tue", date: 13 },
      { day: "Wed", date: 14 },
      { day: "Thu", date: 15 },
      { day: "Fri", date: 16 },
      { day: "Sat", date: 17 },
    ],
    availableTimes: ["9:00 AM", "1:00 PM", "7:00 PM"],
    reviews: [
      {
        id: "review-004",
        name: "Youssef Adel",
        rating: 4.9,
        comment:
          "Thorough, patient, and clearly explains the reasoning behind every recommendation.",
        timeAgo: "5 days ago",
      },
    ],
  },
];
