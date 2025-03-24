import { DatePickerWithRange } from "@/components/DatePickerWithRange"
import MotobikeList from "@/components/MotobikeList"
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
import { searchByDatesTypeDistrict } from "@/redux/features/motobikeSlice"
import { Loader } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const Vehicle = () => {

  // redux : 
  const dispatch = useDispatch()
  const { loading, error, motobikes } = useSelector(state => state.motobike)

  const [dates, setDates] = useState([])
  const [district, setDistrict] = useState('Hoa Hai')
  const [motobikeTypeName, setMotobikeTypeName] = useState('Yamaha Exciter 155')

  // dates select : 
  const handleDateChange = (newDate) => {
    setDates(newDate);
    console.log("Selected Dates:", dates);
  };
  const generateDateArray = (dateRange) => {
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
      result.push(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
  };
  useEffect(() => {
    if (dates) {
      if (dates.length === 0) {
        return
      }
      console.log('generateDateArray(dates)', generateDateArray(dates));
    }
  })
  // district select : 

  // type select : 

  // function to search : 
  const handleSearchMotobike = async () => {
    // if have all 3 catergory : 
    if (dates && district && motobikeTypeName) {
      console.log('search by 3 catergory : ', district, motobikeTypeName, generateDateArray(dates));

      await dispatch(searchByDatesTypeDistrict({ dates: generateDateArray(dates), district, motobikeTypeName }))
      return
    }

    // if have dates + district 

    // if have dates + motobikeTypeName
    // if have dates  

  }

    // get list of district that in db : 
    useEffect(()=> {

    } ,[])

  return (
    <div>
      <h1 className="text-center font-bold text-4xl mb-6">Select a vehicle group</h1>
      {/* filters : */}
      <div className="flex items-center justify-center gap-7 mb-6">
        {/* all */}
        <Button
          className='hover:cursor-pointer'
          onClick={() => { handleSearchMotobike() }}
        >
          {loading ? <Loader className="animate-spin text-center" /> : 'Search'}
        </Button>
        {/* dates :  */}
        <DatePickerWithRange onDateChange={handleDateChange} />
        {/* district */}
        <Select className='text-white'>
          <SelectTrigger className="inline-flex items-center justify-center !text-white whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#5937E0]   hover:bg-primary/90 h-10 px-4 py-2">
            <SelectValue placeholder="Select District" className='text-white ' />
          </SelectTrigger>
          <SelectContent >
            <SelectGroup >
              <SelectItem value="none">Select District</SelectItem>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* type */}
        <Select className='text-white'>
          <SelectTrigger className="inline-flex items-center justify-center !text-white whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#5937E0]  hover:bg-primary/90  h-10 px-4 py-2">
            <SelectValue placeholder="Select Motbike" className='text-white' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="none">Select Motobike</SelectItem>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* price */}
        <Select className='text-white'>
          <SelectTrigger className="inline-flex items-center justify-center !text-white whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#5937E0]  hover:bg-primary/90 h-10 px-4 py-2">
            <SelectValue placeholder="Select Price" className='text-white' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="apple">Lowest</SelectItem>
              <SelectItem value="pineapple">Highest</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

      </div>
      {/* list of motobike :  */}
      <MotobikeList motobikes={motobikes} />
      {/* view more button :  */}
      <div className="flex items-center justify-center my-4">
        <Button className='bg-[#5941E0]'>View more</Button>
      </div>
      {/* brand */}
      <div className="w-full h-40 rounded-4xl my-8"
        style={{ backgroundImage: "url('/brand.png')" }}
      ></div>
    </div>
  )
}

export default Vehicle