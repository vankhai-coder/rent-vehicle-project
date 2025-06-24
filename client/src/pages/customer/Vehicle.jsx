import { DatePickerWithRange } from "@/components/customer/DatePickerWithRange"
import MotobikeList from "@/components/customer/MotobikeList"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { setBookedDate } from "@/redux/features/customer/bookingSlice"
import { getUniqueDistricts, getUniqueMotobikeTypeNames, searchByDates, searchByDatesAndDistrict, searchByDatesAndType, searchByDatesTypeDistrict, sortByPrice } from "@/redux/features/customer/motobikeSlice"
import { Loader } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

const Vehicle = () => {
  // redux : 
  const dispatch = useDispatch()
  const { loading, error, motobikes, districts, motobikeTypes } = useSelector(state => state.motobike)

  const [dates, setDates] = useState('')
  const [district, setDistrict] = useState('none')
  const [motobikeTypeName, setMotobikeTypeName] = useState('none')
  const [price, setPrice] = useState('none')
  const [displayCount, setDisplayCount] = useState(12) // Hiển thị 12 xe (4 hàng) ban đầu

  // dates select : 
  const handleDateChange = (newDate) => {
    setDates(newDate);
  };

  const generateDateArray = (dateRange) => {
    // Check if dateRange is a string and not empty
    if (typeof dateRange !== 'string' || !dateRange || dateRange === 'Pick a date') {
      return [];
    }

    const months = {
      Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
      Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
    };

    // Split the range and parse both dates
    const parts = dateRange.split(" - ");
    const parseDate = (dateStr) => {
      const [month, day, year] = dateStr.replace(",", "").split(" ");
      return new Date(year, months[month] - 1, parseInt(day)); // Month is 0-based in JS Date
    };

    const startDate = parseDate(parts[0]);
    const endDate = parts.length > 1 ? parseDate(parts[1]) : parseDate(parts[0])

    // Generate date range array
    let result = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      result.push(`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
  };

  // Fetch initial data when component mounts
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        await dispatch(searchByDates({ dates: [formattedDate] }));
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, [dispatch]);

  // function to search : 
  const handleSearchMotobike = async () => {
    try {
      // Validate dates if they exist
      if (!dates || dates === 'Pick a date') {
        toast.error('Please select valid dates');
        return;
      }

      const dateArray = generateDateArray(dates);
      if (dateArray.length === 0) {
        toast.error('Please select valid dates');
        return;
      }

      // if have all 3 catergory : 
      if (dates && district !== 'none' && motobikeTypeName !== 'none') {
        const result = await dispatch(searchByDatesTypeDistrict({ 
          dates: dateArray, 
          district, 
          motobikeTypeName 
        })).unwrap();
        if (!result || result.length === 0) {
          toast.error(`No ${motobikeTypeName} vehicles available in ${district} for the selected dates`);
        }
        return;
      }

      // if have dates + district 
      if (dates && district !== 'none') {
        const result = await dispatch(searchByDatesAndDistrict({ 
          dates: dateArray, 
          district 
        })).unwrap();
        if (!result || result.length === 0) {
          toast.error(`No vehicles available in ${district} for the selected dates`);
        }
        return;
      }

      // if have dates + motobikeTypeName
      if (dates && motobikeTypeName !== 'none') {
        const result = await dispatch(searchByDatesAndType({ 
          dates: dateArray, 
          motobikeTypeName 
        })).unwrap();
        if (!result || result.length === 0) {
          toast.error(`No ${motobikeTypeName} vehicles available for the selected dates`);
        }
        return;
      }

      // if have only dates  
      if (dates) {
        const result = await dispatch(searchByDates({ 
          dates: dateArray 
        })).unwrap();
        if (!result || result.length === 0) {
          toast.error('No vehicles available for the selected dates');
        }
        return;
      }

      // If no search criteria selected
      toast.info('Please select at least one search criteria');
    } catch (error) {
      console.error('Error searching motobikes:', error);
      toast.error(error.message || 'An error occurred while searching');
    }
  }

  // get list of district , types that in db : 
  useEffect(() => {
    dispatch(getUniqueMotobikeTypeNames())
    dispatch(getUniqueDistricts())
  }, [])
  
  // price sort : 
  useEffect(() => {
    if (price !== "none" && motobikes.length > 0) {
      dispatch(sortByPrice(price));
    }
  }, [price, motobikes, dispatch]);

  // set selectedDates : 
  useEffect(() => {
    if (dates && dates !== 'Pick a date') {
      dispatch(setBookedDate(generateDateArray(dates)))
    }
  }, [dates, dispatch])

  // Handle view more
  const handleViewMore = () => {
    setDisplayCount(prev => prev + 12); // Tăng số lượng xe hiển thị thêm 12 xe (4 hàng)
  };

  // Filter motobikes based on display count
  const displayedMotobikes = motobikes?.slice(0, displayCount) || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center font-bold text-4xl mb-6">Select a vehicle group</h1>
      {/* filters : */}
      <div className="flex items-center justify-center gap-7 mb-6">
        {/* all */}
        <Button
          className='hover:cursor-pointer'
          onClick={handleSearchMotobike}
        >
          {loading ? <Loader className="animate-spin text-center" /> : 'Search'}
        </Button>
        {/* dates :  */}
        <DatePickerWithRange onDateChange={handleDateChange} />
        {/* district */}
        <Select
          className='text-white'
          value={district}
          onValueChange={setDistrict}
        >
          <SelectTrigger className="inline-flex items-center justify-center !text-white whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#5937E0] hover:bg-primary/90 h-10 px-4 py-2">
            <SelectValue placeholder="Select District" className='text-white' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="none">Select District</SelectItem>
              {loading ? (
                <SelectItem value="loading" disabled>Loading...</SelectItem>
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
        {/* type */}
        <Select
          className='text-white'
          value={motobikeTypeName}
          onValueChange={setMotobikeTypeName}
        >
          <SelectTrigger className="inline-flex items-center justify-center !text-white whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#5937E0] hover:bg-primary/90 h-10 px-4 py-2">
            <SelectValue placeholder="Select Motobike" className='text-white' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="none">Select Motobike</SelectItem>
              {loading ? (
                <SelectItem value="loading" disabled>Loading...</SelectItem>
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
        {/* price */}
        <Select
          className='text-white'
          value={price}
          onValueChange={setPrice}
        >
          <SelectTrigger className="inline-flex items-center justify-center !text-white whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#5937E0] hover:bg-primary/90 h-10 px-4 py-2">
            <SelectValue placeholder="Sort by price" className='text-white' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="none">Sort by price</SelectItem>
              <SelectItem value="lowest">Lowest price</SelectItem>
              <SelectItem value="highest">Highest price</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Display motobikes or no results message */}
      {error ? (
        <div className="flex flex-col items-center justify-center min-h-[30vh]">
          <p className="text-2xl font-semibold text-gray-700 mb-4">No vehicles found</p>
          <p className="text-gray-500">Please try different search criteria</p>
        </div>
      ) : (
        <>
          <MotobikeList motobikes={displayedMotobikes} selectedDates={dates && dates !== 'Pick a date' ? generateDateArray(dates) : []} />
          {motobikes.length > displayCount && (
            <div className="flex justify-center mt-8">
              <Button onClick={handleViewMore}>
                View More
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Vehicle