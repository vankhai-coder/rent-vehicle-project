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

const Vehicle = () => {
  const motobikes = [
    {
      image: "https://cdn.riderly.com/storage/media/img/bikes/Honda__Vision_110.png",
      price: 4,
      name: "Yamaha Exciter 135",
      addOns: [
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",

      ],
      district: "Xuan Ha",
      reviews: 10
    },
    {
      image: "https://cdn.riderly.com/storage/media/img/bikes/Honda__Vision_110.png",
      price: 4,
      name: "Yamaha Exciter 135",
      addOns: [
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",

      ],
      district: "Xuan Ha",
      reviews: 10
    }
    , {
      image: "https://cdn.riderly.com/storage/media/img/bikes/Honda__Vision_110.png",
      price: 4,
      name: "Yamaha Exciter 135",
      addOns: [
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",

      ],
      district: "Xuan Ha",
      reviews: 10
    },
    {
      image: "https://cdn.riderly.com/storage/media/img/bikes/Honda__Vision_110.png",
      price: 4,
      name: "Yamaha Exciter 135",
      addOns: [
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",

      ],
      district: "Xuan Ha",
      reviews: 10
    }, {
      image: "https://cdn.riderly.com/storage/media/img/bikes/Honda__Vision_110.png",
      price: 4,
      name: "Yamaha Exciter 135",
      addOns: [
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",

      ],
      district: "Xuan Ha",
      reviews: 10
    }, {
      image: "https://cdn.riderly.com/storage/media/img/bikes/Honda__Vision_110.png",
      price: 4,
      name: "Yamaha Exciter 135",
      addOns: [
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",

      ],
      district: "Xuan Ha",
      reviews: 10
    }, {
      image: "https://cdn.riderly.com/storage/media/img/bikes/Honda__Vision_110.png",
      price: 4,
      name: "Yamaha Exciter 135",
      addOns: [
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",

      ],
      district: "Xuan Ha",
      reviews: 10
    }, {
      image: "https://cdn.riderly.com/storage/media/img/bikes/Honda__Vision_110.png",
      price: 4,
      name: "Yamaha Exciter 135",
      addOns: [
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",

      ],
      district: "Xuan Ha",
      reviews: 10
    }, {
      image: "https://cdn.riderly.com/storage/media/img/bikes/Honda__Vision_110.png",
      price: 4,
      name: "Yamaha Exciter 135",
      addOns: [
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",
        "https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg",

      ],
      district: "Xuan Ha",
      reviews: 10
    }
  ];
  return (
    <div>
      <h1 className="text-center font-bold text-4xl mb-6">Select a vehicle group</h1>
      {/* filters : */}
      <div className="flex items-center justify-center gap-7 mb-6">
        {/* all */}
        <Button className='bg-[#5937E0]'>All Vehicles</Button>
        {/* dates :  */}
        <DatePickerWithRange />
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