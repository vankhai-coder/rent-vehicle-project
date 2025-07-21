import { DatePickerWithRange } from "@/components/customer/DatePickerWithRange";
import MotobikeList from "@/components/customer/MotobikeList";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setBookedDate } from "@/redux/features/customer/bookingSlice";
import {
  getUniqueDistricts,
  getUniqueMotobikeTypeNames,
  searchByDates,
  searchByDatesAndDistrict,
  searchByDatesAndType,
  searchByDatesTypeDistrict,
  sortByPrice,
} from "@/redux/features/customer/motobikeSlice";
import { Loader, ChevronDown, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Vehicle = () => {
  // redux :
  const dispatch = useDispatch();
  const { loading, motobikes, districts, motobikeTypes } = useSelector(
    (state) => state.motobike
  );

  const [dates, setDates] = useState([]);
  const [district, setDistrict] = useState("none");
  const [motobikeTypeName, setMotobikeTypeName] = useState("none");
  const [price, setPrice] = useState("none");
  const [showFilters, setShowFilters] = useState(false);

  // dates select :
  const handleDateChange = (newDate) => {
    setDates(newDate);
  };
  const generateDateArray = (dateRange) => {
    const months = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12,
    };

    // Split the range and parse both dates
    const parts = dateRange.split(" - ");
    const parseDate = (dateStr) => {
      const [month, day, year] = dateStr.replace(",", "").split(" ");
      return new Date(year, months[month] - 1, parseInt(day)); // Month is 0-based in JS Date
    };

    const startDate = parseDate(parts[0]);
    const endDate =
      parts.length > 1 ? parseDate(parts[1]) : parseDate(parts[0]);

    // Generate date range array
    let result = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      result.push(
        `${currentDate.getFullYear()}-${
          currentDate.getMonth() + 1
        }-${currentDate.getDate()}`
      );
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
  };
  useEffect(() => {
    if (dates) {
      if (dates.length === 0) {
        return;
      }
    }
  });
  // function to search :
  const handleSearchMotobike = async () => {
    console.log(
      "4 CATERGORIES : ",
      district,
      motobikeTypeName,
      dates,
      generateDateArray(dates),
      price
    );
    // if have all 3 catergory :
    if (dates && district !== "none" && motobikeTypeName !== "none") {
      await dispatch(
        searchByDatesTypeDistrict({
          dates: generateDateArray(dates),
          district,
          motobikeTypeName,
        })
      );

      return;
    }

    // if have dates + district
    if (dates && district !== "none") {
      dispatch(
        searchByDatesAndDistrict({ dates: generateDateArray(dates), district })
      );

      return;
    }
    // if have dates + motobikeTypeName
    if (dates && motobikeTypeName !== "none") {
      dispatch(
        searchByDatesAndType({
          dates: generateDateArray(dates),
          motobikeTypeName,
        })
      );

      return;
    }
    // if have only dates
    if (dates) {
      dispatch(searchByDates({ dates: generateDateArray(dates) }));

      return;
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setDates([]);
    setDistrict("none");
    setMotobikeTypeName("none");
    setPrice("none");
  };

  // get list of district , types that in db :
  useEffect(() => {
    dispatch(getUniqueMotobikeTypeNames());
    dispatch(getUniqueDistricts());
  }, [dispatch]);

  // price sort :
  useEffect(() => {
    if (price !== "none" && motobikes.length > 0) {
      dispatch(sortByPrice(price));
    }
  }, [price, motobikes, dispatch]);

  // set selectedDates :
  useEffect(() => {
    dispatch(setBookedDate(dates));
  }, [dates, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Select a vehicle group
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Choose your perfect ride from our wide selection of vehicles
          </p>
        </div>

        {/* Date Picker - Always visible */}
        <div className="flex justify-center mb-6">
          <DatePickerWithRange onDateChange={handleDateChange} />
        </div>

        {/* Filter Toggle Button - Mobile */}
        <div className="md:hidden flex justify-center mb-4">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter size={16} />
            Filters
            <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        {/* Filters Section */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block mb-6 md:mb-8`}>
          <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* District Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  District
                </label>
                <Select value={district} onValueChange={setDistrict}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="none">All Districts</SelectItem>
                      {loading ? (
                        <SelectItem value="loading" disabled>
                          Loading...
                        </SelectItem>
                      ) : (
                        districts.map((district, index) => (
                          <SelectItem key={index} value={district}>
                            {district}
                          </SelectItem>
                        ))
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Vehicle Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Type
                </label>
                <Select value={motobikeTypeName} onValueChange={setMotobikeTypeName}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Vehicle Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="none">All Types</SelectItem>
                      {loading ? (
                        <SelectItem value="loading" disabled>
                          Loading...
                        </SelectItem>
                      ) : (
                        motobikeTypes.map((type, index) => (
                          <SelectItem key={index} value={type}>
                            {type}
                          </SelectItem>
                        ))
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <Select value={price} onValueChange={setPrice}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort by Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="none">Default</SelectItem>
                      <SelectItem value="lowest">Lowest First</SelectItem>
                      <SelectItem value="highest">Highest First</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <Button
                  onClick={handleSearchMotobike}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <Loader className="animate-spin mr-2" size={16} />
                  ) : null}
                  Search
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              Available Vehicles
            </h2>
            <span className="text-sm text-gray-600">
              {motobikes.length} vehicle{motobikes.length !== 1 ? 's' : ''} found
            </span>
          </div>

          {/* Vehicle List */}
          <MotobikeList motobikes={motobikes} />

          {/* No Results Message */}
          {motobikes.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No vehicles found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or search criteria
              </p>
              <Button onClick={handleClearFilters} variant="outline">
                Clear All Filters
              </Button>
            </div>
          )}
        </div>

        {/* View More Button */}
        {motobikes.length > 0 && (
          <div className="flex justify-center mt-6 md:mt-8">
            <Button className="bg-[#5937E0] hover:bg-[#4c2fd1] px-8 py-3">
              View More
            </Button>
          </div>
        )}

        {/* Brand Section */}
        <div className="mt-8 md:mt-12">
          <div
            className="w-full h-32 md:h-40 rounded-2xl bg-cover bg-center"
            style={{ backgroundImage: "url('/brand.png')" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Vehicle;
