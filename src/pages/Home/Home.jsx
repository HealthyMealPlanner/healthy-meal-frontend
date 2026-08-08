import Header from "../../components/ui/Header/Header";
import SearchBar from "../../components/ui/SearchBar/SearchBar";
import QuickActions from "../../components/ui/QuickActions/QuickActions";
import TodayCard from "../../components/ui/TodayCard/TodayCard";
import ConsultationBanner from "../../components/ui/ConsultationBanner/ConsultationBanner";
import CategoryTabs from "../../components/ui/CategoryTabs/CategoryTabs";
import DoctorCard from "../../components/ui/DoctorCard/DoctorCard";
import UpcomingCard from "../../components/ui/UpcomingCard/UpcomingCard";

const doctors = [
  {
    id: 1,
    image: "/path/to/ahmed.jpg",
    name: "Dr. Ahmed Mostafa",
    specialty: "Clinical Nutrition & Diabetes Specialist",
    price: 250,
    rating: 4.9,
    time: "7PM",
  },
  {
    id: 2,
    image: "/path/to/sarah.jpg",
    name: "Dr. Sarah Ibrahim",
    specialty: "Clinical Nutrition & Diabetes Specialist",
    price: 200,
    rating: 4.6,
    time: "8PM",
  },
  {
    id: 3,
    image: "/path/to/ahmed-ali.jpg",
    name: "Dr. Ahmed Ali",
    specialty: "Clinical Nutrition & Diabetes Specialist",
    price: 250,
    rating: 4.9,
    time: "7PM",
  },
  {
    id: 4,
    image: "/path/to/salma.jpg",
    name: "Dr. Salma Hassan",
    specialty: "Clinical Nutrition & Diabetes Specialist",
    price: 250,
    rating: 4.6,
    time: "7PM",
  },
];

function Home() {
  return (
    <main className="min-h-screen bg-main-bg flex justify-center lg:block">
      <div className="w-full max-w-[390px] lg:max-w-[1200px] lg:mx-auto min-h-screen px-4 py-6 lg:px-0 lg:py-8">
        <div className="lg:hidden">
          <Header />
          <SearchBar />
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-6">
          <div>
            <div className="hidden lg:block mb-8">
              <h1 className="text-[44px] leading-tight font-bold text-text-primary mb-2">
                Hello, <span className="text-primary">Sara</span>
              </h1>
              <p className="text-slate text-lg">Ready for a healthier day</p>
            </div>

            <h2 className="hidden lg:block text-lg font-semibold text-text-primary mb-4">
              What would you like to do?
            </h2>
            <QuickActions />
          </div>
          <UpcomingCard />
        </div>

        <TodayCard />
        <ConsultationBanner />
        <CategoryTabs />

        <div className="lg:flex lg:items-center lg:justify-between lg:mb-4">
          <h2 className="hidden lg:block text-lg font-semibold text-text-primary">
            Recommended Doctors for you
          </h2>
          <button className="hidden lg:block text-sm font-semibold text-primary hover:underline">
            see more
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
          {doctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;