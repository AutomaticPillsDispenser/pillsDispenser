"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MainNav } from "@/components/main-nav";
import { Search } from "@/components/search";
import TeamSwitcher from "@/components/team-switcher";
import { UserNav } from "@/components/user-nav";
import { Sidebar } from "@/components/sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MedicineList } from "@/components/medicine-list";
import { TimePickerDemo } from "@/components/ui/time-picker-demo";
import { useRouter } from "next/navigation";

export default function DashboardPage({ serverData }: any) {
  const [response, setResponse] = useState(serverData);
  const router = useRouter();
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(new Date());
  const [medicineName, setMedicineName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [containerNumber, setContainerNumber] = useState("");

  async function getHistory() {
    const url = "http://localhost:3000/getConfigure"; // Replace with your API endpoint

    try {
      const response = await fetch(url, {
        method: "GET", // Specify the request method
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache", // Prevent caching
          Pragma: "no-cache", // HTTP 1.0 backward compatibility for no-cache
          Expires: "0", // Ensure the resource expires immediately
        },
      });

      // Check if the response status is OK (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Parse the JSON from the response
      setResponse(data);
      return data; // Return the data for further processing
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }
  function formatTimeToHHMM(dateString: any) {
    const date = new Date(dateString);

    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Pad single digit hours and minutes with a leading zero
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Return formatted time
    return `${hours}:${minutes}`;
  }

  const handleAddMedicine = () => {
    const formattedTime = formatTimeToHHMM(time);
    // Validate input data
    if (
      !medicineName ||
      !containerNumber ||
      !time ||
      !formattedTime ||
      !quantity
    ) {
      alert("Please fill in all fields.");
      return;
    }
    
    // Make API call
    fetch("http://localhost:3000/medicines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        medicineName,
        containerNumber,
        quantity,
        date: new Date(),
        dispenseTime: formattedTime,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        router.refresh();
        // Handle successful response
        console.log("API response:", data);
        // Optionally, you can reset the form fields here
        setMedicineName("");
        setContainerNumber("");
        setDate(null);
        setTime(new Date());
        setQuantity(null);
        getHistory();
        alert("Medicine added successfully!");
      })
      .catch((error) => {
        // Handle errors
        console.error("There was a problem with the API call:", error);
        alert("Failed to add medicine. Please try again later.");
      });
  };

  const transformMedicineData = (medicines: any) => {
    // Sort medicines by containerNumber
    medicines.sort((a, b) => a.containerNumber - b.containerNumber);

    // Initialize the result array with placeholders
    const result = [
      { name: "", value: 100, quantity: "" },
      { name: "", value: 100, quantity: "" },
      { name: "", value: 100, quantity: "" },
      { name: "", value: 100, quantity: "" },
      { name: "", value: 100, quantity: "" },
      { name: "", value: 100, fill: "#808080" },
    ];

    // Update the result array with actual medicine data
    medicines.forEach((medicine, index) => {
      if (index <= 5) {
        console.log(medicine.containerNumber)
        result[medicine.containerNumber-2] = {
          name: medicine.medicineName,
          value: 100,
          quantity: medicine.currentQuantity,
        };
      }
    });
    console.log(result)
    return result;
  };
  return (
    <>
      <div className="flex flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-60">
            <Sidebar />
          </div>
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                Configure Dispenser
              </h2>
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Today
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {response.dispensedToday.length} pills
                      </div>
                      <p className="text-xs text-muted-foreground">
                        No. of pills dispensed today
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Types of Medicine
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {response.medicines.length}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Types of pill in the container
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Daily Meds
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {response.medicinesLeftToConsume.length} pills
                      </div>
                      <p className="text-xs text-muted-foreground">
                        No. of medicine that should be taken today
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Pill Dispenser</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <MedicineList
                        record={transformMedicineData(response.medicines)}
                        getHistory={()=>getHistory()}
                      />
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle className="text-2xl">
                        Add New Medicine
                      </CardTitle>
                      <CardDescription>
                        Enter your medicine name, dosage and time
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="medicineName">Medicine Name</Label>
                        <Input
                          id="medicineName"
                          type="text"
                          value={medicineName}
                          placeholder="Name"
                          onChange={(e) => setMedicineName(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="containerNumber">
                          Container Number
                        </Label>
                        <Input
                          id="containerNumber"
                          type="text"
                          value={containerNumber}
                          placeholder="Number"
                          onChange={(e) => setContainerNumber(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="containerNumber">Quantity</Label>
                        <Input
                          id="containerNumber"
                          type="text"
                          value={quantity}
                          placeholder="Number"
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="time">Pick Time</Label>
                        <TimePickerDemo date={time} setDate={setTime} />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={handleAddMedicine}>Add Medicine</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
